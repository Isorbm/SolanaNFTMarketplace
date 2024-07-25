import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { batchFetchNFTs } from './utils/batchUtils';

const SOLANA_RPC_HOST = process.env.REACT_APP_SOLANA_RPC_HOST;

export const useSolanaNFTs = (walletAddresses: PublicKey[]) => {
  const [nfts, setNfts] = useState<YourNFTType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      try {
        const cachedNFTs = walletAddresses.map((address) => {
          const cachedData = sessionStorage.getItem(address.toString());
          return cachedDNA ? JSON.parse(cachedData) : null;
        }).filter(nft => nft !== null);

        const addressesToFetch = walletAddresses.filter((address, index) => !cachedNFTs[index]);

        if (addressesToFetch.length > 0) {
          const fetchedNFTs = await batchFetchNFTs(new Connection(SOLANA_RPC_HOST), addressesToFetch);
          
          fetchedNFTs.forEach((nft, index) => {
            sessionStorage.setItem(addressesToFetch[index].toString(), JSON.stringify(nft));
          });

          setNfts([...cachedNFTs, ...fetchedNFTs]);
        } else {
          setNfts(cachedNFTs);
        }
      } catch (error) {
        console.error('Failed to fetch NFTs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [walletAddresses]);

  return { nfts, loading };
};