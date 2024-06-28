use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum NFTInstruction {
    MintNFT {
        metadata: Vec<u8>,
    },
    BuyNFT {
        price: u64,
    },
}

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[Account|nfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = NFTInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;
    
    match instruction {
        NFTInstruction::MintNFT { metadata } => {
            msg!("Instruction: MintNFT");
            Ok(())
        }
        NFTInstruction::BuyNFT { price } => {
            msg!("Instruction: BuyNFT");
            Ok(())
        }
    }
}