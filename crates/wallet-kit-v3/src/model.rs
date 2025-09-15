use std::fmt::Display;

#[derive(uniffi::Record)]
pub struct KeyPair {
    pub pubkey: String,
}

#[derive(uniffi::Error, Debug)]
pub enum KeyPairError {
    InvalidAddress(String),
}

impl Display for KeyPairError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            KeyPairError::InvalidAddress(addr) => write!(f, "Invalid address: {}", addr),
        }
    }
}
