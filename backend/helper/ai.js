import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const generateAIResponse = async (goal, description, type) => {
    console.log("Generating AI response...");

    const prompt = `You are a specialized goal planning assistant. Your task is to create customized roadmaps based on the following inputs:
- Goal Name: ${goal}
- Description: ${description}
- Type: ${type} (Personal/Professional/Academic/Health/Financial)

Generate a detailed roadmap following these type-specific guidelines:

Professional Goals:
- Focus on career development milestones
- Include industry-specific certifications
- Add networking and skill-building activities

Academic Goals:
- Structure around academic terms/semesters
- Include study milestones and exam preparations
- Add research and practical application components

Health Goals:
- Include progressive fitness/health milestones
- Add regular check-in points
- Include lifestyle modification steps

Financial Goals:
- Break down into specific savings/investment targets
- Include financial education steps
- Add milestone-based reviews

Personal Goals:
- Create balanced, achievable mini-goals
- Include skill development steps
- Add progress tracking mechanisms
- Productivity and time management steps

Follow this format strictly:
    "goal_name": "goal_name",
    "goal_type": "goal_type",
    "description": "description",
    "steps": {
        "Step X Step Header": {
            "description": "Detailed description of the step",
            "start_date": "DD-MM-YYYY",
            "end_date": "DD-MM-YYYY",
            "links": [
                "Relevant resource links for this specific step"
            ]
        }
    }

Important:
- Use start date from goal or default to ${getTodayDate()}
- Consider end date mentioned in description
- Each step must include relevant, high-quality resource links
- Dates should be in DD-MM-YYYY format
- Steps should be progressive and build upon each other
- Include 6-8 detailed steps for each roadmap`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const cleanJsonString = response.replace(/```json\n|\n```/g, '');
    const airesponse = JSON.parse(cleanJsonString);
    return airesponse;
}

export { generateAIResponse };