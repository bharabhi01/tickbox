import axios from 'axios';

export const setGoals = async (requestPayload, token) => {
    console.log("token", token);
    try {
        const response = await axios.post('http://localhost:3001/goals', requestPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error setting goals:', error);
        throw error;
    }
};