import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goal: String,
    description: String,
    type: String,
    ai_response: JSON,
});

export default mongoose.model('Goal', goalSchema);