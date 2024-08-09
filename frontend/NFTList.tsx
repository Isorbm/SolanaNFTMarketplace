// NFTContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface NFT {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface NFTContextType {
  nfts: NFT[];
  fetchNFTs: () => void;
  buyNFT: (id: number) => void;
}

const NFTContext = createContext<NFTContextType | undefined>(undefined);

const NFTProvider: React.FC = ({ children }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);

  const fetchNFTs = () => {
      // Assuming a single fetch call gets all NFTs;
      // Replace this with your actual data fetching logic
      console.log("Fetching NFTs...");
      // setNfts(fetchedNFTs);
  };

  const buyNFT = (id: number) => {
    console.log(`Buying NFT with id ${id}`);
    // Here, you'd ideally do a batch operation or a single call per action,
    // depending on your backend capability and the specific requirement.
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <NFTContext.Provider value={{ nfts, fetchNFTs, buyNFT }}>
      {children}
    </NFTContext.Provider>
  );
};

// Hook to use the NFT context
const useNFTs = () => {
  const context = useContext(NFTContext);
  if (context === undefined) {
    throw new Error('useNFTs must be used within a NFTProvider');
  }
  return context;
};

export { NFTProvider, useNFTs };