const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const customerSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String,
    identificationNumber: String,
    telephone: String
})

module.exports = mongoose.model("customer", customerSchema)