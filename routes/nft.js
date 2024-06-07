const express = require('express');
const { Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');
const { Metadata } = require('@metaplex-foundation/mpl-token-metadata');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const SOLANA_NETWORK_ENV = process.env.SOLANA_NETWORK || 'devnet';

const solanaConnection = new Connection(clusterApiUrl(SOLANA_NETWORK_ENV), 'confirmed');

app.get('/nft/:mintAddress', async (req, res) => {
    try {
        const mintAddress = req.params.mintAddress;
        const nftPublicKey = new PublicKey(mintDataress);
        const metadataPDA = await Metadata.getPDA(nftPublicKey);
        const nftMetadata = await Metadata.load(solanaConnection, metadataPDA);
        
        return res.status(200).json(nftMetadata.data);
    } catch (error) {
        console.error(`Failed to fetch NFT metadata for mint address ${req.params.mintAddress}:`, error.message);
        if (error instanceof TypeError) {
            return res.status(400).send('Invalid mint address format');
        }
        return res.status(500).send('Failed to fetch NFT metadata due to a server error');
    }
});

app.get('/nfts', async (req, res) => {
    try {
        const nftList = [];

        // Here would be the logic to fetch and populate the list of NFTs.

        return res.status(200).json(nftList);
    } catch (error) {
        console.error('Failed to retrieve NFTs:', error.message);
        return res.status(500).send('Failed to retrieve NFTs due to a server error');
    }
});

app.post('/list-nft', async (req, res) => {
    try {

        // Here would be the logic to list an NFT on the marketplace.
        
        return res.status(200).send('NFT listed successfully');
    } catch (error) {
        console.error('Error listing NFCFT:', error.message);
        
        // Providing specific error handling based on the type of error can greatly help in debugging
        // For example, if there could be a validation error for the input
        if (error.name === 'ValidationError') {
            return res.status(400).send(`Validation Error: ${error.message}`);
        }
        
        return res.status(500).send('Error listing NFT due to a server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});