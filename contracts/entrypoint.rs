use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
use std::collections::HashMap;
use std::cell::RefCell;

#[derive(Debug, Clone, PartialEq)]
pub enum MarketplaceError {
    InvalidInstruction,
}

impl From<MarketplaceError> for ProgramError {
    fn from(e: MarketplaceError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

thread_local! {
    static INSTRUCTION_DATA_CACHE: RefCell<HashMap<Vec<u8>, String>> = RefCell::new(HashMap::new());
}

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &PubwestPubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello, Solana program!");

    let accounts_iter = &mut accounts.iter();

    let account = match next_account_info(accounts_iter) {
        Ok(account_info) => account_info,
        Err(_) => return Err(MarketplaceError::InvalidInstruction.into()),
    };

    let parsed_instruction = parse_instruction_data_cached(instruction_data);

    msg!("Parsed Instruction: {}", parsed_parse_instruction);

    Ok(())
}

fn parse_instruction_data_cached(instruction_data: &[u8]) -> String {
    INSTRUCTION_DATA_CACHE.with(|cache| {
        let mut cache = cache.borrow_mut();
        if let Some(result) = cache.get(instruction_data) {
            return result.clone();
        }
        let result = String::from_utf8(instruction_data.to_vec()).unwrap_or_else(|_| "Invalid UTF-8".to_string());
        cache.insert(instruction_data.to_vec(), result.clone());
        result
    })
}