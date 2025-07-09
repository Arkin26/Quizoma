// ✅ Load environment variables BEFORE anything else
require('dotenv').config();  

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 3000;

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["POST", "GET"],         
    credentials: true                 
}));

app.use(express.json());

// ✅ Now import routes (after dotenv is loaded)
const authRoutes = require('./route/auth');
app.use('/api/auth', authRoutes);

const quizRoutes = require('./route/quiz');
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => {
    res.send('hey there');
});

mongoose
  .connect("mongodb+srv://arkinutmal:Tilwara8@cluster0.s7jao.mongodb.net/Quizoma-Project?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to database!");

    // Optional 404 handler
    app.use((req, res) => {
      res.status(404).send("Not Found");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
