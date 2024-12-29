import Goal from '../models/Goals.js';
import { generateAIResponse } from '../helper/ai.js';

const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find();
        if (!goals) {
            return res.status(400).json({ message: 'No goals found' });
        }
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setGoals = async (req, res) => {
    const { goal, description } = req.body;
    console.log(goal, description);

    try {
        const aiResponse = await generateAIResponse(goal, description);
        const newGoal = await Goal.create({
            goal,
            description,
            ai_response: aiResponse,
        });
        res.status(201).json({
            newGoal
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getGoals, setGoals };