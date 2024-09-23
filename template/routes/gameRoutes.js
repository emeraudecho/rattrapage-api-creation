const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/create', gameController.createGame);
router.post('/join', gameController.joinGame);
router.post('/move', gameController.makeMove);
router.get('/status/:gameId', gameController.getGameStatus);

module.exports = router;
