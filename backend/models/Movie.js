const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const filmSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, required: true},
    name: {type: String, required: true},
    director:  {type: String, required: true},
    summary: String,
    banner: Binary,
    categoryID: {type: Schema.Types.ObjectId, ref: 'category'},
    time: {type: Number, min: 3, max: 600, required: true}
})

module.exports = mongoose.model("film", filmSchema)