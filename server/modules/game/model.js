const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    username: String,
    hand: [String],
});

const GameSchema = new mongoose.Schema({
    _id: String,
    players: [PlayerSchema],
    state: String,
    currentPlayerIndex: Number,
    deck: [String],
});

module.exports = {
    Game: mongoose.model('Game', GameSchema),
};
