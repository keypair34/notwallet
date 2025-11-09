use {
    crate::model::airdrop::CheckPubkeyResponse,
    crate::model::settings_debug::AirdropEnvironment,
    reqwest::Client,
    smbcloud_wallet_core_network::{model::ErrorResponse, request},
};

pub(crate) async fn check_pubkey(
    environment: AirdropEnvironment,
    pubkey: &str,
) -> Result<CheckPubkeyResponse, ErrorResponse> {
    let url = format!(
        "{}/api/v1/onboarding/check-pubkey?pubkey={}",
        environment.base_url(),
        pubkey
    );
    let builder = Client::new().get(&url);
    request(builder).await
}
