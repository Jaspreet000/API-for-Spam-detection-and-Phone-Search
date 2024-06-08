const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, phone, password, email } = req.body;

        // Check if user already exists
        let user = await User.findOne({ phone });
        if (user) {
            console.error(`Registration failed: User with phone ${phone} already exists`);
            return res.status(400).json({ message: 'Phone number already exists!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create new user
        const newUser = new User({ name, phone, password: hashedPassword, email });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Registration failed:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
