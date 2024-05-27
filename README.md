# Solana NFT Marketplace

Welcome to the **Solana NFT Marketplace**! This decentralized application (dApp) allows users to mint, buy, sell, and trade non-fungible tokens (NFTs) on the Solana blockchain. The project is built with a modern stack, including React and TypeScript for the frontend, Node.js and Express for the backend, and Solana smart contracts written in Rust.

## Features

- **Mint NFTs:** Users can create new NFTs by uploading images and adding descriptions.
- **View NFTs:** Users can browse a list of all available NFTs.
- **Buy NFTs:** Users can purchase NFTs listed in the marketplace.
- **Trade NFTs:** Users can trade NFTs securely on the Solana blockchain.

## Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** Node.js, Express
- **Smart Contracts:** Rust, Solana

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js and npm
- Rust and Cargo
- Solana CLI

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Isorbm/SolanaNFTMarketplace.git
    cd SolanaNFTMarketplace
    ```

2. **Setup the frontend:**

    ```sh
    cd frontend
    npm install
    npm start
    ```

3. **Setup the backend:**

    ```sh
    npm install
    node app.js
    ```

4. **Build the smart contracts:**

    ```sh
    cd contracts
    cargo build-bpf
    ```

## Usage

1. **Mint an NFT:** Use the MintNFT form to create a new NFT by providing a name, description, and image URL.
2. **View NFTs:** Browse the list of available NFTs on the homepage.
3. **Buy an NFT:** Click the "Buy" button next to an NFT to purchase it using your Solana wallet.

## API Endpoints

### Backend (Express)

- **GET /api/nfts:** Retrieve a list of all NFTs.
- **POST /api/nfts:** Mint a new NFT.
- **POST /api/nfts/:id/buy:** Buy an existing NFT.

## Smart Contract Structure

### Solana Smart Contracts (Rust)

- **lib.rs:** Defines the main entry points and includes necessary modules for instruction parsing, state management, and error handling.
- **entrypoint.rs:** Defines the main entry function that processes instructions received from the Solana runtime.
- **instruction.rs:** Defines the instructions supported by the contract, such as minting and buying NFTs.
- **state.rs:** Defines the data structures used to represent the state of the NFTs and the marketplace.
- **error.rs:** Defines custom error types and error handling logic used in the contract.

## Contributing

We welcome contributions! Please fork this repository, create a new branch, and submit a pull request with your changes.

---

Thank you for checking out the **Solana NFT Marketplace**! Enjoy creating and trading NFTs on the Solana blockchain. 🚀🖼️
