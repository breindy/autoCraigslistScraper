const mongoose = require('mongoose');

const alertsSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    car: {
        type: String,
        default: 'any'
    },
    model: {
        type: String,
        default: 'any'
    },
    odometerMin: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('Alerts', alertsSchema);