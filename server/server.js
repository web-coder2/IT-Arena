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

// --- Импортируйте модели и роутеры для игр ---
const { Game } = require('./modules/game/model');

const PORT = process.env.PORT || 3000;

// WebSocket логика
const games = {}; // Объекты для хранения активных игр и соединений

io.on('connection', (socket) => {
    console.log('Новое подключение:', socket.id);

    // Обработка присоединения к игре
    socket.on('joinGame', async ({ gameId, username }) => {
        socket.join(gameId);

        // Попытка найти игру или создать новую
        let game = await Game.findById(gameId);
        if (!game) {
            // Создайте новую игру
            game = new Game({
                _id: gameId,
                players: [],
                state: 'waiting',
                currentPlayerIndex: 0,
                deck: generateDeck(), // функция генерации колоды
            });
            await game.save();
        }

        // Добавить игрока
        game.players.push({ username, hand: [] });
        await game.save();

        // Обновить состояние для всех участников
        io.to(gameId).emit('updateGame', game);
    });

    // Обработка взятия карты
    socket.on('takeCard', async ({ gameId, userId }) => {
        const game = await Game.findById(gameId);
        if (!game) return;

        // Логика проверки, что это ход текущего игрока, выдачи карты, обновления состояния
        // Например:
        const currentPlayer = game.players[game.currentPlayerIndex];
        if (currentPlayer.id !== userId) return; // Не его ход

        // Взять карту из колоды
        if (game.deck.length === 0) {
            // Колода закончилась
            // Можно завершить игру или перетасовать
        } else {
            const card = game.deck.pop();
            currentPlayer.hand.push(card);
        }

        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;

        await game.save();
        io.to(gameId).emit('updateGame', game);
    });

    socket.on('disconnect', () => {
        console.log('Отключение:', socket.id);
    });
});

async function startServer() {
    try {
        const MONGO_USER = process.env.DATABASE_USERNAME;
        const MONGO_PASS = process.env.DATABASE_PASSWORD;
        const MONGO_URL = process.env.DATABASE_URL;
        const MONGO_PORT = process.env.DATABASE_PORT;
        const DATABASE_NAME = process.env.DATABASE_NAME;

        const uri = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}/${DATABASE_NAME}?authSource=admin`;
        await mongoose.connect(uri);
        console.log('MongoDB connected');

        server.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

startServer();

// Вспомогательная функция для генерации колоды
function generateDeck() {
    // Возьмите сюда вашу логику генерации колоды
    return ['Card1', 'Card2', 'Card3']; // пример
}
