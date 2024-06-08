const express = require('express');
const User = require('../models/user');
const Contact = require('../models/contact');
const Spam = require('../models/spam');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const phone = req.query.phone;

        if (!phone) {
            return res.status(400).json({ message: 'Phone number is required' });
        }

        // Find registered user with the phone number
        const registeredUser = await User.findOne({ phone });

        if (registeredUser) {
            // Calculate spam likelihood
            const spamCount = await Spam.countDocuments({ phone });
            const spamLikelihood = spamCount > 10;

            return res.json({
                name: registeredUser.name,
                phone: registeredUser.phone,
                email: registeredUser.email,
                spam_likelihood: spamLikelihood
            });
        } else {
            // Find contacts with the phone number
            const contacts = await Contact.find({ phone });

            if (contacts.length === 0) {
                return res.status(404).json({ message: 'Phone number not found' });
            }

            const results = contacts.map(contact => ({
                name: contact.name,
                phone: contact.phone
            }));

            return res.json(results);
        }
    } catch (error) {
        console.error('Search failed:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
