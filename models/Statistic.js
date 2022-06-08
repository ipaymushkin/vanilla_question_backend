const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statisticSchema = new Schema({
    gameId: {type: String, required: true},
    login: {type: String, required: true},
    meta: {type: Object}
});

module.exports = mongoose.model('Statistic', statisticSchema);
