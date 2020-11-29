const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const db = require('./db');
const salonRoutes = require('./routes/salon');
const customerAuthRoutes = require('./routes/customer/auth');
const customerRoutes = require('./routes/customer/customer');
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT;

// Routes
app.use('/salons', salonRoutes);
app.use('/customer', customerRoutes);
app.use('/customer/auth', customerAuthRoutes);

// Error Middleware
app.use(errorMiddleware);

const init = async () => {
    try {
        await db.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

init();

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));