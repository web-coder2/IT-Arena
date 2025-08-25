const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIO = require('socket.io');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const server = require('http').createServer(app);
const io = new socketIO.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Остальной код — маршруты и логика WebSocket (как у вас)
const userRoutes = require('./modules/users/route');
app.use('/api/users', userRoutes);

// Логика комнат
const rooms = [];

function createRoom() {
    const timestamp = Date.now();
    const roomName = `room_${timestamp}`;
    const newRoom = {
        name: roomName,
        members: 0,
        createdAt: timestamp,
    };
    rooms.push(newRoom);
    return newRoom;
}

function getActiveRooms() {
    const now = Date.now();
    return rooms.map((room) => {
        const durationMinutes = Math.floor((now - room.createdAt) / 60000);
        return {
            name: room.name,
            members: room.members,
            durationMinutes,
        };
    });
}

function setupSocketHandlers(io) {
    const MAX_PLAYERS_PER_ROOM = 4;

    io.on('connection', (socket) => {
        console.log(`Клиент подключился: ${socket.id}`);

        socket.on('joinRoom', ({ username }) => {
            let roomToJoin = rooms.find((r) => r.members < MAX_PLAYERS_PER_ROOM);
            if (!roomToJoin) {
                roomToJoin = createRoom();
            }
            socket.join(roomToJoin.name);
            roomToJoin.members++;
            socket.emit('joinedRoom', { roomName: roomToJoin.name });
            io.emit('roomsList', getActiveRooms());
            console.log(`${username} присоединился к комнате ${roomToJoin.name}`);
        });

        socket.on('leaveRoom', ({ roomName, username }) => {
            socket.leave(roomName);
            const room = rooms.find((r) => r.name === roomName);
            if (room) {
                room.members = Math.max(0, room.members - 1);
                if (room.members === 0) {
                    const index = rooms.indexOf(room);
                    if (index !== -1) rooms.splice(index, 1);
                }
            }
            io.to(roomName).emit('userLeft', { username, roomName });
            io.emit('roomsList', getActiveRooms());
        });

        socket.on('disconnect', () => {
            // Обработка отключения, если нужно
        });
    });
}

app.get('/api/rooms/getInfo', async (req, res) => {
    let infoDataRooms = getActiveRooms();
    res.status(200).json({
        infoDataRooms,
    });
});

setupSocketHandlers(io);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_URL, DATABASE_PORT, DATABASE_NAME } = process.env;
        const uri = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}:${DATABASE_PORT}/${DATABASE_NAME}?authSource=admin`;
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

start();
