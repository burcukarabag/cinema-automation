const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, unique: true, required: true},
    zipCode: String,
    name: {type: String, unique: true, required: true}
})

module.exports = mongoose.model("city", citySchema)