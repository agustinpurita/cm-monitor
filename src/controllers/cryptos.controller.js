const cryptosController = {};
const rp = require('request-promise');
const apiCoin = require('../config/externals.config');
const { buildOptionsPage } = require('../helpers/cryptoHandler');
const Crypto = require('../models/Crypto');

cryptosController.getCryptosList = async (req, res) => {
  try {
    const obtainCountOptions = {
      uri: `${apiCoin.list}`,
      method: 'GET',
      json: true,
    };

    const listAll = await rp(obtainCountOptions);
    const totalCoins = listAll.length;
    const coinsPerPage = 250;
    const totalPages = Math.trunc(totalCoins / coinsPerPage);
    const requests = [];
    for (let i = 0; i <= totalPages; i++) {
      let page = i + 1;
      requests.push(rp(buildOptionsPage(page)));
    }

    let response = [];
    requests.forEach(request => {
      request.then((data) => {
        data.map(coin => {
          let { symbol, name, image, current_price, last_updated } = coin;
          response.push({
            symbol,
            name,
            image,
            current_price,
            last_updated,
          });
        });
        console.log(response.length);
        if (response.length === totalCoins) {
          res.json({
            ok: true,
            response
          });
        }
      });
    });
  }
  catch (error) {
    res.json({
      ok: false,
      error
    });
  }
};

cryptosController.getAvaiableFavCryptos = async (req, res) => {
  try {
    await Crypto.find((err, cryptosDB) => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Error al obtener criptomonedas',
          error: err.message,
        });
      }
      return res.json({
        ok: true,
        cryptos: cryptosDB
      });
    });
  } catch (error) {
    res.json({
      ok: false,
      error
    });
  }
};

module.exports = cryptosController;