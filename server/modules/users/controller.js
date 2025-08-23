const User = require('./model');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { login, username, password, phone } = req.body;

        const existingUser = await User.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ message: 'Логин уже занят' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            login,
            username,
            password: hashedPassword,
            phone,
            totalCount: 0,
            countGames: 0,
            countWins: 0,
        });

        await newUser.save();

        res.status(201).json({ message: 'Пользователь зарегистрирован' });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        const { _id, login: userLogin, username, phone, totalCount, countGames, countWins, createdAt } = user;

        res.json({
            message: 'Успешный вход',
            user: {
                id: _id,
                login: userLogin,
                username,
                phone,
                totalCount,
                countGames,
                countWins,
                createdAt,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};
