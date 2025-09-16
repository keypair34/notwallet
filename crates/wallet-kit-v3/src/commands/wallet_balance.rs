use {
    crate::models::{
        keypair::KeyPairError,
        network_type::{rpc_url, NetworkType},
    },
    wallet_core::balance::sol_balance::sol_balance as core_sol_balance,
};

#[uniffi::export]
pub fn wallet_balance(network: NetworkType, pubkey: String) -> Result<f64, KeyPairError> {
    match core_sol_balance(rpc_url(network), pubkey) {
        Ok(balance) => Ok(balance as f64),
        Err(e) => Err(KeyPairError::InvalidAddress(e)),
    }
}
