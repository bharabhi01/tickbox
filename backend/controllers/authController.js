import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

const signup = async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    console.log(first_name, last_name, username, email, password);

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ first_name, last_name, username, email, password });
        const token = generateToken(user._id);

        res.status(201).json({ token, message: 'Signup successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user || !(await user.comparePassword(password))) {
            console.log('Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { signup, login };