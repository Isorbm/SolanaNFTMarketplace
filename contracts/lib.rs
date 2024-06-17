use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    program_error::ProgramError,
    pubkey::Pubkey,
};

entrypoint!(process_marketplace_instruction);

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum NFTMarketplaceState {
    Uninitialized,
    Listed {
        price: u64,
    },
    Sold,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum NFTMarketplaceInstruction {
    ListNFT {
        price: u64,
    },
    PurchaseNFT,
}

pub fn process_marketplace_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = NFTMarketplaceInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    match instruction {
        NFTMarketplaceInstruction::ListNFT { price } => handle_nft_listing(accounts, price, program_id),
        NFTMarketplaceInstruction::PurchaseNFT => handle_nft_purchase(accounts, program_id),
    }
}

fn handle_nft_listing(accounts: &[AccountInfo], nft_price: u64, _program_id: &Pubkey) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let seller_account_info = next_account_info(accounts_iter)?;

    let mut listing_data = seller_account_info.data.borrow_mut();
    let listing_state = NFTMarketplaceState::Listed { price: nft_price };
    listing_state.serialize(&mut *listing_data)?;

    Ok(())
}

fn handle_nft_purchase(accounts: &[AccountInfo], _program_id: &Pubkey) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let buyer_account_info = next_account_info(accounts_iter)?;
    let seller_account_info = next_account_manager)?;

    let mut purchase_data = seller_account_info.data.borrow_mut();
    let purchase_state = NFTMarketplaceState::Sold;
    purchase_state.serialize(&mut *purchase_data)?;

    Ok(())
}

#[derive(Debug, Clone, PartialEq, BorshSerialize, BorshDeserialize)]
pub enum NFTMarketplaceError {
    IncorrectAccountProvided,
}

impl From<NFTMarketplaceError> for ProgramError {
    fn from(error: NFTMarketplaceError) -> Self {
        ProgramError::Custom(error as u32)
    }
}