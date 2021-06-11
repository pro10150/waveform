var mongoose = require('mongoose');

let albumSchema = new mongoose.Schema({
    name: String,
    cover: String,
    popularity: Number,
    artistId: {type: mongoose.Schema.Types.ObjectId, ref: "Artist"},
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
});

module.exports = mongoose.model('Album', albumSchema);