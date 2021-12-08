const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cinemaSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, required: true},
    name: {type: String, unique: true, required: true},
    districtID: {type: Schema.Types.ObjectId, ref: 'district', required: true},
    address: String,
    email: String,
    telephone: String
})

module.exports = mongoose.model("cinema", cinemaSchema)