const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
