const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const { userSchemaString } = require('../models/user');

const User = mongoose.model(userSchemaString);

/* GET users listing. */
router.get('/', async function(req, res) {
    const userList = await User.find();

    res.json(userList);
});

router.post('/', async function(req, res) {
    const newUser = new User({
        name: req.body.name,
    });
    await newUser.save();
    res.json(newUser);
});

router.get('/:name', async function(req, res) {
    const foundUser = await User.findOne({
        name: req.params.name,
    });

    res.json(foundUser);
});

module.exports = router;
