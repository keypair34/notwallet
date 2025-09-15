use {
    crate::models::keypair::KeyPairError,
    wallet_core::balance::sol_balance::sol_balance as core_sol_balance,
};

#[uniffi::export]
pub fn sol_balance(rpc_url: String, pubkey: String) -> Result<f64, KeyPairError> {
    let balance = core_sol_balance(rpc_url, pubkey);
    Ok(balance)
}
