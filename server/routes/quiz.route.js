import express from "express";
import { createQuiz, deleteQuiz, editQuiz, getQuizById, getQuizzes, getQuizzesByInstructorId, publishQuiz } from "../controllers/quiz.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();
router.route("/create-quiz").post(isAuthenticated,createQuiz);
router.route("/getQuiz").get(getQuizzes);
router.route("/quiz/:id").get(getQuizById);
// router.route("/creatorQuiz").get(getQuizzesByInstructorId);
router.route("/creatorQuiz").get(isAuthenticated,getQuizzesByInstructorId);
router.route('/edit-quiz/:id').put(editQuiz);

router.route('/publish/:id').patch(publishQuiz);
router.route('/deleteQuiz/:id').delete(deleteQuiz)

export default router;