var mongoose = require('mongoose');

var SubscriptionDetailSchema = new mongoose.Schema({
    id: String,
    ccn: Number,
    name: String,
    expireMonth: Number,
    expireYear: Number,
    cvv: Number
});

module.exports = mongoose.model('SubscriptionDetail', SubscriptionDetailSchema)