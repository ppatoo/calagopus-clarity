use shared::State;
use utoipa_axum::{router::OpenApiRouter, routes};

pub mod get;
pub mod put;

pub fn router(_state: &State) -> OpenApiRouter<State> {
    OpenApiRouter::new()
        .routes(routes!(get::route))
        .routes(routes!(put::route))
}
