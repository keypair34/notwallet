use {
    crate::{
        assets::{BACH_TOKEN, SOLANA},
        models::{asset::AssetBalance, currency::FiatCurrency, price::BirdeyePriceResponse},
        spl_token::{spl_token_accounts_for, spl_token_accounts_with_balance},
    },
    constants::constants::{
        BIRDEYE_API_KEY, BIRDEYE_BASE_URL, BIRDEYE_PRICE_PATH, LAMPORTS_PER_SOL,
        SPL_TOKEN_PROGRAM_ID, USER_AGENT,
    },
    log::{debug, error},
    network::{
        model::{ErrorCode::BalanceError, ErrorResponse},
        request,
    },
    reqwest::Client,
    std::collections::HashMap,
    wallet_core::balance::sol_balance::sol_balance as core_sol_balance,
};

pub(crate) fn spl_token_accounts(
    rpc_url: String,
    pubkey: String,
    spl_token_program_id: String,
) -> Result<Vec<UiTokenAccount>, ErrorResponse> {
    let connection = RpcClient::new(rpc_url);

    let spl_token_program_id_pubkey = match Pubkey::from_str(&spl_token_program_id) {
        Ok(pubkey) => pubkey,
        Err(err) => {
            error!("Error parsing SPL token program ID: {}", err);
            return Err(ErrorResponse::Error {
                code: InvalidPubkey,
                message: err.to_string(),
            });
        }
    };

    let pubkey = match Pubkey::from_str(&pubkey) {
        Ok(pubkey) => pubkey,
        Err(err) => {
            error!("Error parsing wallet pubkey: {}", err);
            return Err(ErrorResponse::Error {
                code: InvalidPubkey,
                message: err.to_string(),
            });
        }
    };

    // Get all token accounts owned by the pubkey
    let rpc_keyed_accounts = match connection.get_token_accounts_by_owner(
        &pubkey,
        TokenAccountsFilter::ProgramId(spl_token_program_id_pubkey),
    ) {
        Ok(accounts) => accounts,
        Err(err) => {
            error!("Error getting token accounts: {}", err);
            return Err(ErrorResponse::Error {
                code: NetworkError,
                message: err.to_string(),
            });
        }
    };

    debug!("RPC keyed accounts: {}", rpc_keyed_accounts.len());

    // Get token accounts
    let spl_token_accounts = rpc_keyed_accounts
        .iter()
        .map(|account| account.account.clone())
        .filter_map(|account| get_token_account(&account.data))
        .collect::<Vec<_>>();

    debug!("Token accounts: {}", spl_token_accounts.len());

    Ok(spl_token_accounts)
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct TokenAccount {
    pub info: UiTokenAccount,
}

fn get_token_account(data: &UiAccountData) -> Option<UiTokenAccount> {
    let parsed_account = match data {
        solana_account_decoder::UiAccountData::Json(parsed) => parsed,
        _ => {
            error!("Failed to parse account data - not in JSON format");
            return None;
        }
    };
    let token_account: TokenAccount = match serde_json::from_value(parsed_account.parsed.clone()) {
        Ok(account) => {
            debug!("Parsed Account: {:?}", account);
            account
        }
        Err(e) => {
            error!("Error parsing token account: {}", e);
            return None;
        }
    };
    Some(token_account.info)
}
