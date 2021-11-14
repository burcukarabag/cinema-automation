const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const publishSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    filmId: [type: Schema.Types.ObjectId, ref: 'film'],
    saloonId: [type: Schema.Types.ObjectId, ref: 'saloon'],
    startDate: Date
})

module.exports = mongoose.model("publish", publishSchema)