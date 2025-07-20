const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);
