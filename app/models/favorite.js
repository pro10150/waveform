var mongoose = require('mongoose');

let favoriteSchema = new mongoose.Schema({
    id: String,
    songId: String,
    viewCount: Number
});

module.exports = mongoose.model('Favorite', favoriteSchema);