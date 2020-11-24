const { Router } = require('express');
const cryptosController = require('../controllers/cryptos.controller');
const authJwt = require('../middlewares/authJwt');
const router = Router();

router.get('/', authJwt.verifyToken, cryptosController.getCryptosList);
router.get('/avaiablefav', authJwt.verifyToken, cryptosController.getAvaiableFavCryptos);

module.exports = router;