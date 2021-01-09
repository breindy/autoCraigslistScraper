const mongoose = require('mongoose');
const { Schema } = mongoose;

const alertSchema = new Schema({
    phoneNumber: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    odometerMax: {
        type: Number,
        default: 200000
    },
    priceRangeMin: {
        type: Number,
        default: 0
    },
    priceRangeMax: {
        type: Number,
        default: 1000000
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alert', alertSchema);