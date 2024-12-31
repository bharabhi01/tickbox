export const loginUser = async (credentials, token) => {
    const response = await fetch(`http://localhost:3001/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};

export const signupUser = async (credentials) => {
    const response = await fetch(`http://localhost:3001/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Signup failed');
    }

    return response.json();
}