const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String
})

module.exports = mongoose.model("category", categorySchema)