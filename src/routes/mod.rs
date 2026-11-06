use shared::State;
use utoipa_axum::router::OpenApiRouter;

pub mod settings;

pub fn admin_router(state: &State) -> OpenApiRouter<State> {
    OpenApiRouter::new().nest(
        "/extensions/dev.antigravity.clarity/settings",
        settings::router(state),
    )
}
