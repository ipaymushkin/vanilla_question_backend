const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: {unique: true},
    },
    name: {type: String, required: true},
    description: {type: String},
    complexity: {type: String},
    questions: {type: Object}
});

module.exports = mongoose.model('Game', gameSchema);
