const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const chairReservedSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, required: true},
    reservationID: {type: Schema.Types.ObjectId, ref: 'reservation', required: true},
    chairID: {type: Schema.Types.ObjectId, ref: 'chair', required: true},
})

module.exports = mongoose.model("chairReserved", chairReservedSchema)