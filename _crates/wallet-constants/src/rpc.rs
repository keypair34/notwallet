use std::env;

pub fn mainnet_rpc_url() -> String {
    env::var("SOLANA_MAINNET_RPC_BASE_URL").unwrap_or_default()
}

pub fn testnet_rpc_url() -> String {
    env::var("SOLANA_TESTNET_RPC_BASE_URL").unwrap_or_default()
}

pub fn devnet_rpc_url() -> String {
    env::var("SOLANA_DEVNET_RPC_BASE_URL").unwrap_or_default()
}

pub fn local_rpc_url() -> String {
    "http://localhost:8899".to_string()
}
