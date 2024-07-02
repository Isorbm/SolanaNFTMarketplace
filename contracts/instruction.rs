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
    ListNFTForSale {
        price: u64,
    },
    UpdateNFTMetadata {
        new_metadata: Vec<u8>,
    },
    TransferNFTOwnership {
        new_owner: Pubkey,
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
            Ok(())
        }
        NFTMarketplaceInstruction::PurchaseNFT { offered_price } => {
            msg!("Marketplace Instruction: PurchaseNFT");
            Ok(())
        }
        NFTMarketshipInstruction::ListNFTForSale { price } => {
            msg!("Market Instruction: ListNFTForSale with price: {}", price);
            Ok(())
        }
        NFTMarketplaceInstruction::UpdateNFTMetadata { new_metadata } => {
            msg!("Marketplace Instruction: UpdateNFTMetadata");
            Ok(())
        }
        NFTMarketplaceInstruction::TransferNFTOwnership { new_owner } => {
            msg!("Marketplace Instruction: TransferNFTOwnership");
            Ok(())
        }
    }
}