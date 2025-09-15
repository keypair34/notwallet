use {solana_pubkey::Pubkey, solana_rpc_client::rpc_client::RpcClient, std::str::FromStr};

pub fn sol_balance(rpc_url: String, pubkey: String) -> f64 {
    let connection = RpcClient::new(rpc_url);
    let pubkey = match Pubkey::from_str(&pubkey) {
        Ok(pubkey) => pubkey,
        Err(e) => {
            println!("Error parsing pubkey: {}", e);
            return 0.0;
        }
    };
    match connection.get_balance(&pubkey) {
        Ok(balance) => balance as f64,
        Err(e) => {
            println!("Error getting balance: {}", e);
            return 0.0;
        }
    }
}
