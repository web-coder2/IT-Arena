const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        login: { type: String, required: true, unique: true },
        username: { type: String },
        password: { type: String, required: true },
        phone: { type: String },
        totalCount: { type: Number },
        countGames: { type: Number },
        countWins: { type: Number },
    },
    { timestamps: true }
);

module.exports = model('User', UserSchema);
