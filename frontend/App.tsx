import React, { useEffect, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { getNFTs, mintNFT, buyNFT } from './solana';
import NFTList from './NFTList';
import MintNFT from './MintNFT';
import BuyNFT from './BuyNFT';

const solanaNetworkUrl = process.env.REACT_APP_SOLANA_NETWORK_URL;

interface NFT {
  id: string;
  image: string;
  name: string;
  price: number;
}

const MainComponent: React.FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [connection, setConnection] = useState<Connection | null>(null);

  useEffect(() => {
    if (!solanaNetworkUrl) {
      console.error('Solana network URL is not defined in your .env file.');
      return;
    }
    
    const initializeConnection = new Connection(solanaNetworkUrl, "confirmed");
    setConnection(initializeConnection);

    const fetchAllNFTs = async () => {
      if (!initializeConnection) return;
      const fetchedNFTs = await getNFTs(initializeConnection);
      setNfts(fetchedNFTs);
    };

    fetchAllNFTs();
  }, []);

  const handleMint = async (nftData: { name: string; image: string; price: number }) => {
    if (!connection) return;
    
    const mintedNFT = await mintNFT(connection, nftData);
    setNfts(prevNfts => [...prevNfts, mintedNFT]);
  };

  const handleBuy = async (nftId: string) => {
    if (!connection) return;
    
    const updatedNFTCollection = await buyNFT(connection, nftId);
    setNfts(updatedNFTCollection);
  };

  return (
    <div>
      <MintNFT onMint={handleMint} />
      <NFTList nfts={nfts} />
      <BuyNFT onBuy={handleBuy} />
    </div>
  );
};

export default MainComponent;