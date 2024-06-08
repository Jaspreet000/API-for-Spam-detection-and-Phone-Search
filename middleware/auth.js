const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.secretKey;

const auth = (req, res, next) => {
    // Get token from the Authorization header
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        console.error('Authorization header is missing');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract the token from the header
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        console.error('Token is missing');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;