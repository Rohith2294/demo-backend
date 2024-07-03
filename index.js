const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes');
const { createServer } = require('http');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);

// Constants
const MONGODB_URI = 'mongodb+srv://rohithpasupuleti:6JKa7aoEyWrkB8UH@rohithclustor.9nkqpd3.mongodb.net/?retryWrites=true&w=majority&appName=Rohithclustor';
const PORT = 3001;

// Middlewares
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS Headers Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/api', authRoutes);

// MongoDB Connection and Server Start
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

module.exports = { app };
