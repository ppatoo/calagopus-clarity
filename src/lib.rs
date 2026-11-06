use shared::{
    State,
    extensions::{
        Extension, ExtensionPermissionsBuilder, ExtensionRouteBuilder,
        index_html::IndexHtmlBuilder, settings::ExtensionSettingsDeserializer,
    },
    permissions::PermissionGroup,
};

pub mod routes;
pub mod settings;

#[derive(Default)]
pub struct ExtensionStruct;

#[async_trait::async_trait]
impl Extension for ExtensionStruct {
    async fn initialize(&mut self, _state: State) {
        tracing::info!("Clarity Theme & UI extension initialized");
    }

    async fn initialize_router(
        &mut self,
        state: State,
        builder: ExtensionRouteBuilder,
    ) -> ExtensionRouteBuilder {
        builder.add_admin_api_router(|router| router.merge(routes::admin_router(&state)))
    }

    async fn initialize_permissions(
        &mut self,
        _state: State,
        mut builder: ExtensionPermissionsBuilder,
    ) -> ExtensionPermissionsBuilder {
        builder = builder.add_admin_permission_group(
            "clarity",
            PermissionGroup {
                description: "Clarity Theme & Layout configuration permissions",
                permissions: indexmap::IndexMap::from([
                    ("settings-read", "View Clarity operator settings"),
                    ("settings-write", "Update Clarity operator settings"),
                ]),
            },
        );

        builder = builder.add_server_permission_group(
            "clarity",
            PermissionGroup {
                description: "Clarity Theme server UI enhancements",
                permissions: indexmap::IndexMap::from([
                    ("view", "View Clarity enhanced metrics HUD"),
                    (
                        "customize",
                        "Customize server-level Clarity layout preferences",
                    ),
                ]),
            },
        );

        builder
    }

    async fn initialize_index_html(
        &mut self,
        _state: State,
        builder: IndexHtmlBuilder,
    ) -> IndexHtmlBuilder {
        builder.add_variable("accent_color", |settings| {
            let clarity_settings = settings
                .get_extension_settings::<settings::ClarityOperatorSettings>(
                    "dev_antigravity_clarity",
                )
                .cloned()
                .unwrap_or_default();

            Ok(serde_json::json!(
                clarity_settings
                    .custom_accent_color
                    .unwrap_or_else(|| "#06b6d4".to_string())
            ))
        });

        builder.add_variable("brand_name", |settings| {
            let clarity_settings = settings
                .get_extension_settings::<settings::ClarityOperatorSettings>(
                    "dev_antigravity_clarity",
                )
                .cloned()
                .unwrap_or_default();

            Ok(serde_json::json!(
                clarity_settings
                    .custom_brand_title
                    .unwrap_or_else(|| "Clarity".to_string())
            ))
        });

        builder
    }

    async fn settings_deserializer(&self, _state: State) -> ExtensionSettingsDeserializer {
        settings::deserializer()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use garde::Validate;

    #[test]
    fn test_settings_validation_rules() {
        let valid = settings::ClarityOperatorSettings::default();
        assert!(valid.validate().is_ok());

        let invalid = settings::ClarityOperatorSettings {
            default_nav_mode: "bogus".to_string(),
            default_container_mode: "inset".to_string(),
            allow_user_customization: true,
            custom_accent_color: Some("#06b6d4".to_string()),
            custom_brand_title: Some("Clarity".to_string()),
        };
        assert!(invalid.validate().is_err());
    }
}
