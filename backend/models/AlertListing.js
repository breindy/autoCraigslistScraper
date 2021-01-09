const mongoose = require('mongoose');
const { Schema } = mongoose;

const alertListingSchema = new Schema({
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
            }
        }
    ]
});

module.exports = mongoose.model('AlertListing', alertListingSchema);