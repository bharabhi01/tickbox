import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    goal: String,
    description: String,
    ai_response: String,
});

export default mongoose.model('Goal', goalSchema);