const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeyValue = new Schema({
    key: {
        type: String,
        unique: true
    },
    value: Schema.Types.Mixed
});

module.exports = KeyValue;