use crate::constants::{
    FEE_ACCOUNT, JUPITER_BASE_URL, JUPITER_SWAP_PATH, JUPITER_SWAP_QUOTE_PATH, PLATFORM_FEE_BPS,
};
use crate::models::swap::{SwapQuoteResponse, SwapTransactionPayload, SwapTransactionResponse};
use network::{model::ErrorResponse, request};
use reqwest::{header::CONTENT_TYPE, Client};

pub async fn get_jupiter_swap_quote(
    from_token: &str,
    to_token: &str,
    amount: u64,
    slippage_bps: u64,
) -> Result<SwapQuoteResponse, ErrorResponse> {
    let url = format!(
        "{}{}?inputMint={}&outputMint={}&amount={}&slippageBps={}&platformFeeBps={}&feeAccount={}",
        JUPITER_BASE_URL,
        JUPITER_SWAP_QUOTE_PATH,
        from_token,
        to_token,
        amount,
        slippage_bps,
        PLATFORM_FEE_BPS,
        FEE_ACCOUNT
    );
    let client = Client::new().get(url);
    request(client).await
}

pub async fn build_swap_transaction(
    payload: SwapTransactionPayload,
) -> Result<SwapTransactionResponse, String> {
    let url = format!("{}{}", JUPITER_BASE_URL, JUPITER_SWAP_PATH);
    let client = Client::new();

    let response = match client
        .post(url)
        .header(CONTENT_TYPE, "application/json")
        .json(&payload)
        .send()
        .await
    {
        Ok(response) => response,
        Err(err) => return Err(err.to_string()),
    };

    match response.json().await {
        Ok(json) => json,
        Err(err) => Err(err.to_string()),
    }
}
