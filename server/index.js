// index.js

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
import cors from "cors";
// import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import quizRoute from "./routes/quiz.route.js";

import {Quiz} from "./models/quiz.model.js"
import cookieParser from "cookie-parser";
dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
 
// apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/quiz", quizRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Quiz API!');
});


// ++++++++++++++++++++++
// app.post('/api/v1/quiz/create', async (req, res) => {
//   const { quizTitle, instructorId, questions } = req.body;

//   try {
//       // Create a new quiz entry
//       const newQuiz = new Quiz({
//           quizTitle,
//           instructorId,
//           questions
//       });

//       // Save it to the database
//       const savedQuiz = await newQuiz.save();

//       // Respond with the saved quiz
//       res.status(201).json(savedQuiz);
//   } catch (error) {
//       console.error('Error saving quiz:', error);
//       res.status(500).json({ message: 'Error saving quiz' });
//   }
// });

// // Get all quizzes (just for testing purposes)
// app.get('/api/v1/quiz/get', async (req, res) => {
//   try {
//       const quizzes = await Quiz.find();
//       res.status(200).json(quizzes);
//   } catch (error) {
//       res.status(500).json({ message: 'Error retrieving quizzes' });
//   }
// });
// ++++++++++++++++++++++
// Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
