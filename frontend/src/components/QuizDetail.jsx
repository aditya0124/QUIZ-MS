import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuizByIdQuery } from "../API/api/quizApi"; // Import the hook from RTK Query

const QuizDetail = () => {
  const { id } = useParams(); // Get quiz ID from URL params
  const navigate = useNavigate();

  // Fetch quiz data using the RTK Query hook
  const { data: quiz, isLoading, error } = useQuizByIdQuery(id);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);

    // Redirect to results page with quiz data and score
    navigate('/result', {
      state: { score: newScore, quiz: quiz, selectedAnswers: selectedAnswers },
    });
  };

  // Loading, error, or no quiz
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!quiz) return <p>No quiz found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{quiz.quizTitle}</h1>

      {score === null ? (
        <div className="p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">
            {currentQuestionIndex + 1}. {quiz.questions[currentQuestionIndex].questionText}
          </h2>
          <ul className="mt-4 space-y-2">
            {quiz.questions[currentQuestionIndex].options.map((option, i) => (
              <li
                key={i}
                className={`p-3 border rounded-md cursor-pointer transition ${
                  selectedAnswers[currentQuestionIndex] === option
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Your Score: {score} / {quiz.questions.length}
          </h2>
        </div>
      )}

      {score === null && (
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizDetail;



