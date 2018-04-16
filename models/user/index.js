const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchemaString = 'User';

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
});
mongoose.model(userSchemaString, UserSchema);

module.exports = {
    userSchemaString,
};
