const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes');
const { createServer } = require('http');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const app = express();
const httpServer = createServer(app);

// Constants
const MONGODB_URI = 'mongodb+srv://rohithpasupuleti:6JKa7aoEyWrkB8UH@rohithclustor.9nkqpd3.mongodb.net/?retryWrites=true&w=majority&appName=Rohithclustor';
const PORT = 3003;

// Middlewares
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// nsnss
// CORS Headers Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


const multipleImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/multiple/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const multipleUpload = multer({ storage: multipleImageStorage });
  
  app.use(express.urlencoded({ extended: false }));
  
  app.post('/multipleUpload', multipleUpload.array('images', 10), (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Please upload at least one file!' });
      }
  
      const fileUrls = req.files.map((file) => ({
        message: 'File uploaded successfully.',
        url: `http://localhost:3003/uploads/multiple/${file.filename}`,
        extension: path.extname(file.originalname),
      }));
  
      res.status(200).json({
        message: 'Files uploaded successfully.',
        files: fileUrls,
      });
    } catch (err) {
      res.status(500).json({ message: `Could not upload the files. ${err.message || err}` });
    }
  });
  
  
  app.use('/uploads/multiple', express.static(path.join(__dirname, 'uploads/multiple')));
  
  
  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ message: `Multer error: ${err.message}` });
    } else {
      res.status(500).json({ message: `Internal Server Error: ${err.message || err}` });
    }
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
