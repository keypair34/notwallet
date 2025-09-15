use {
    log::{debug, error},
    network::model::{
        ErrorCode::{InvalidPubkey, NetworkError},
        ErrorResponse,
    },
    serde::{Deserialize, Serialize},
    solana_account_decoder::{parse_token::UiTokenAccount, UiAccountData},
    solana_client::{rpc_client::RpcClient, rpc_request::TokenAccountsFilter},
    solana_program::pubkey::Pubkey,
    std::str::FromStr,
};

pub(crate) fn spl_token_accounts_for(
    rpc_url: String,
    pubkey: String,
    spl_token_program_id: String,
    token_address: String,
) -> Result<Vec<UiTokenAccount>, ErrorResponse> {
    // Get token accounts for a specific token
    let target_spl_token_accounts = spl_token_accounts(rpc_url, pubkey, spl_token_program_id)?
        .into_iter()
        .filter(|account| account.mint == token_address)
        .collect::<Vec<_>>();

    debug!(
        "Number of target token accounts: {}",
        target_spl_token_accounts.len()
    );

    Ok(target_spl_token_accounts)
}

pub(crate) fn spl_token_accounts_with_balance(
    rpc_url: String,
    pubkey: String,
    spl_token_program_id: String,
) -> Result<Vec<UiTokenAccount>, ErrorResponse> {
    let target_spl_token_accounts = spl_token_accounts(rpc_url, pubkey, spl_token_program_id)?;
    let spl_token_accounts_with_balance = target_spl_token_accounts
        .into_iter()
        .filter_map(|account| {
            // Only non-SOL
            if account.is_native {
                return None;
            }
            // token_amount.amount is the amount of tokens in its smallest unit
            if let Ok(amount) = account.token_amount.amount.parse::<u64>() {
                if amount > 0 {
                    Some(account)
                } else {
                    None
                }
            } else {
                None
            }
        })
        .collect::<Vec<_>>();
    Ok(spl_token_accounts_with_balance)
}
