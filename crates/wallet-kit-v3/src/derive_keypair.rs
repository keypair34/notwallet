use {
    crate::model::{KeyPair, KeyPairError},
    solana_sdk::signer::Signer,
    wallet_core::derive_keypair::derive_keypair,
};

#[uniffi::export]
pub fn derive_keypair_default(
    mnemonic_phrase: &str,
    account: u32,
) -> Result<KeyPair, KeyPairError> {
    match derive_keypair(mnemonic_phrase, account, 0) {
        Ok(keypair) => {
            let pubkey = keypair.pubkey().to_string();
            Ok(KeyPair { pubkey })
        }
        Err(e) => Err(KeyPairError::InvalidAddress(e.to_string())),
    }
}
