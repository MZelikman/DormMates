import mongoose from 'mongoose';

const choreSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        house: {
            type: String,
            required: true,
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
        currentChoice: {
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

export default mongoose.model('Chore', choreSchema);