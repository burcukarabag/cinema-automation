const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const discrictSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    cityID: {type: Schema.Types.ObjectId, ref: 'city', required: true}
})

module.exports = mongoose.model("district", discrictSchema)