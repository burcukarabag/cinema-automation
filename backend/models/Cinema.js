const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cinemaSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    districtId: [type: Schema.Types.ObjectId, ref: 'district'],
    address: String,
    mail: String,
    telephone: String
})

module.exports = mongoose.model("cinema", cinemaSchema)