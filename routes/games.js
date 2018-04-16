const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { gameSchemaString } = require('../models/game');

const Game = mongoose.model(gameSchemaString);


router.get('/', async function(req, res) {
    const gameList = await Game.find();

    res.json(gameList);
});

router.post('/', async function(req, res) {
    const newGame = new Game({
        title: req.body.title,
    });
    await newGame.save();
    res.json(newGame);
});

router.get('/:title', async function(req, res) {
    const foundGame = await Game.findOne({
        name: req.params.title,
    });

    res.json(foundGame);
});
module.exports = router;
