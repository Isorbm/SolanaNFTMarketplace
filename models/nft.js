const NodeScope = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const logError = (error) => {
    console.error("Error encountered:", error);
};

async function fetchNFTMetadata(tokenId) {
    try {
        return { tokenId: tokenId, metadata: "Sample NFT Metadata" };
    } catch (error) {
        logError(error);
        throw error;
    }
}

async function getNFTMetadata(tokenId) {
    try {
        const cacheKey = `nftMetadata_${tokenId}`;
        const cachedData = myCache.get(cacheKey);

        if (cachedData) {
            console.log("Retrieved from cache:", cacheKey);
            return cachedData;
        } else {
            const metadata = await fetchNFTMetadata(tokenId);
            const cacheSuccess = myCache.set(cacheKey, metadata);

            if (!cacheSuccess) {
                logError(`Failed to cache data for token ID: ${tokenId}`);
            }

            return metadata;
        }
    } catch (error) {
        logError(error);
        throw new Error(`Failed to retrieve NFT metadata for token ID: ${tokenId}`);
    }
}