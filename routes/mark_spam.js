const express = require('express');
const Spam = require('../models/spam');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { phone } = req.body;
    const userId = req.user.id;

    try {
        // Check if the number has already been marked as spam by the user
        let existingSpam = await Spam.findOne({ phone, markedBy: userId });
        if (existingSpam) {
            console.error(`Spam marking failed: User ${userId} already marked phone ${phone} as spam`);
            return res.status(400).json({ message: 'You have already marked this number as spam!' });
        }

        // Create new spam entry
        const newSpam = new Spam({ phone, markedBy: userId });
        await newSpam.save();

        res.status(201).json({ message: 'Number marked as spam!' });
    } catch (error) {
        console.error('Spam marking failed:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;