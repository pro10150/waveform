var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    user: String,
    date: Date,
    detail: String
});

module.exports = mongoose.model('Activity', ActivitySchema)