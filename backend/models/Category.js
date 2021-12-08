const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categorySchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, unique: true, required: true},
    name:  {type: String, unique: true, required: true}
});

module.exports = mongoose.model("category", categorySchema)