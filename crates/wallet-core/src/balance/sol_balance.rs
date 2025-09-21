use {
    log::{debug, error},
    solana_pubkey::Pubkey,
    solana_rpc_client::rpc_client::RpcClient,
    std::str::FromStr,
};

pub fn sol_balance(rpc_url: String, pubkey: String) -> Result<f64, String> {
    debug!("RUST ==> Will load balance");
    let connection = RpcClient::new(rpc_url);
    let pubkey = match Pubkey::from_str(&pubkey) {
        Ok(pubkey) => pubkey,
        Err(e) => {
            error!("RUST ==> Error parsing pubkey: {}", e);
            return Err(format!("Error parsing pubkey: {}", e));
        }
    };
    match connection.get_balance(&pubkey) {
        Ok(balance) => {
            debug!("RUST ==> Get balance for {}: {}", pubkey, balance);
            Ok(balance as f64)
        }
        Err(e) => {
            error!("RUST ==> Error getting balance: {}", e);
            Err(format!("Error getting balance: {}", e))
        }
    }
}
