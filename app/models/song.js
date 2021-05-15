var mongoose = require('mongoose');

let songSchema = new mongoose.Schema({
    title: String,
    lyrics: String,
    popularity: Number,
    artistId: {type: mongoose.Schema.Types.ObjectId, ref: "Artist"},
    artistName: {type: mongoose.Schema.Types.String, ref: "Artist"},
    albumId: {type: mongoose.Schema.Types.ObjectId, ref: "Album"},
    albumName: {type: mongoose.Schema.Types.String, ref: "Album"},
    cover: {type: mongoose.Schema.Types.String, ref: "album"},
    audio: String
});

module.exports = mongoose.model('Song', songSchema)