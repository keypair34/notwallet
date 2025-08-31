use crate::constants::LAMPORTS_PER_SOL;
use log::{debug, error};
use serde::{Deserialize, Serialize};
use solana_account_decoder::{parse_token::UiTokenAccount, UiAccountData};
use solana_client::{rpc_client::RpcClient, rpc_request::TokenAccountsFilter};
use solana_program::pubkey::Pubkey;
use std::str::FromStr;

pub fn spl_balance(
    rpc_url: String,
    pubkey: String,
    spl_token_program_id: String,
    token_address: String,
) -> String {
    debug!(
        "Fetching SPL balance for {}, token {}",
        pubkey, token_address
    );
    let balance = aggregate_spl_token_balance(rpc_url, pubkey, spl_token_program_id, token_address);
    format!("{} BACH", balance)
}

pub fn aggregate_spl_token_balance(
    rpc_url: String,
    pubkey: String,
    spl_token_program_id: String,
    token_address: String,
) -> f64 {
    let connection = RpcClient::new(rpc_url);

    let spl_token_program_id_pubkey = Pubkey::from_str(&spl_token_program_id).unwrap();
    let pubkey = Pubkey::from_str(&pubkey).unwrap();

    // Get all token accounts owned by the pubkey
    let spl_token_accounts = match connection.get_token_accounts_by_owner(
        &pubkey,
        TokenAccountsFilter::ProgramId(spl_token_program_id_pubkey),
    ) {
        Ok(accounts) => accounts,
        Err(err) => {
            error!("Error getting token accounts: {}", err);
            return 0.0;
        }
    };

    debug!("Number of token accounts: {}", spl_token_accounts.len());

    // Get bach token accounts
    let target_spl_token_accounts = spl_token_accounts
        .iter()
        .map(|account| account.account.clone())
        .filter_map(|account| get_token_account(&account.data))
        .filter(|account| account.mint == token_address)
        .collect::<Vec<_>>();

    debug!(
        "Number of target token accounts: {}",
        target_spl_token_accounts.len()
    );

    if target_spl_token_accounts.is_empty() {
        return 0.0;
    }

    // Get aggregated amount
    let mut aggregated_amount = 0.0;
    for account in target_spl_token_accounts {
        if let Some(ui_amount) = account.token_amount.ui_amount {
            aggregated_amount += ui_amount;
        }
    }

    aggregated_amount
}

pub fn sol_balance(rpc_url: String, pubkey: String) -> String {
    let connection = RpcClient::new(rpc_url);
    let pubkey = match Pubkey::from_str(&pubkey) {
        Ok(pubkey) => pubkey,
        Err(e) => {
            println!("Error parsing pubkey: {}", e);
            return "0".to_string();
        }
    };
    let balance = match connection.get_balance(&pubkey) {
        Ok(balance) => balance as f64,
        Err(e) => {
            println!("Error getting balance: {}", e);
            return "0".to_string();
        }
    };
    let pretty_balance = balance / LAMPORTS_PER_SOL;
    println!("{:#?} SOL", pretty_balance);
    // Display SOL balance
    format!("{:.9} SOL", pretty_balance)
}

#[derive(Debug, PartialEq, Serialize, Deserialize)]
struct TokenAccount {
    pub info: UiTokenAccount,
}

fn get_token_account(data: &UiAccountData) -> Option<UiTokenAccount> {
    let parsed_account = match data {
        solana_account_decoder::UiAccountData::Json(parsed) => parsed,
        _ => return None,
    };
    let token_account: TokenAccount = match serde_json::from_value(parsed_account.parsed.clone()) {
        Ok(account) => {
            println!("Parsed Account: {:?}", account);
            account
        }
        Err(e) => {
            println!("Error parsing account: {}", e);
            return None;
        }
    };
    Some(token_account.info)
}
