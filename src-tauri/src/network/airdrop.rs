use crate::constants::network::API_BASE_URL;
use network::{models::ErrorResponse, request};
use serde::Serialize;

#[derive(Serialize)]
struct AirdropRequest<'a> {
    pubkey: &'a str,
    signature: &'a str,
}

pub async fn airdrop(pubkey: String, signature: String) -> Result<String, ErrorResponse> {
    let client = reqwest::Client::new();
    let req_body = AirdropRequest {
        pubkey: &pubkey,
        signature: &signature,
    };

    let url = format!("{}/api/v1/airdrop", API_BASE_URL);
    let builder = client.post(&url).json(&req_body);
    request(builder).await
}
