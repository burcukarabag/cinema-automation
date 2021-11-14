const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const discrictSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    capacity: Number,
    cinemaId: [type: Schema.Types.ObjectId, ref: 'cinema']
})

module.exports = mongoose.model("district", discrictSchema)