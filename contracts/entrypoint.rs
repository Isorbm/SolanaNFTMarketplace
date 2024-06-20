use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey, 
    accounts: &[AccountInfo], 
    instruction_data: &[u8], 
) -> ProgramResult {
    msg!("Hello, Solana program!");

    let accounts_iter = &mut accounts.iter();

    let account = next_account_info(accounts_iterator)?;

    Ok(())
}