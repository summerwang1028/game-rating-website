const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchemaString = 'Comment';

const { gameSchemaString } = require('../game');

const CommentSchema = new Schema({
    context: { type: String, required: true},
    user: { type: String, required: true},
    game: { type: Schema.Types.ObjectId, ref: gameSchemaString, required: true },
});

mongoose.model(commentSchemaString, CommentSchema);

module.exports = {
    commentSchemaString,
};
