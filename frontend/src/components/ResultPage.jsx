import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const { state } = useLocation(); // Retrieve quiz data passed through `navigate`
  const { score, quiz, selectedAnswers } = state;
  const navigate = useNavigate(); // Use navigate for redirection

  const handleAttemptAgain = () => {
    // Navigate to the quiz detail page to attempt the quiz again
    navigate(`/quiz-details/${quiz._id}`);
  };

  const handleBackToHome = () => {
    // Navigate to the home page or quiz list
    navigate('/');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Quiz Results</h1>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Your Score: {score} / {quiz.questions.length}
      </h2>

      <div className="space-y-6">
        {quiz.questions.map((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === question.correctAnswer;

          return (
            <div key={question._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{question.questionText}</h3>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Correct Answer:</strong> {question.correctAnswer}
              </p>
              <p className={`text-sm mt-2 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                <strong>Your Answer:</strong> {userAnswer}
              </p>
              {!isCorrect && (
                <p className="text-red-500 mt-2">Incorrect. The correct answer is: {question.correctAnswer}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleAttemptAgain}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Attempt Again
        </button>

        <button
          onClick={handleBackToHome}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
