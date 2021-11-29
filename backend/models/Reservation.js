const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const reservationSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, required: true},
    customerName:  {type: String, required: true},
    customerUsername:  {type: String, required: true},
    customerPhone:  {type: String, required: true},
    sessionID: {type: Schema.Types.ObjectId, ref: 'session', required: true}
})

module.exports = mongoose.model("reservation", reservationSchema)