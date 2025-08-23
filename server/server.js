// импортируем маршруты и контроллеры
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*', // или ваш фронтенд URL
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

const userRoutes = require('./modules/users/route');
app.use('/api/users', userRoutes);

const gameRoutes = require('./modules/game/route');
app.use('/api/games', gameRoutes);

const gameController = require('./modules/game/controller');
gameController(io);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        const MONGO_USER = process.env.DATABASE_USERNAME;
        const MONGO_PASS = process.env.DATABASE_PASSWORD;
        const MONGO_URL = process.env.DATABASE_URL;
        const MONGO_PORT = process.env.DATABASE_PORT;
        const DATABASE_NAME = process.env.DATABASE_NAME;

        const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}/${DATABASE_NAME}?authSource=admin`;
        await mongoose.connect(uri);
        console.log('MongoDB подключен');

        server.listen(PORT, () => {
            console.log(`Сервер запущен на http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Ошибка подключения к MongoDB:', err);
        process.exit(1);
    }
}

startServer();
