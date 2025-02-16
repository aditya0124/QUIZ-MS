import mongoose from "mongoose";
// import {User} from "../models/user.model.js";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
  quizTitle: { type: String, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [questionSchema],
  isPublished: { type: Boolean, default: false } // New field to track the quiz's publish status

}, { timestamps: true });

export const Quiz = mongoose.model('Quiz', quizSchema);

// module.exports = Quiz;
