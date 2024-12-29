import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import goalRoutes from './routes/goal.js';
import express from 'express';

const app = express();
app.use(express.json());

dotenv.config();
connectDB();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/', goalRoutes);