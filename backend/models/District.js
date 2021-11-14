const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const discrictSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    cityId: [type: Schema.Types.ObjectId, ref: 'city']
})

module.exports = mongoose.model("district", discrictSchema)