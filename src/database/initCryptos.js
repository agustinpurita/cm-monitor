const Crypto = require('../models/Crypto');

const setInitialCryptos = async (conn) => {
    try {
        const count = await Crypto.estimatedDocumentCount();
        if (count > 0) return;
        conn.collection('cryptos').insertMany(cryptos);

    } catch (error) {
        console.log(error);
    }
};
const cryptos = [
    {
       id: '01coin',
    },
    {
      id: '0-5x-long-algorand-token',
    },
    {
      id: '0-5x-long-altcoin-index-token',
    },
    {
      id: '0-5x-long-balancer-token',
    },
    {
      id: '0-5x-long-bilibra-token',
    },
    {
      id: '0-5x-long-bitcoin-cash-token',
    },
    {
      id: '0-5x-long-bitcoin-sv-token',
    },
    {
      id: '0-5x-long-bitcoin-token',
    },
    {
      id: '0-5x-long-bitmax-token-token',
    },
    {
      id: '0-5x-long-bnb-token',
    },
    {
      id: '0-5x-long-cardano-token',
    },
    {
      id: '0-5x-long-chainlink-token',
    },
    {
      id: '0-5x-long-compound-usdt-token',
    },
    {
      id: '0-5x-long-cosmos-token',
    },
    {
      id: '0-5x-long-defi-index-token',

    },
    {
      id: '0-5x-long-dogecoin-token',
    },
    {
      id: '0-5x-long-dragon-index-token',
    },
    {
      id: '0-5x-long-echange-token-index-token',
    },
    {
      id: '0-5x-long-eos-token',
    },
    {
      id: '0-5x-long-ethereum-classic-token',
    },
    {
      id: '0-5x-long-ethereum-token',
    },
    {
      id: '0-5x-long-huobi-token-token',
    },
    {
      id: '0-5x-long-kyber-network-token',
    },
    {
      id: '0-5x-long-leo-token',
    },
    {
      id: '0-5x-long-litecoin-token',
    },
    {
      id: '0-5x-long-matic-token',
    },
    {
      id: '0-5x-long-midcap-index-token',
    },
    {
      id: '0cash',
    },
    {
      id: '0chain',
    },
];

module.exports = setInitialCryptos;