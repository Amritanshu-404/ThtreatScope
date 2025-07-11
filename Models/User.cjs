const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /@/ },
    company: { type: String },
    occupation: { type: String },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
