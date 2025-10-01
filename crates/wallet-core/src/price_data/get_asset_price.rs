use {
    crate::models::birdeye_price_response::BirdeyePriceResponse,
    constants::constants::{BIRDEYE_API_KEY, BIRDEYE_BASE_URL, BIRDEYE_PRICE_PATH, USER_AGENT},
    log::debug,
    network::{model::ErrorResponse, request},
    reqwest::Client,
    std::time::Duration,
    tokio::time::sleep,
};

pub async fn get_asset_price(asset: &str) -> Result<BirdeyePriceResponse, ErrorResponse> {
    debug!("Get asset price");
    // By pass too many request error from BiredEye 😂
    sleep(Duration::from_millis(800)).await;
    let url = format!(
        "{}{}?address={}",
        BIRDEYE_BASE_URL, BIRDEYE_PRICE_PATH, asset
    );
    println!("🦀🦀  URL: {}", url);
    let client = Client::new()
        .get(url)
        .header("X-API-KEY", BIRDEYE_API_KEY)
        .header("User-Agent", USER_AGENT);
    request(client).await
}
