const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    hand: [{ type: String }],
});

const GameSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    players: [PlayerSchema],
    state: { type: String, default: 'waiting' },
    currentPlayerIndex: { type: Number, default: 0 },
    deck: [{ type: String }],
    playersCount: { type: Number, default: 0 },
});

module.exports = {
    Game: mongoose.model('Game', GameSchema),
};
