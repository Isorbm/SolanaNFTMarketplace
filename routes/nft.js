const express = require('express');
const { Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');
const { Metadata } = require('@metaplex-foundation/mpl-token-metadata');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const SOLANA_NETWORK = process.env.SOLANA_NETWORK || 'devnet';

const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), 'confirmed');

app.get('/nft/:mintAddress', async (req, res) => {
    try {
        const mintAddress = req.params.mintAddress;
        const publicKey = new PublicKey(mintAddress);
        const pda = await Metadata.getPDA(publicKey);
        const metadata = await Metadata.load(connection, pda);
        
        return res.status(200).json(metadata.data);
    } catch (error) {
        console.error('Failed to fetch NFT metadata:', error);
        return res.status(500).send('Failed to fetch NFT metadata');
    }
});

app.get('/nfts', async (req, res) => {
    try {
        const nfts = [];
        
        return res.status(200).json(nfts);
    } catch (error) {
        console.error('Failed to list NFTs:', error);
        return res.status(500).send('Failed to list NFTs');
    }
});

app.post('/list-nft', async (req, res) => {
    try {
        
        return res.status(200).send('NFT listed successfully');
    } catch (error) {
        console.error('Failed to list NFT:', error);
        return res.status(500).send('Failed to list NFT');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});