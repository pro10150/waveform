var mongoose = require('mongoose');

let favoriteSchema = new mongoose.Schema({
    id: String,
    songId: String
});

module.exports = mongoose.model('Favorite', favoriteSchema);