const usersController = {};
const User = require('../models/User');

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
      return res.json(usersDB);
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

usersController.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findById(id, (err, userDB) => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Error al obtener usuario por id',
          error: err,
        });
      }
      return res.json(userDB);
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

usersController.createUser = async (req, res) => {
  try {
    const { id, nombre, apellido, email } = req.body;

    const newUser = new User({
      id,
      nombre,
      apellido,
      email,
    });

    await newUser.save((err, userDB) => {
      if (err) {
        return res.json({
          ok: false,
          message: 'Error al crear usuario',
          error: err.message,
        });
      }
      return res.json({
        ok: true,
        message: 'Usuario creado',
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
    const { id } = req.params;
    const { nombre, apellido, email} = req.body
    await User.findOneAndUpdate(
      id,
      {
        nombre,
        apellido,
        email
      },
      { new: true, runValidators: true },
      (err, userDB) => {
        if (err) {
          return res.json({
            ok: false,
            message: 'no se pudo actualizar',
            error: err,
          });
        } else {
          res.json({ message: 'Usuario actualizado', userDB });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = usersController;
