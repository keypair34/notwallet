use {
    crate::{constants::store::store, model::settings_debug::AirdropEnvironment},
    log::{error, info},
    tauri::{command, AppHandle},
    tsync::tsync,
};

#[tsync]
const KEY_AIRDROP_ENVIRONMENT: &str = "airdrop_environment";

/// Get the current airdrop environment.
/// Or set it to the default production environment.
#[command]
pub async fn get_airdrop_environment(app: AppHandle) -> AirdropEnvironment {
    let store_result = store(&app);
    match store_result {
        Ok(store) => {
            if let Some(env) = store.get(KEY_AIRDROP_ENVIRONMENT) {
                info!("Found existing airdrop environment: {}", env);
                return AirdropEnvironment::from_value(env);
            }
            info!("No existing airdrop environment found. Setting to production.");
            store.set(KEY_AIRDROP_ENVIRONMENT, "production");
            AirdropEnvironment::Production
        }
        Err(err) => {
            error!(
                "Failed to get airdrop environment: {}. Setting to production.",
                err
            );
            AirdropEnvironment::Production
        }
    }
}

#[command]
pub async fn set_airdrop_environment(
    app: AppHandle,
    environment: AirdropEnvironment,
) -> Result<AirdropEnvironment, String> {
    let store_result = store(&app);
    match store_result {
        Ok(store) => {
            store.set(KEY_AIRDROP_ENVIRONMENT, environment.to_string());
            Ok(environment)
        }
        Err(err) => {
            error!("Failed to set airdrop environment: {}", err);
            Err("Failed to set airdrop environment.".to_string())
        }
    }
}
