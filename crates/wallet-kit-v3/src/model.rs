use std::fmt::Display;

#[derive(uniffi::Record)]
pub struct KeyPair {
    pub pubkey: String,
}

#[derive(uniffi::Record)]
pub struct Wallet {
    pub seed: String,
    pub keypair: KeyPair,
}

#[derive(uniffi::Error, Debug)]
pub enum KeyPairError {
    MnemonicError(String),
    InvalidAddress(String),
}

impl Display for KeyPairError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            KeyPairError::InvalidAddress(addr) => write!(f, "Invalid address: {}", addr),
            KeyPairError::MnemonicError(err) => write!(f, "Mnemonic error: {}", err),
        }
    }
}

#[derive(uniffi::Enum)]
pub enum StorageKey {
    Seed,
    KeyPairs,
    ActiveKeyPair,
}

impl Display for StorageKey {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            StorageKey::Seed => write!(f, "seed"),
            StorageKey::KeyPairs => write!(f, "keypairs"),
            StorageKey::ActiveKeyPair => write!(f, "activeKeypair"),
        }
    }
}
