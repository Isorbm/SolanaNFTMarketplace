const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// Fake API call function
async function fetchNFTMetadata(tokenId) {
    // Assume this function fetches metadata from an external API
}

// Enhanced function with caching
async function getNFTMetadata(tokenId) {
    const cacheKey = `nftMetadata_${tokenId}`;
    const cachedData = myCache.get(cacheKey);

    if (cachedData) {
        return cachedData;
    } else {
        const metadata = await fetchNFTMetadata(tokenId);
        myCache.set(cacheKey, metadata);
        return metadata;
    }
}