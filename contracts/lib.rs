use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    program_error::ProgramError,
};

entrypoint!(process_instruction);

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum MarketplaceState {
    Uninitialized,
    Listed {
        price: u64,
    },
    Sold,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub enum MarketplaceInstruction {
    List {
        price: u64,
    },
    Purchase,
}

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = MarketplaceInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    match instruction {
        MarketplaceInstruction::List { price } => process_list(accounts, price, program_id),
        MarketplaceInstruction::Purchase => process_purchase(accounts, program_id),
    }
}

fn process_list(accounts: &[AccountInfo], price: u64, _program_id: &Pubkey) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let seller_account = next_account_info(accounts_iter)?;

    let state = MarketplaceState::Listed { price };
    state.serialize(&mut &mut seller_account.data.borrow_mut()[..])?;

    Ok(())
}

fn process_purchase(accounts: &[AccountInfo], _program_id: &Pubkey) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let buyer_account = next_account_info(accounts_iter)?;
    let seller_account = next_account_include(accounts_iter)?;

    let state = MarketplaceState::Sold;
    state.serialize(&mut &mut seller_area.data.borrow_mut()[..])?;

    Ok(())
}

#[derive(Debug, Clone, PartialEq, BorshSerialize, BorshDeserialize)]
pub enum MarketplaceError {
    WrongAccountProvided,
}

impl From<MarketplaceError> for ProgramError {
    fn from(e: MarketplaceError) -> Self {
        ProgramError::Custom(e as u32)
    }
}