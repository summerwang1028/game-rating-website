const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { commentSchemaString } = require('../models/comment');
const Comment = mongoose.model(commentSchemaString);


router.get('/', async function(req, res) {
    const commentList = await Comment
        .find()
        .populate('game')
        .exec();

    res.json(commentList);
});

router.post('/', async function(req, res) {
    let { context, user, game } = req.body;
    const newComment = new Comment({
        context,
        user,
        game,
    });
    await newComment.save();
    res.json(newComment);
});

router.delete('/:commentId', async function(req, res) {
    await Comment
        .find({
            _id: req.params.commentId,
        })
        .remove()
        .exec();
    res.sendStatus(200);
});

router.get('/game/:gameId', async function(req, res) {
    const commentList = await Comment
        .find({
            game: req.params.gameId,
        })
        .populate('game')
        .exec();

    res.json(commentList);
});

module.exports = router;
