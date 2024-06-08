const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();
const secretKey = process.env.secretKey;

router.post('/', async (req, res) => {
    const { phone, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ phone });
        if (!user) {
            console.error(`Login failed: User with phone ${phone} not found`);
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error(`Login failed: Incorrect password for phone ${phone}`);
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Create JWT payload
        const payload = { user: { id: user.id } };

        // Sign JWT
        jwt.sign(payload, secretKey, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('Error signing JWT:', err.message);
                return res.status(500).json({ message: 'Server error' });
            }
            res.json({ token });
        });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;