const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token.split(' ')[1], secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
};

module.exports = { authenticateToken, generateToken };
