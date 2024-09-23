const Game = require('../models/game'); // Nouveau fichier à créer

exports.createGame = async (req, res) => {
    try {
        const newGame = new Game({ player1: req.user._id });
        await newGame.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.joinGame = async (req, res) => {
    try {
        const game = await Game.findById(req.body.gameId);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        if (game.player2) return res.status(400).json({ error: 'Game is already full' });

        game.player2 = req.user._id;
        await game.save();
        res.status(200).json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.makeMove = async (req, res) => {
    try {
        const game = await Game.findById(req.body.gameId);
        if (!game) return res.status(404).json({ error: 'Game not found' });

        const { x, y } = req.body;
        if (game.board[x][y] !== '') return res.status(400).json({ error: 'Invalid move' });

        game.board[x][y] = game.currentPlayer === 'player1' ? 'X' : 'O';
        game.currentPlayer = game.currentPlayer === 'player1' ? 'player2' : 'player1';
        await game.save();

        res.status(200).json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getGameStatus = async (req, res) => {
    try {
        const game = await Game.findById(req.params.gameId);
        if (!game) return res.status(404).json({ error: 'Game not found' });
        res.status(200).json(game);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
