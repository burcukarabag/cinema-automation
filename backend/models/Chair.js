const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const chairSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    status: Boolean,
    saloonId: [type: Schema.Types.ObjectId, ref: 'saloon']
})

module.exports = mongoose.model("chair", chairSchema)