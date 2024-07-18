use solana_program::{
    program_error::ProgramError,
    decode_error::DecodeError,
    program_pack::{IsInitialized, Pack, Sealed},
};
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, PartialEq)]
pub enum MyContractError {
    #[error("Example Error")]
    ExampleError,
    #[error("Unauthorized")]
    Unauthorized,
    #[error("Invalid Instruction")]
    InvalidInstruction,
}

impl From<MyContractError> for ProgramError {
    fn from(e: MyContractError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

impl<T> DecodeError<T> for MyContractError {
    fn type_of() -> &'static str {
        "MyContractError"
    }
}