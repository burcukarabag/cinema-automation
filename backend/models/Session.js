const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const sessionSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, required: true},
    movieID: {type: Schema.Types.ObjectId, ref: 'movie', required: true},
    saloonID: {type: Schema.Types.ObjectId, ref: 'saloon', required: true},
    startDate:  {type: Date, required: true},
    endDate:  {type: Date, required: true}
});

module.exports = mongoose.model("session", sessionSchema);