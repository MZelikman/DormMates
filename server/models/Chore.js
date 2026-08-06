const mongoose = require('mongoose')

const choreSchema = new mongoose.Schema({
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
        frequencyDays: {
            type: Number,
            required: true,
            default: 7,
        },
        rotationOrder: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Roommate',
        }],
        currentChose: {
            type: Number,
            required: true,
            default: 0,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        lastCompleted: {
            type: Date,
            default: null,
        },
        
    },
    { timestamps: true });

module.exports = mongoose.model('Chore', choreSchema);