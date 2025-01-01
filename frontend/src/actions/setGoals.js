import axios from 'axios';

export const setGoals = async (requestPayload, token) => {
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

export const getGoals = async (token) => {
    try {
        const response = await axios.get('http://localhost:3001/goals', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting goals:', error);
        throw error;
    }
}