import React, { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { fetchNFTCollection, mintNewNFT, purchaseNFT } from './solana';
import DisplayNFTs from './NFTList';
import CreateNFT from './MintNFT';
import InitiatePurchase from './BuyNFT';

const solanaRPCUrl = process.env.REACT_APP_SOLANA_NETWORK_URL;

interface NFT {
  id: string;
  image: string;
  name: string;
  price: number;
}

const NFTMarketplace: React.FC = () => {
  const [nftCollection, setNftCollection] = useState<NFT[]>([]);
  const [solanaConnection, setSolanaConnection] = useState<Connection | null>(null);

  useEffect(() => {
    if (!solanaRPCUrl) {
      console.error('Solana network URL is not set in your .env file.');
      return;
    }
    
    const newConnection = new Connection(solanaRPCUrl, "confirmed");
    setSolanaConnection(newConnection);

    const loadNFTCollection = async () => {
      if (!newConnection) return;
      const nftGallery = await fetchNFTCollection(newConnection);
      setNftCollection(nftGallery);
    };

    loadNFTCollection();
  }, []);

  const handleNFTMinting = async (nftDetails: { name: string; image: string; price: number }) => {
    if (!solanaConnection) return;
    
    const newNFT = await mintNewNFT(solanaConnection, nftDetails);
    setNftCollection(existingNFTs => [...existingNFTs, newNFT]);
  };

  const handleNFTPurchase = async (nftPrimaryKey: string) => {
    if (!solanaConnection) return;
    
    const updatedNFTGallery = await purchaseNFT(solanaConnection, nftPrimaryKey);
    setNftCollection(updatedNFTGallery);
  };

  return (
    <div>
      <CreateNFT onMint={handleNFTMinting} />
      <DisplayNFTs nfts={nftCollection} />
      <InitiatePurchase onBuy={handleNFTPurchase} />
    </div>
  );
};

export default NFTMarketplace;