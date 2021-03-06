var mongoose = require('mongoose');

let artistSchema = new mongoose.Schema({
    name: String,
    cover: String,
    popularity: Number,
    albums: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Album' 
        }
    ],
    manager: String
});

module.exports = mongoose.model('Artist', artistSchema);