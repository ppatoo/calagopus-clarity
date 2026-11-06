use crate::settings::ClarityOperatorSettings;
use axum::http::StatusCode;
use garde::Validate;
use serde::{Deserialize, Serialize};
use shared::{
    ApiError, GetState, Payload,
    models::{admin_activity::GetAdminActivityLogger, user::GetPermissionManager},
    response::{ApiResponse, ApiResponseResult},
    utils::validate_data,
};
use utoipa::ToSchema;

#[derive(Clone, Debug, Deserialize, Serialize, ToSchema, Validate)]
pub struct UpdateSettingsPayload {
    #[garde(custom(crate::settings::validate_nav_mode))]
    pub default_nav_mode: String,

    #[garde(custom(crate::settings::validate_container_mode))]
    pub default_container_mode: String,

    #[garde(skip)]
    pub allow_user_customization: bool,

    #[garde(length(min = 4, max = 32))]
    pub custom_accent_color: Option<String>,

    #[garde(length(min = 1, max = 64))]
    pub custom_brand_title: Option<String>,
}

#[derive(ToSchema, Serialize)]
pub struct UpdateSettingsResponse {
    pub success: bool,
    pub settings: ClarityOperatorSettings,
}

#[utoipa::path(
    put,
    path = "/",
    request_body = UpdateSettingsPayload,
    responses(
        (status = OK, body = UpdateSettingsResponse),
        (status = BAD_REQUEST, description = "Validation failed"),
        (status = FORBIDDEN, description = "Insufficient permissions")
    )
)]
pub async fn route(
    state: GetState,
    permissions: GetPermissionManager,
    logger: GetAdminActivityLogger,
    payload: Payload<UpdateSettingsPayload>,
) -> ApiResponseResult {
    // Garde validation before permission check so 400s win over 403s
    if let Err(errors) = validate_data(&payload.0) {
        return ApiResponse::new_serialized(ApiError::new_strings_value(errors))
            .with_status(StatusCode::BAD_REQUEST)
            .ok();
    }

    permissions.has_admin_permission("clarity.settings-write")?;

    let body = &payload.0;
    let updated = ClarityOperatorSettings {
        default_nav_mode: body.default_nav_mode.clone(),
        default_container_mode: body.default_container_mode.clone(),
        allow_user_customization: body.allow_user_customization,
        custom_accent_color: body.custom_accent_color.clone(),
        custom_brand_title: body.custom_brand_title.clone(),
    };

    {
        let mut settings = state.settings.get_mut().await?;
        let ext_settings = settings
            .get_mut_extension_settings::<ClarityOperatorSettings>("dev_antigravity_clarity")?;
        *ext_settings = updated.clone();
        settings.save().await?;
    }

    logger
        .log(
            "clarity:settings.update",
            serde_json::to_value(body).unwrap_or_default(),
        )
        .await;

    ApiResponse::new_serialized(UpdateSettingsResponse {
        success: true,
        settings: updated,
    })
    .ok()
}
