use {
    crate::models::asset_metadata::Metadata,
    smbcloud_wallet_constants::{
        assets_solana::{
            ADDRESS_BACH_TOKEN, ADDRESS_EURC, ADDRESS_JUPITER, ADDRESS_SOL, ADDRESS_USD1,
            ADDRESS_USDC, ADDRESS_USDG, ADDRESS_USDS, ADDRESS_USDT, ADDRESS_ZBTC,
        },
        constants::SPL_TOKEN_PROGRAM_ID,
    },
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

impl SolanaAsset {
    pub fn native() -> Self {
        Self::Sol {
            meta: Metadata::native(),
        }
    }

    pub fn smallest_denomination(self) -> f64 {
        10_u64.pow(self.metadata().decimal as u32) as f64
    }

    pub fn from_address(address: String) -> Option<Self> {
        match address.as_str() {
            ADDRESS_SOL => Some(Self::Sol {
                meta: Metadata::native(),
            }),
            ADDRESS_BACH_TOKEN => Some(Self::BachToken {
                meta: Metadata::bach_token(),
            }),
            ADDRESS_ZBTC => Some(Self::ZBtc {
                meta: Metadata::zbtc(),
            }),
            ADDRESS_JUPITER => Some(Self::Jupiter{
                meta: Metadata::jupiter(),
            }),
            ADDRESS_USDC => Some(Self::Usdc {
                meta: Metadata::usdc(),
            }),
            ADDRESS_USDT => Some(Self::Usdt {
                meta: Metadata::usdt(),
            }),
            ADDRESS_USDG => Some(Self::Usdg {
                meta: Metadata::usdg(),
            }),
            ADDRESS_USDS => Some(Self::Usds {
                meta: Metadata::usds(),
            }),
            ADDRESS_USD1 => Some(Self::Usd1 {
                meta: Metadata::usd1(),
            }),
            ADDRESS_EURC => Some(Self::Eurc {
                meta: Metadata::eurc(),
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
        rpc_url: String,
        address: String,
    ) -> Result<(u64, f64), ErrorResponse> {
        match self {
            SolanaAsset::Sol { meta: _ } => sol_balance(rpc_url, address),
            // All SPL tokens use the same balance aggregation logic
            _ => {
                let meta = self.metadata();
                aggregate_spl_token_balance(
                    rpc_url,
                    address,
                    SPL_TOKEN_PROGRAM_ID.to_string(),
                    meta.address,
                )
            }
        }
    }
}
