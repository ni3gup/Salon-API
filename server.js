const express = require('express');
require('dotenv').config();

const db = require('./db');
const salonRoutes = require('./routes/salon');
const customerAuthRoutes = require('./routes/customer/auth');

const app = express();

const PORT = process.env.PORT;
const init = async () => {
    try {
        await db.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Routes
app.use('/salons', salonRoutes);
app.use('/customers/auth', customerAuthRoutes);

init();

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));