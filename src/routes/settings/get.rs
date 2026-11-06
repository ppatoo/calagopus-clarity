use crate::settings::ClarityOperatorSettings;
use serde::Serialize;
use shared::{
    GetState,
    models::user::GetPermissionManager,
    response::{ApiResponse, ApiResponseResult},
};
use utoipa::ToSchema;

#[derive(ToSchema, Serialize)]
pub struct GetSettingsResponse {
    pub settings: ClarityOperatorSettings,
}

#[utoipa::path(
    get,
    path = "/",
    responses(
        (status = OK, body = GetSettingsResponse),
        (status = FORBIDDEN, description = "Insufficient permissions")
    )
)]
pub async fn route(state: GetState, permissions: GetPermissionManager) -> ApiResponseResult {
    permissions.has_admin_permission("clarity.settings-read")?;

    let settings = state.settings.get().await?;
    let clarity_settings = settings
        .get_extension_settings::<ClarityOperatorSettings>("dev_antigravity_clarity")
        .cloned()
        .unwrap_or_default();

    ApiResponse::new_serialized(GetSettingsResponse {
        settings: clarity_settings,
    })
    .ok()
}
