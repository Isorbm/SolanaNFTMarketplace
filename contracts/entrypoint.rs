use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

#[derive(Debug, Clone, PartialEq)]
pub enum MarketplaceError {
    InvalidInstruction,
}

impl From<MarketplaceError> for ProgramError {
    fn from(e: MarketplaceError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello, Solana program!");

    let accounts_iter = &mut accounts.iter();

    let account = match next_account_info(accounts_iter) {
        Ok(account_info) => account_info,
        Err(_) => return Err(MarketplaceError::InvalidInstruction.into()),
    };

    Ok(())
}