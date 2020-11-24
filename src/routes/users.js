const { Router } = require('express');
const router = Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getCryptosFav
} = require('../controllers/users.controller');
const authJwt = require('../middlewares/authJwt');

router.get('/', getUsers);

router.get('/:userId', getUser);

router.get('/top/:number',authJwt.verifyToken, getCryptosFav);

router.post(
  '/',
  createUser
);

router.put(
  '/:userId',
  authJwt.verifyToken,
  updateUser
);

router.delete(
  '/:userId',
  authJwt.verifyToken,
  deleteUser,
);

module.exports = router;