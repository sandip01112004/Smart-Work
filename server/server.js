import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import resourceRoutes from './routes/resourceRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';

app.use('/api/resources', resourceRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Routes
app.get('/', (req, res) => {
    res.send('Smart Work API is running...');
});

// Start Server
const startServer = async () => {
    if (process.env.MONGO_URI) {
        await connectDB();
    } else {
        console.warn('MONGO_URI not found in .env, skipping DB connection for now.');
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
