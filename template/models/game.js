const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    board: {
        type: Array,
        default: [['', '', ''], ['', '', ''], ['', '', '']],
    },
    currentPlayer: {
        type: String,
        default: 'player1',
    },
    status: {
        type: String,
        default: 'ongoing', // could be 'ongoing', 'draw', 'player1_won', 'player2_won'
    },
});

module.exports = mongoose.model('Game', gameSchema);
