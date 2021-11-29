const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const discrictSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    capacity:{type: Number, required: true},
    cinemaID: {type: Schema.Types.ObjectId, ref: 'cinema'}
})

module.exports = mongoose.model("district", discrictSchema)