const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const reservationSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    customerName: String,
    customerUsername: String,
    customerPhone: String,
    publishId: [type: Schema.Types.ObjectId, ref: 'publish'],
    endDate: Date
})

module.exports = mongoose.model("reservation", reservationSchema)