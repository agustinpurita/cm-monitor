const authJwt = {};
const server = require('../config/server.config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

authJwt.verifyToken = async (req, res, next) => {
    const token = req.headers['access-token'];

    if (!token) return res.status(403).json({ message: 'Token inexistente' });

    try {
        const decoded = jwt.verify(token, server.secret);
        const userId = decoded.id;

        const user = await User.findById(userId, { password: 0 });
        if (!user) return res.status(404).json({
            ok: false,
            message: 'Usuario no encontrado'
        });

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Acceso denegado'
        });
    }
};

module.exports = authJwt;