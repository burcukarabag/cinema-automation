const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    zipCode:  {type: String, unique: true},
    name: {type: String, unique: true, required: true}
})

module.exports = mongoose.model("city", citySchema)