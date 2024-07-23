import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const SOLANA_NETWORK = process.env.REACT_APP_SOLANA_NETWORK;
const SOLANA_RPC_HOST = process.env.REACT_APP_SOLANA_RPC_HOST;
if (!SOLANA_NETWORK || !SOLANA_RPC_HOST) {
  console.error('Environment variables REACT_APP_SOLANA_NETWORK and REACT_APP_SOLANA_RPC_HOST must be set');
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}