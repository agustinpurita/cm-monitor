const authController = {};
const User = require('../models/User');
const server = require('../config/server.config');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../helpers/passwordValidator');

authController.login = async (req, res) => {
    try {
        const userFound = await User.findOne({ username: req.body.username });

        if (!userFound) return res.status(400).json({ message: 'User Not Found' });

        const matchPassword = comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.json({
                token: null,
                message: 'Invalid Password',
            });

        const token = jwt.sign({ id: userFound._id }, server.secret, {
            expiresIn: '30d'
        });

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = authController;