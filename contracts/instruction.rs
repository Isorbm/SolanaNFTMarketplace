use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum NFTMarketplaceInstruction {
    CreateNFT {
        metadata: Vec<u8>,
    },
    PurchaseNFT {
        offered_price: u64,
    },
}

pub fn handle_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_bytes: &[u8],
) -> ProgramResult {
    let marketplace_instruction = NFTMarketplaceInstruction::try_from_slice(instruction_bytes)
        .map_err(|_| ProgramError::InvalidInstructionData)?;
    
    match marketplace_instruction {
        NFTMarketplaceInstruction::CreateNFT { metadata } => {
            msg!("Marketplace Instruction: CreateNFT");
            // Implementation for minting NFT goes here.
            Ok(())
        }
        NFTMarketplaceInstruction::PurchaseNFT { offered_price } => {
            msg!("Marketplace Instruction: PurchaseNFT");
            // Implementation for buying NFT goes here.
            Ok(())
        }
    }
}