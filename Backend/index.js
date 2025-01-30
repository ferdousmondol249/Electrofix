const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./Config/db');
const router = require('./Routes');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE','UPDATE','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/products', express.static(path.join(__dirname, 'products')));


app.use('/api', router);

const PORT = process.env.PORT || 8001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
});