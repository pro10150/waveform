var mongoose = require('mongoose');

let albumSchema = new mongoose.Schema({
    name: String,
    cover: String,
    popularity: Number,
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ]
});

module.exports = mongoose.model('Album', albumSchema);