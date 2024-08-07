import React from 'react';

interface NFT {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface NFTListProps {
  nfts: NFT[];
}

const NFTList: React.FC<NFTListProps> = ({ nfts }) => {
  const buyNFT = (id: number) => {
    console.log(`Buying NFT with id ${id}`);
  };

  return (
    <ul>
      {nfts.map((nft) => (
        <li key={nft.id}>
          <img src={nft.image} alt={nft.name} style={{ width: '100px', height: '100px' }} />
          <h3>{nft.name}</h3>
          <p>Price: {nft.price} ETH</p>
          <button onClick={() => buyNFT(nft.id)}>Buy</button>
        </li>
      ))}
    </ul>
  );
};

export default NFTList;