const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String
})

module.exports = mongoose.model("city", citySchema)