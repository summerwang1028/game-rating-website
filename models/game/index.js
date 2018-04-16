const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchemaString = 'Game';

const GameSchema = new Schema({
    title: { type: String, required: true, unique: true },
});
mongoose.model(gameSchemaString, GameSchema);

module.exports = {
    gameSchemaString,
};
