use {
    serde::{Deserialize, Serialize},
    tsync::tsync,
};

#[tsync]
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Asset {
    pub id: String,
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub logo_url: String,
}
