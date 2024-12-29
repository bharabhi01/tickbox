import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    console.log(year, month, day);
    return `${year}-${month}-${day}`;
}

const generateAIResponse = async (goal, description) => {
    console.log("Generating AI response...");

    const prompt = `You are a helpful assistant that generates AI responses for goals and descriptions. You are given a goal and a description where goal is the goal name and the description describes the goal and you need to analyze the goal and the description and generate a roadmap for the goal based on the description. The roadmap needs to be very detailed and specific to the goal and the description. It should be in the form of JSON Object with each step a different key and the value being the step description. Follow this format:  "Step 2 Step Header": {
                "description": "Detailed description of the step",
                "start_date": "29-01-2025",
                "end_date": "28-02-2025",
                "links": [
                    "https://www.codecademy.com/learn/learn-python-3",
                    "https://www.udacity.com/course/intro-to-python--ud1110"
                ]
            },
            Keep in the mind the goal end date that would be in the description and the goal start date that would be in the goal else start date would be ${getTodayDate()}. For each step, you need to generate a start date and end date in the format of date-month-year (for example 1st december 2024). Also, always include links to the steps so that the user can learn more about the step. So, the goal is ${goal} and the description is ${description}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const cleanJsonString = response.replace(/```json\n|\n```/g, '');
    const airesponse = JSON.parse(cleanJsonString);
    return airesponse;
}

export { generateAIResponse };