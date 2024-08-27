import React from 'react';

interface BuyNFTProps {
  nftId: string;
  onBuy: (nftId: string) => void;
}

const BuyNFTComponent: React.FC<BuyNFTProps> = ({ nftId, onBuy }) => {
  const handleBuyClick = () => {
    onBuy(nftId);
  };

  return (
    <div>
      <p>NFT ID: {nftId}</p>
      <button onClick={handleBuyClick}>Buy NFT</button>
    </div>
  );
};

export default BuyNFTComponent;