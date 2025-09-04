use {
    crate::constants::rpc::rpc_url, log::info, network::model::ErrorResponse, tauri::command,
    wallet_kit::balance::other_assets_balance, wallet_kit::models::currency::FiatCurrency,
};

#[command]
pub async fn get_other_assets_balance(pubkey: String) -> Result<Vec<String>, ErrorResponse> {
    info!("Getting wallet balance for {}", pubkey);
    other_assets_balance(rpc_url(), pubkey, Some(FiatCurrency::USD)).await
}
