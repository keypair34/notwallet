use {
    crate::models::{asset_metadata::Metadata, environment::Environment},
    smbcloud_wallet_constants::constants::SPL_TOKEN_PROGRAM_ID,
    smbcloud_wallet_core_network::model::ErrorResponse,
    smbcloud_wallet_core_rpc::balance::{
        aggregate_spl_token_balance::aggregate_spl_token_balance, sol_balance::sol_balance,
    },
};

#[derive(Debug)]
pub enum SolanaAsset {
    Sol { meta: Metadata },
    BachToken { meta: Metadata },
    ZBtc { meta: Metadata },
    Jupiter { meta: Metadata },
    // US Dollar Stablecoins
    Usdc { meta: Metadata },
    Usdt { meta: Metadata },
    Usdg { meta: Metadata },
    Usds { meta: Metadata },
    Usd1 { meta: Metadata },
    // Euro stablecoins
    Eurc { meta: Metadata },
    // Local token
    BachToken0 { meta: Metadata },
    BachToken1 { meta: Metadata },
}

impl SolanaAsset {
    pub fn metadata(&self) -> Metadata {
        match self {
            Self::Sol { meta } => meta.to_owned(),
            Self::BachToken { meta } => meta.to_owned(),
            Self::ZBtc { meta } => meta.to_owned(),
            Self::Jupiter { meta } => meta.to_owned(),
            // Stablecoins
            Self::Usdc { meta } => meta.to_owned(),
            Self::Usdt { meta } => meta.to_owned(),
            Self::Usdg { meta } => meta.to_owned(),
            Self::Usds { meta } => meta.to_owned(),
            Self::Usd1 { meta } => meta.to_owned(),
            Self::Eurc { meta } => meta.to_owned(),
            // Local token
            Self::BachToken0 { meta } => meta.to_owned(),
            Self::BachToken1 { meta } => meta.to_owned(),
        }
    }
}
/*
#[tsync]
#[allow(dead_code)]
pub const USDC: &str = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
#[tsync]
#[allow(dead_code)]
pub const USDT: &str = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
#[tsync]
#[allow(dead_code)]
pub const USDG: &str = "2u1tszSeqZ3qBWF3uNGPFc8TzMk2tdiwknnRMWGWjGWH";
#[tsync]
#[allow(dead_code)]
pub const EURC: &str = "HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr";
#[tsync]
#[allow(dead_code)]
pub const JUPITER: &str = "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN";
#[tsync]
#[allow(dead_code)]
pub const MEW: &str = "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5";
#[tsync]
#[allow(dead_code)]
pub const PAYPAY_USD: &str = "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo";
#[tsync]
#[allow(dead_code)]
pub const BONK: &str = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";
#[tsync]
#[allow(dead_code)]
pub const USDS: &str = "USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA";
#[tsync]
#[allow(dead_code)]
pub const OFFICIAL_TRUMP: &str = "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN";
#[tsync]
#[allow(dead_code)]
pub const COINBASE_WRAPPED_BTC: &str = "cbbtcf3aa214zXHbiAZQwf4122FBYbraNdFqgw4iMij";
#[tsync]
#[allow(dead_code)]
pub const MELANIA_MEME: &str = "FUAfBo2jgks6gB4Z4LfZkqSZgzNucisEHqnNebaRxM1P";
#[tsync]
#[allow(dead_code)]
pub const JITO_STAKED_SOL: &str = "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn";
#[tsync]
#[allow(dead_code)]
pub const ZBTC: &str = "zBTCug3er3tLyffELcvDNrKkCymbPWysGcWihESYfLg";
#[tsync]
#[allow(dead_code)]
pub const USD1: &str = "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB";
*/
impl SolanaAsset {
    pub fn native() -> Self {
        Self::Sol {
            meta: Metadata::native(),
        }
    }

    pub fn from_address(address: String) -> Option<Self> {
        match address.as_str() {
            "So11111111111111111111111111111111111111112" => Some(Self::Sol {
                meta: Metadata::native(),
            }),
            "CTQBjyrX8pYyqbNa8vAhQfnRXfu9cUxnvrxj5PvbzTmf" => Some(Self::BachToken {
                meta: Metadata {
                    address,
                    name: "BACH Token".to_string(),
                    symbol: "BACH".to_string(),
                    decimal: 12,
                    logo_uri: "https://raw.githubusercontent.com/solana-labs/token-list/badd1dbe8c2d1e38c4f77b77f1d5fd5c60d3cccb/assets/mainnet/CTQBjyrX8pYyqbNa8vAhQfnRXfu9cUxnvrxj5PvbzTmf/bach-token-logo-Est.2022.png".to_string(),
                },
            }),
            "zBTCug3er3tLyffELcvDNrKkCymbPWysGcWihESYfLg" => Some(Self::ZBtc {
                meta: Metadata {
                    address,
                    name: "zBTC (zBTC)".to_string(),
                    symbol: "zBTC".to_string(),
                    decimal: 8,
                    logo_uri: "https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f5a6575734e6574776f726b48512f7a6274632d6d657461646174612f726566732f68656164732f6d61696e2f6c676f6f2d76322e706e67".to_string(),
                },
            }),
            // Local develoment tokens.
            "38JsCWEZ3dLRzcwxiCbL9rkkZqwwoWLAoCmqu7mWGSwq" => Some(Self::BachToken0 {
                meta: Metadata {
                    address,
                    name: "BACH Token Local 0".to_string(),
                    symbol: "BACHLOCAL0".to_string(),
                    decimal: 9,
                    logo_uri: "https://raw.githubusercontent.com/solana-labs/token-list/badd1dbe8c2d1e38c4f77b77f1d5fd5c60d3cccb/assets/mainnet/CTQBjyrX8pYyqbNa8vAhQfnRXfu9cUxnvrxj5PvbzTmf/bach-token-logo-Est.2022.png".to_string(),
                },
            }),
            "F1DKyNUT1zax4j241GiCPFJ9mG79HJtxeXPXH66L51Tp" => Some(Self::BachToken1 {
                meta: Metadata {
                    address,
                    name: "BACH Token Local 1".to_string(),
                    symbol: "BACHLOCAL1".to_string(),
                    decimal: 9,
                    logo_uri: "https://raw.githubusercontent.com/solana-labs/token-list/badd1dbe8c2d1e38c4f77b77f1d5fd5c60d3cccb/assets/mainnet/CTQBjyrX8pYyqbNa8vAhQfnRXfu9cUxnvrxj5PvbzTmf/bach-token-logo-Est.2022.png".to_string(),
                },
            }),
            _ => {
                println!("Unsupported Solana asset.");
                None
            }
        }
    }

    /// Get address' balance for this current asset.
    pub fn wallet_balance(
        self,
        environment: Environment,
        address: String,
    ) -> Result<(u64, f64), ErrorResponse> {
        match self {
            SolanaAsset::Sol { meta: _ } => sol_balance(environment.rpc_url(), address),
            SolanaAsset::BachToken { meta } => aggregate_spl_token_balance(
                environment.rpc_url(),
                address,
                SPL_TOKEN_PROGRAM_ID.to_string(),
                meta.address,
            ),
            SolanaAsset::ZBtc { meta } => aggregate_spl_token_balance(
                environment.rpc_url(),
                address,
                SPL_TOKEN_PROGRAM_ID.to_string(),
                meta.address,
            ),
            SolanaAsset::BachToken0 { meta } => aggregate_spl_token_balance(
                environment.rpc_url(),
                address,
                SPL_TOKEN_PROGRAM_ID.to_string(),
                meta.address,
            ),
            SolanaAsset::BachToken1 { meta } => aggregate_spl_token_balance(
                environment.rpc_url(),
                address,
                SPL_TOKEN_PROGRAM_ID.to_string(),
                meta.address,
            ),
        }
    }
}
