const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const movieSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    pid: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    director:  {type: String, required: true},
    summary: {type: String },
    banner:{type: Buffer},
    categoryID: {type: Schema.Types.ObjectId, ref: 'category', required: true},
    time: {type: Number, min: 3, max: 600, required: true}
});

module.exports = mongoose.model("movie", movieSchema);