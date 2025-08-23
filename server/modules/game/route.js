const express = require('express');
const { Game } = require('./model');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Игра не найдена' });
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
