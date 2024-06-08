const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/config');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use(cors());

//Imported Routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const markSpamRoute = require('./routes/mark_spam');
const searchRoute = require('./routes/search');


// Connect to MongoDB
connectDB();

//Used Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/mark_spam', markSpamRoute);
app.use('/search', searchRoute);


//Basic template of express app

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});