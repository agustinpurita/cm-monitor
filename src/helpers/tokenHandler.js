const jwt = require('jsonwebtoken');
const server = require('../config/server.config');


const evalUserFromTokenId = (token, userId) => {
  try {
    const decoded = jwt.verify(token, server.secret);
    return decoded.id === userId;

  } catch (error) {
    return ({
        error: 'No se puede obtener el id del token'
    });
  }   
};

module.exports = evalUserFromTokenId;