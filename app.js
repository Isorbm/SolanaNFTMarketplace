const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const nftRoutes = require('./routes/nft');
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/nft', nftRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});