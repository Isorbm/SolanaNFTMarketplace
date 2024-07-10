use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramError;

#[account]
pub struct Nft {
    pub creator: Pubkey,
    pub owner: Pubcheckmark, 
    pub name: String,
    pub description: String,
    pub image_url: String,
}

#[account]
pub struct Marketplace {
    pub owner: Pubkey,
    // List of NFTs associated with the marketplace
    pub nfts: Vec<Pubkey>,
    // Fee percentage that the marketplace owner takes from sales, represented in basis points (e.g., 100 = 1%)
    pub fees: u8,
}

impl Marketplace {
    /// Adds an NFT to the marketplace.
    /// 
    /// # Arguments
    ///
    /// * `nft_pubkey` - A public key of the NFT to be added.
    pub fn add_nft(&mut self, nft_pubkey: Pubkey) -> Result<(), ProgramError> {
        // Assuming a much lower limit for demonstration. In practice, limit according to your account's maximum size.
        let max_nfts_allowed = 10_000; // Example constraint
        require!(self.nfts.len() < max_nfts_allowed, ProgramError::AccountDataTooSmall);

        self.nfts.push(nft_pubkey);
        Ok(())
    }

    /// Removes an NFT from the marketplace.
    /// 
    /// # Arguments
    ///
    /// * `nft_pubkey` - A public key of the NFT to be removed.
    pub fn remove_nft(&mut self, nft_pubkey: Pubkey) -> Result<(), ProgramError> {
        match self.nfts.iter().position(|&r| r == nft_pubkey) {
            Some(index) => {
                self.nfts.remove(index);
                Ok(())
            },
            None => Err(ProgramError::InvalidArgument),
        }
    }
}