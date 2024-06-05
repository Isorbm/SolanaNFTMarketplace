require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  walletAddress: { 
    type: String, 
    required: true, 
    unique: true 
  }
});
const nftSchema = new mongoose.Schema({
  tokenId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  metadataUri: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  imageUri: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  isListed: { 
    type: Boolean, 
    required: true 
  }
});
const transactionSchema = new mongoose.Schema({
  nft: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'NFT' 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  buyer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  price: { 
    type: Number, 
    required: true 
  },
  transactionDate: { 
    type: Date, 
    default: Date.now 
  }
});
const User = mongoose.model('User', userSchema);
const NFT = mongoose.model('NFT', nftSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = { User, NFT, Transaction };