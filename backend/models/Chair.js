const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const chairSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, required: true},
    number: {type: Number, required: 'true'},
    status:  {type: Boolean, required: true},
    saloonID: {type: Schema.Types.ObjectId, ref: 'saloon', required: true}
})

module.exports = mongoose.model("chair", chairSchema)