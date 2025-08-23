const express = require('express');
const router = express.Router();
const { Game } = require('./model');

router.get('/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const game = await Game.findById(gameId);
    if (!game) return res.status(404).json({ message: 'Игра не найдена' });
    res.json(game);
});

module.exports = router;
