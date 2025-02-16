import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetQuizzesByInstructorIdQuery } from "@/API/api/quizApi"; // Adjust the import path as necessary

const Dashboard = () => {
  // const [userId, setUserId] = useState("67aeb7d7e6549791c0884011"); // Example instructorId, set dynamically in your app
  // const { data: quizzes, error, isLoading } = useGetQuizzesByInstructorIdQuery(userId);
  const { data: quizzes, error, isLoading } = useGetQuizzesByInstructorIdQuery();

  const navigate = useNavigate();

  // Handle loading, error, and display quizzes
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEditQuiz = (quizId) => {
    // Navigate to the edit page for the specific quiz
    navigate(`/quiz/edit/${quizId}`);
  };

  const handleAddQuiz = () => {
    // Navigate to the create-quiz page
    navigate("/create-quiz");
  };


  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Your Quizzes</h1>
        <button
          onClick={handleAddQuiz}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Quiz
        </button>
      </div>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Quiz Title</th>
            <th className="border px-4 py-2">Publish Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes && quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              
              <tr key={quiz._id}>
                <td className="border px-4 py-2">{quiz.quizTitle}</td>
                <td className="border px-4 py-2">
                  {quiz.ispublished ? "Published" : "Unpublished"}
                </td>
                
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEditQuiz(quiz._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border px-4 py-2 text-center">
                No quizzes found for this instructor.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

