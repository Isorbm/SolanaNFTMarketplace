import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface NFT {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface NFTContextType {
  nfts: NFT[];
  fetchNFTs: () => void;
  buyNFT: (id: number) => Promise<void>; // Assuming an async operation
}

const NFTContext = createContext<NFTContextType | undefined>(undefined);

const NFTProvider: React.FC = ({ children }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);

  const fetchNFTs = useCallback(async () => {
      console.log("Fetching NFTs...");
  }, []); 

  const buyNFT = useCallback(async (id: number) => {
    console.log(`Buying NFT with id ${id}`);
  }, []); 

  useEffect(() => {
    fetchNFTs();
    return () => {
    };
  }, [fetchNFTs]); 

  return (
    <NFTContext.Provider value={{ nfts, fetchNFTs, buyNFT }}>
      {children}
    </NFTContext.Provider>
  );
};

const useNFTs = () => {
  const context = useContext(NFTContext);
  if (context === undefined) {
    throw new Error('useNFTs must be used within a NFTProvider');
  }
  return context;
};

export { NFTProvider, useNFTs };