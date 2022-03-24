const mongoose = require('mongoose');

const rawInfoSchema = new mongoose.Schema({
    time: {
        type: String,
    },
    uid: {
        type: String,
        required: true
    },
});

const rawInfo = mongoose.model('rawInfo', rawInfoSchema);
module.exports = rawInfo;
