use anyhow::Context;
use garde::Validate;
use serde::{Deserialize, Serialize};
use shared::extensions::settings::{
    ExtensionSettings, ExtensionSettingsDeserializer, SettingsDeserializeExt, SettingsDeserializer,
    SettingsSerializeExt, SettingsSerializer,
};
use std::sync::Arc;
use utoipa::ToSchema;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, ToSchema, Validate)]
pub struct ClarityOperatorSettings {
    #[garde(custom(validate_nav_mode))]
    #[schema(example = "left-sidebar")]
    pub default_nav_mode: String,

    #[garde(custom(validate_container_mode))]
    #[schema(example = "inset")]
    pub default_container_mode: String,

    #[garde(skip)]
    pub allow_user_customization: bool,

    #[garde(length(min = 4, max = 32))]
    #[schema(example = "#06b6d4")]
    pub custom_accent_color: Option<String>,

    #[garde(length(min = 1, max = 64))]
    #[schema(example = "Clarity Panel")]
    pub custom_brand_title: Option<String>,
}

pub fn validate_nav_mode(mode: &str, _ctx: &()) -> garde::Result {
    match mode {
        "left-sidebar" | "top-bar" | "collapsed-drawer" => Ok(()),
        _ => Err(garde::Error::new(
            "nav mode must be 'left-sidebar', 'top-bar', or 'collapsed-drawer'",
        )),
    }
}

pub fn validate_container_mode(mode: &str, _ctx: &()) -> garde::Result {
    match mode {
        "inset" | "flush" => Ok(()),
        _ => Err(garde::Error::new(
            "container mode must be 'inset' or 'flush'",
        )),
    }
}

impl Default for ClarityOperatorSettings {
    fn default() -> Self {
        Self {
            default_nav_mode: "left-sidebar".to_string(),
            default_container_mode: "inset".to_string(),
            allow_user_customization: true,
            custom_accent_color: Some("#06b6d4".to_string()),
            custom_brand_title: Some("Clarity".to_string()),
        }
    }
}

#[async_trait::async_trait]
impl SettingsSerializeExt for ClarityOperatorSettings {
    async fn serialize(
        &self,
        serializer: SettingsSerializer,
    ) -> Result<SettingsSerializer, anyhow::Error> {
        let serializer = serializer
            .write_raw_setting("default_nav_mode", &self.default_nav_mode)
            .write_raw_setting("default_container_mode", &self.default_container_mode)
            .write_raw_setting(
                "allow_user_customization",
                if self.allow_user_customization {
                    "true"
                } else {
                    "false"
                },
            );

        let serializer = serializer
            .write_serde_setting("custom_accent_color", &self.custom_accent_color)
            .context("failed to serialize custom_accent_color")?;

        let serializer = serializer
            .write_serde_setting("custom_brand_title", &self.custom_brand_title)
            .context("failed to serialize custom_brand_title")?;

        Ok(serializer)
    }
}

pub struct ClaritySettingsDeserializer;

#[async_trait::async_trait]
impl SettingsDeserializeExt for ClaritySettingsDeserializer {
    async fn deserialize_boxed(
        &self,
        mut deserializer: SettingsDeserializer<'_>,
    ) -> Result<ExtensionSettings, anyhow::Error> {
        // Deserializers must NEVER return Err on missing or malformed keys; fall back to defaults.
        let default = ClarityOperatorSettings::default();

        let default_nav_mode = deserializer
            .take_raw_setting("default_nav_mode")
            .map(|s| s.to_string())
            .filter(|mode| {
                matches!(
                    mode.as_str(),
                    "left-sidebar" | "top-bar" | "collapsed-drawer"
                )
            })
            .unwrap_or(default.default_nav_mode);

        let default_container_mode = deserializer
            .take_raw_setting("default_container_mode")
            .map(|s| s.to_string())
            .filter(|mode| matches!(mode.as_str(), "inset" | "flush"))
            .unwrap_or(default.default_container_mode);

        let allow_user_customization = deserializer
            .take_raw_setting("allow_user_customization")
            .and_then(|s| s.parse::<bool>().ok())
            .unwrap_or(default.allow_user_customization);

        let custom_accent_color = deserializer
            .read_serde_setting("custom_accent_color")
            .ok()
            .unwrap_or(default.custom_accent_color);

        let custom_brand_title = deserializer
            .read_serde_setting("custom_brand_title")
            .ok()
            .unwrap_or(default.custom_brand_title);

        Ok(Box::new(ClarityOperatorSettings {
            default_nav_mode,
            default_container_mode,
            allow_user_customization,
            custom_accent_color,
            custom_brand_title,
        }))
    }
}

pub fn deserializer() -> ExtensionSettingsDeserializer {
    Arc::new(ClaritySettingsDeserializer)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_operator_settings_validation_valid() {
        let settings = ClarityOperatorSettings::default();
        assert!(settings.validate().is_ok());
    }

    #[test]
    fn test_operator_settings_validation_invalid_nav() {
        let mut settings = ClarityOperatorSettings::default();
        settings.default_nav_mode = "unknown-mode".to_string();
        assert!(settings.validate().is_err());
    }

    #[test]
    fn test_operator_settings_validation_invalid_container() {
        let mut settings = ClarityOperatorSettings::default();
        settings.default_container_mode = "invalid-container".to_string();
        assert!(settings.validate().is_err());
    }
}
