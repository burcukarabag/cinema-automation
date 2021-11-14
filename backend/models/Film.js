const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const filmSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    categoryId: [type: Schema.Types.ObjectId, ref: 'category'],
    time: {type: Number, min: 3, max: 600}
})

module.exports = mongoose.model("film", filmSchema)