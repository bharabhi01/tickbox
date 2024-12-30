import axios from 'axios';

export const loginUser = async (credentials) => {
    const response = await fetch(`http://localhost:3001/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};