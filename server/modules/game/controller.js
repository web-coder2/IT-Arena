// controller.js

const { Server } = require('socket.io');

// Инициализация Socket.io сервера
// Предположим, что у вас есть такой код
// const io = new Server(httpServer);

const io = new Server(/* ваш сервер */);

// В памяти хранятся все игры
const games = [
    {
        id: '4QKH3btmi5lDZlQUAAAF', // пример ID
        players: [], // список игроков
        // добавьте другие свойства, по необходимости
    },
    // можно добавить другие игры
];

// Функция поиска игры по ID
function getGameById(gameId) {
    return games.find((game) => game.id === gameId);
}

// Обработчик подключения клиента
io.on('connection', (socket) => {
    console.log('Клиент подключился', socket.id);

    // Обработка получения списка всех игр
    socket.on('getAllGames', () => {
        const gameSummaries = games.map((game) => ({
            id: game.id,
            // добавьте другие свойства, если нужно (например, название комнаты)
        }));
        socket.emit('allGamesList', gameSummaries);
    });

    // Обработка присоединения к игре
    socket.on('joinGame', ({ gameId, username, userId }) => {
        try {
            const game = getGameById(gameId);
            if (!game) {
                console.warn(`Игра с ID ${gameId} не найдена`);
                socket.emit('error', { message: 'Игра не найдена' });
                return;
            }

            // Проверка, есть ли уже такой игрок
            const existingPlayer = game.players.find((p) => p.userId?.toString() === userId?.toString());

            if (existingPlayer) {
                console.log(`Игрок уже есть: ${existingPlayer.username}`);
            } else {
                // Добавляем нового игрока
                const newPlayer = {
                    userId: userId ?? null, // можно сделать по необходимости
                    username: username,
                };
                game.players.push(newPlayer);
                console.log(`Добавлен новый игрок: ${username} в игру ${gameId}`);
            }

            // Присоединение сокета к комнате с именем gameId
            socket.join(gameId);

            // Отправляем обновление всем участникам комнаты
            io.to(gameId).emit('updateGame', { game, playersCount: game.players.length });
        } catch (error) {
            console.error('Ошибка при присоединении к игре:', error);
        }
    });

    // Можно добавить другие обработчики, например, для взятия карт, покидания комнаты и т.д.
});

// Экспорт, если нужен
module.exports = {
    getGameById,
};
