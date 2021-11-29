const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const customerSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, required: true},
    name:  {type: String, required: true},
    surname:  {type: String, required: true},
    identificationNumber: String,
    telephone: String
})

module.exports = mongoose.model("customer", customerSchema)