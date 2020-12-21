const mongoose = require('mongoose');

const alertListingsSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
    },
    validListings: [
        {
            url: {
                type: String,
                required: true,
            },
            car: {
                type: String,
                required: true,
            },
            model: {
                type: String,
                required: true,
            },
            year: {
                type: Number,
                required: true,
            },
            odometer: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            color: {
                type: String,
                required: true,
            }
        }
    ]
});

module.exports = mongoose.model('AlertListings', alertListingsSchema);