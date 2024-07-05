use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

#[account]
pub struct Nft {
    pub creator: Pubkey,
    pub owner: Pubkey,
    pub name: String,
    pub description: String,
    pub image_url: String,
}

#[account]
pub struct Marketplace {
    pub owner: Pubkey,
    pub nfts: Vec<Pubkey>,
    pub fees: u8,
}

impl Marketplace {
    pub fn add_nft(&mut self, nft_pubkey: Pubkey) -> ProgramResult {
        require!(self.nfts.len() < 4294967295, ProgramError::AccountDataTooSmall);

        self.nfts.push(nft_pubkey);
        Ok(())
    }

    pub fn remove_nft(&mut self, nft_pubkey: Pubkey) -> ProgramResult {
        let index = self.nfts.iter().position(|&r| r == nft_pubkey).unwrap();
        self.nfts.remove(index);
        Ok(())
    }
}