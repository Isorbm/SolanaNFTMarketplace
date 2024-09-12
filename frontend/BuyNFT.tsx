const buyNFT = async (nftId: string) => {
    // API call to purchase NFT
};

const nftPurchaseCache = {};

const buyNFTBatched = async (nftId: string) => {
    if (nftPurchaseCache[nftId]) {
        console.log('Using cached result for', nftId);
        return;
    }

    nftPurchaseCache[nftId] = 'processing';
    console.log(`Processing purchase for ${nftId}`);
    nftPurchaseCache[nftId] = 'completed';
};