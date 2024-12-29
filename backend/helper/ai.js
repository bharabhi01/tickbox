import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const generateAIResponse = async (goal, description) => {
    console.log("Generating AI response...");

    const prompt = `You are a helpful assistant that generates AI responses for goals and descriptions. You are given a goal and a description where goal is the goal name and the description describes the goal and you need to analyze the goal and the description and generate a roadmap for the goal based on the description. The roadmap needs to be very detailed and specific to the goal and the description. It should be in the form of JSON with each step a different key and the value being the step description. Keep in the mind the goal end date that would be in the description. So, the goal is ${goal} and the description is ${description}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    console.log(response);
    return response;
}

export { generateAIResponse };