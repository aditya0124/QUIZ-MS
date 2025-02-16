import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetQuizQuery } from '../API/api/quizApi';  // Import RTK query hook

const Quiz = () => {
  const navigate = useNavigate();

  // Fetch quizzes using RTK Query
  const { data: quizzes, error, isLoading } = useGetQuizQuery();
  const filteredQuizzes = quizzes?.filter((quiz) => quiz.isPublished === true);
// 

  // Handle loading, error, and quizzes data
  if (isLoading) return <div>Loading quizzes...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">All Quizzes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredQuizzes && filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{quiz.quizTitle}</h2>
              <div className="text-gray-500 text-sm mb-4">
                <p>Time: {quiz.duration || 'N/A'}</p>
                <p>Instructor: {quiz.instructorName || 'Unknown'}</p>
              </div>
              <button
                onClick={() => navigate(`/quiz-details/${quiz._id}`)}  // Navigate to quiz details
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md"
              >
                Attempt
              </button>
            </div>
          ))
        ) : (
          <p>No quizzes available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
