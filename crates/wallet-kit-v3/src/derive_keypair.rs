use {
    crate::model::{KeyPair, KeyPairError, Wallet},
    solana_sdk::signer::Signer,
    wallet_core::{create_seed_phrase::create_seed_phrase, derive_keypair::derive_keypair},
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

/// Create a new 12-word English seed phrase and derive the default keypair.
///
/// # Example
///
/// ```
/// use wallet_kit::model::KeyPair;
/// use wallet_kit::derive_keypair::create_wallet;
///
/// let keypair = create_wallet().unwrap();
/// assert_eq!(keypair.pubkey(), "B365555555555555555555555555555555555555555555555555555555555555");
/// ```
#[uniffi::export]
pub fn create_wallet() -> Result<Wallet, KeyPairError> {
    let mnemonic_phrase = match create_seed_phrase(None, None) {
        Ok(mnemonic_phrase) => mnemonic_phrase.to_string(),
        Err(e) => return Err(KeyPairError::MnemonicError(e.to_string())),
    };
    let keypair = derive_keypair_default(&mnemonic_phrase, 0)?;
    Ok(Wallet {
        seed: mnemonic_phrase,
        keypair,
    })
}
