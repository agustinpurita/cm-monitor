const usersController = {};
const isValidCurrency = require('../helpers/currencyValidator');
const { isValidPassword, encryptPassword } = require('../helpers/passwordValidator');
const evalUserFromTokenId = require('../helpers/tokenHandler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const server = require('../config/server.config');
const Crypto = require('../models/Crypto');
const rp = require('request-promise');
const apiCoin = require('../config/externals.config');

usersController.getUsers = async (req, res) => {
  try {
    await User.find((err, usersDB) => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Error al obtener usuarios',
          error: err.message,
        });
      }
      return res.json({
        ok: true,
        users: usersDB
      });
    });
  } catch (error) {
    return res.json({
      ok: false,
      error
    });
  }
};

usersController.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findById(userId, (err, userDB) => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Error al obtener usuario por id',
          error: err,
        });
      }
      return res.json({
        ok: true,
        user: userDB
      });
    });
  } catch (error) {
    return res.json({
      ok: false,
      error
    });
  }
};

usersController.createUser = async (req, res) => {
  try {
    const { name, lastname, username, password, currency } = req.body;

    if (!isValidPassword(password, username)) {
      return res.json({
        ok: false,
        message: 'La contraseña no cumple con todos los requisitos',
      });
    }
    if (!isValidCurrency(currency)) {
      return res.json({
        ok: false,
        message: 'Moneda invalida',
      });
    }

    const passwordEncrypted = await encryptPassword(password);

    const newUser = new User({
      name,
      lastname,
      username,
      password: passwordEncrypted,
      currency,
    });


    await newUser.save((err, userDB) => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Error al crear usuario',
          error: err.message,
        });
      }
      const token = jwt.sign({ id: userDB._id }, server.secret, {
        expiresIn: '30d'
      });
      return res.json({
        ok: true,
        message: 'Usuario creado',
        token,
        user: userDB,
      });
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

usersController.updateUser = async (req, res) => {
  try {

    const { userId } = req.params;
    console.log(userId)
    const { currency, favcryptos } = req.body;
    const token = req.headers['access-token'];

    if (favcryptos) {
      if (!evalUserFromTokenId(token, userId)) {
        return res.json({
          ok: false,
          message: 'Solo puedes modificar tus criptomonedas favoritas, asegurate de enviar el token correcto.'
        });
      }
    }

    await User.findByIdAndUpdate(
      userId,
      {
        currency,
        favcryptos,
      },
      { new: true, runValidators: true },
      (err, userDB) => {
        if (err) {
          return res.json({
            ok: false,
            message: 'No se pudo actualizar',
            error: err,
          });
        } else {
          res.json({
            ok: true,
            message: 'Usuario actualizado',
            user: userDB
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

usersController.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.findByIdAndDelete(userId, err => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Error al borrar usuario por id',
          error: err,
        });
      }
      return res.json({
        ok: true,
        message: 'Usuario borrado'
      });
    });
  }
  catch (error) {
    res.json(error);
  }
};
usersController.getCryptosFav = async (req, res) => {
  try {
    const { order } = req.query;
    let orderRule = 1;
    if (order === 'asc' || order === 'desc') {
      orderRule = order === 'asc' ? 1 : -1;
    }
    else {
      orderRule = false;
    }
    console.log(orderRule);
    const { number } = req.params;
    if (isNaN(number)) {
      return res.json({
        ok: false,
        message: 'Debe enviar un numero valido de criptomonedas a obtener',
      });
    }
    const top = parseInt(number);
    if (top > 25) {
      return res.json({
        ok: false,
        message: 'Solo puede obtener hasta 25 criptomonedas',
      });
    }
    const token = req.headers['access-token'];
    const decoded = jwt.verify(token, server.secret);
    const userId = decoded.id;

    await User.findById(userId, (err, userDB) => {
      const userCurrency = userDB.currency;
      Crypto.populate(userDB, { path: 'favcryptos' }, (err, userWithFavCryptos) => {
        const arrayOfFavs = userWithFavCryptos.favcryptos;
        const data = arrayOfFavs.map(async coin => {
          const opt = {
            uri: `${apiCoin.byId}${coin.id}`,
            method: 'GET',
            json: true,
          };
          const resp = await rp(opt);
          const { symbol, name, image, last_updated, market_data } = resp;
          const { current_price } = market_data;
          return ({ symbol, name, image: image.small, last_updated, price_ars: current_price.ars, price_eur: current_price.eur, price_usd: current_price.usd });
        });

        Promise.all(data)
          .then((resp) => {
            let orderResp = resp.sort((a, b) => {
              if (orderRule) {
                return a[`price_${userCurrency}`] > b[`price_${userCurrency}`] ? orderRule : orderRule * (-1);
              }
              else {
                return a[`price_${userCurrency}`] > b[`price_${userCurrency}`] ? 1 : -1;
              }
            });
            res.json(orderResp);
          });

      });
    });

  } catch (error) {
    console.log(error);
  }
};



module.exports = usersController;
