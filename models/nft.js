require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  walletAddress: { type: String, required: true, unique: true }
});
const nftSchema = new Schema({
  tokenId: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  metadataUri: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  imageUri: { type: String, required: true },
  price: { type: Number, required: true },
  isListed: { type: Boolean, required: true }
});
const transactionSchema = new Schema({
  nft: { type: Schema.Types.ObjectId, ref: 'NFT' },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, required: true },
  transactionDate: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);
const NFT = mongoose.model('NFT', nftSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = { User, NFT, Transaction };