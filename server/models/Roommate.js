import mongoose from 'mongoose';

const roommateSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        house: {
            type: String,
            required: true,
        },
    },
    { timestamps: true });

export default mongoose.model('Roommate', roommateSchema);