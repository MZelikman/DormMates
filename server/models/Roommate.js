const mongoose = require('mongoose')

const roommateSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        house: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true });

module.exports = mongoose.model('Roommate', roommateSchema);