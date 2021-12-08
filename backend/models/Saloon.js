const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const saloonSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    capacity:{type: Number, required: true},
    cinemaID: {type: Schema.Types.ObjectId, ref: 'cinema', required: true}
});

module.exports = mongoose.model("saloon", saloonSchema)