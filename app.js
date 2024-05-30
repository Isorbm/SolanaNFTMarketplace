const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('morgan');
const nftRoutes = require('./routes/nft');

dotenv.config();

const server = express();

// Middleware to log details of each request
const detailedLogger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] Incoming request: ${req.method} ${req.path}`);
    next(); // Continue to next middleware or route handler
};

// Use the custom detailedLogger middleware
server.use(detailedLogger);

server.use(cors());
server.use(logger('dev'));
server.use(express.json());

server.use('/api/nft', nftRoutes);

const DEFAULT_PORT = 5000;
const port = process.env.PORT || DEFAULT_PORT;

server.listen(port, () => {
    console.log(`NFT Marketplace API running on port ${port}`);
});