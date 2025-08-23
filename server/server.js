const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./modules/users/route');

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

const MONGO_USER = process.env.DATABASE_USERNAME;
const MONGO_PASS = process.env.DATABASE_PASSWORD;
const MONGO_URL = process.env.DATABASE_URL;
const MONGO_PORT = process.env.DATABASE_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;

async function startApp() {
    try {
        const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}/${DATABASE_NAME}?authSource=admin`;
        await mongoose.connect(uri);
        console.log('MongoDB connected');

        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

startApp();
