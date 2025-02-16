// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "sonner"; // Assuming you're using sonner for notifications
// import { useQuizByIdQuery, useEditQuizMutation } from "@/API/api/quizApi"; // RTK Query hooks

// export default function EditQuiz() {
//   const { id } = useParams(); // Get quiz ID from the URL
//   console.log(id);
//   const navigate = useNavigate();

//   const [quizTitle, setQuizTitle] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [isPublished, setIsPublished] = useState(false);

//   // Fetch quiz data using RTK Query hook
//   const { data: quizData, isLoading: quizLoading, error } = useQuizByIdQuery(id);
//   // console.log(quizData);

//   // Use RTK Mutation for updating the quiz
//   const [editQuiz, { isLoading: updateLoading }] = useEditQuizMutation();

//   // Prefill form data when quiz data is fetched
//   useEffect(() => {
//     if (quizData) {
//       const { quizTitle, questions, isPublished } = quizData;

//       // console.log("Quiz Title:", quizTitle); // Check if quizTitle is fetched correctly
//       // console.log("Questions:", questions); // Check if questions are populated correctly
//       // console.log("Is Published:", isPublished);

//       setQuizTitle(quizTitle);
//       setQuestions(questions);
//       setIsPublished(isPublished);
//     }
//   }, [quizData]);

//   // Function to update question data
//   const updateQuestion = (index, field, value) => {
//     const updatedQuestions = [...questions]; // Shallow copy of the questions array
//     const updatedQuestion = { ...updatedQuestions[index] }; // Shallow copy of the question object
//     updatedQuestion[field] = value; // Update the field in the copied question
//     updatedQuestions[index] = updatedQuestion; // Replace the original question with the updated one
//     setQuestions(updatedQuestions); // Set the updated questions state
//   };

//   // Function to update option data
//   const updateOption = (qIndex, oIndex, value) => {
//     const updatedQuestions = [...questions]; // Shallow copy of the questions array
//     const updatedQuestion = { ...updatedQuestions[qIndex] }; // Shallow copy of the question object
//     const updatedOptions = [...updatedQuestion.options]; // Shallow copy of the options array
//     updatedOptions[oIndex] = value; // Update the option in the copied options array
//     updatedQuestion.options = updatedOptions; // Replace the original options array with the updated one
//     updatedQuestions[qIndex] = updatedQuestion; // Replace the original question with the updated one
//     setQuestions(updatedQuestions); // Set the updated questions state
//   };

//   // Function to remove a question
//   const removeQuestion = (index) => {
//     const updatedQuestions = questions.filter((_, i) => i !== index); // Remove question by index
//     setQuestions(updatedQuestions); // Set the updated questions state
//   };

//   // Function to handle form submission
//   const handleSubmit = async () => {
//     const updatedQuizData = { quizTitle, questions, isPublished };
//     console.log(updatedQuizData);


//     try {
//       // Use RTK mutation to submit the updated quiz data
//       await editQuiz({ quizId: id, updatedQuizData }).unwrap();
      
//       toast.success("Quiz updated successfully!");
//       navigate("/dashboard"); // Redirect to quiz list page
//     } catch (error) {
//       toast.error("An error occurred while updating the quiz.");
//     }
//   };

//   // Function to handle form submission
// // const handleSubmit = async () => {
// //   try {
// //     // Send data directly without an extra object wrapper
// //     await editQuiz({
// //       quizId: id,   // The quiz ID from the URL parameters
// //       quizTitle,    // The quiz title from state
// //       questions,    // The questions from state
// //       isPublished,  // The publication status from state
// //     }).unwrap();   // Call unwrap to handle the promise resolution

// //     toast.success("Quiz updated successfully!");
// //     navigate("/dashboard");  // Redirect after a successful update
// //   } catch (error) {
// //     toast.error("An error occurred while updating the quiz.");
// //   }
// // };


//   // Toggle publish status
//   const handlePublishToggle = () => {
//     const newPublishStatus = !isPublished;
//     setIsPublished(newPublishStatus);
//     toast.success(newPublishStatus ? "Quiz published!" : "Quiz unpublished!");
//   };

//   // Handle delete quiz
//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this quiz?")) {
//       try {
//         const response = await fetch(`/api/quiz/${id}/delete`, { method: "DELETE" });
        
//         if (response.ok) {
//           toast.success("Quiz deleted successfully!");
//           navigate("/admin/quiz");
//         } else {
//           const errorData = await response.json();
//           toast.error(errorData.message || "Failed to delete quiz.");
//         }
//       } catch (error) {
//         toast.error("An error occurred while deleting the quiz.");
//       }
//     }
//   };

//   // Loading state for quiz data
//   if (quizLoading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg relative border border-gray-200">
//       <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Quiz</h1>

//       {/* Quiz Title Input */}
//       <Input
//         type="text"
//         placeholder="Quiz Title"
//         value={quizTitle}
//         onChange={(e) => setQuizTitle(e.target.value)}
//         className="mb-4 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
//       />
      
//       {/* Question List */}
//       {questions.map((q, qIndex) => (
//         <Card key={qIndex} className="mb-6 border border-gray-200 shadow-sm rounded-lg">
//           <CardContent className="p-4">
//             {/* Question Textarea */}
//             <Textarea
//               placeholder="Enter question text"
//               value={q.questionText}
//               onChange={(e) => updateQuestion(qIndex, "questionText", e.target.value)}
//               className="mb-2 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
//             />

//             {/* Options Inputs */}
//             {q.options.map((opt, oIndex) => (
//               <div
//                 key={oIndex}
//                 className={`mb-2 w-full border border-gray-300 p-3 rounded-lg ${
//                   opt === q.correctAnswer ? "bg-green-100 border-green-500 text-green-800" : ""
//                 }`}
//               >
//                 <Input
//                   type="text"
//                   placeholder={`Option ${oIndex + 1}`}
//                   value={opt}
//                   onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
//                   className="w-full"
//                 />
//               </div>
//             ))}

//             {/* Correct Answer Input */}
//             <Input
//               type="text"
//               placeholder="Correct Answer"
//               value={q.correctAnswer}
//               onChange={(e) => updateQuestion(qIndex, "correctAnswer", e.target.value)}
//               className="mb-4 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
//             />

//             {/* Remove Question Button */}
//             <Button variant="destructive" onClick={() => removeQuestion(qIndex)} className="w-full">
//               Remove Question
//             </Button>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Add Question Button */}
//       <Button
//         className="mb-6 w-full border border-gray-300 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
//         onClick={() => setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctAnswer: "" }])}
//       >
//         + Add Question
//       </Button>

//       {/* Submit Button */}
//       <Button className="w-full mb-6 border border-gray-300 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" onClick={handleSubmit}>
//         {updateLoading ? "Updating..." : "Submit Updates"}
//       </Button>

//       {/* Control Buttons */}
//       <div className="absolute top-4 right-4 flex space-x-4">
//         {/* Delete Button */}
//         <Button
//           variant="destructive"
//           onClick={handleDelete}
//           className="border border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500"
//         >
//           Delete Quiz
//         </Button>

//         {/* Publish Toggle Button */}
//         <Button
//           variant="outline"
//           onClick={handlePublishToggle}
//           className="border border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500"
//         >
//           {isPublished ? "Unpublish Quiz" : "Publish Quiz"}
//         </Button>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Assuming you're using sonner for notifications
import { useQuizByIdQuery, useEditQuizMutation, useTogglePublishQuizMutation, useDeleteQuizMutation } from "@/API/api/quizApi"; // RTK Query hooks

export default function EditQuiz() {
  const { id } = useParams(); // Get quiz ID from the URL
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isPublished, setIsPublished] = useState(false);

  // Fetch quiz data using RTK Query hook
  const { data: quizData, isLoading: quizLoading, error } = useQuizByIdQuery(id);

  // Use RTK Mutation for updating the quiz and publishing/unpublishing
  const [editQuiz, { isLoading: updateLoading }] = useEditQuizMutation();
  const [togglePublish, { isLoading: publishLoading }] = useTogglePublishQuizMutation();
  const[deleteQuiz] = useDeleteQuizMutation();

  // Prefill form data when quiz data is fetched
  useEffect(() => {
    if (quizData) {
      const { quizTitle, questions, isPublished } = quizData;
      setQuizTitle(quizTitle);
      setQuestions(questions);
      setIsPublished(isPublished);
    }
  }, [quizData]);

  // Function to update question data
  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Function to update option data
  const updateOption = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Function to remove a question
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const updatedQuizData = { quizTitle, questions, isPublished };
    try {
      await editQuiz({ quizId: id, updatedQuizData }).unwrap();
      toast.success("Quiz updated successfully!");
      navigate("/dashboard"); // Redirect to quiz list page
    } catch (error) {
      toast.error("An error occurred while updating the quiz.");
    }
  };

  // Handle publish/unpublish toggle
  const handlePublishToggle = async () => {
    const newPublishStatus = !isPublished;
    setIsPublished(newPublishStatus);

    try {
      await togglePublish({id, newPublishStatus }).unwrap();
      toast.success(newPublishStatus ? "Quiz published!" : "Quiz unpublished!");
    } catch (error) {
      toast.error("An error occurred while updating the publish status.");
      setIsPublished(!newPublishStatus); // Revert status if error occurs
    }
  };

  // Handle delete quiz
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuiz(id).unwrap(); // Call the deleteQuiz mutation
        toast.success("Quiz deleted successfully!");
        navigate("/dashboard");
      } catch (error) {
        toast.error("An error occurred while deleting the quiz.");
      }
    }
  };

  // Loading state for quiz data
  if (quizLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg relative border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Edit Quiz</h1>

      {/* Quiz Title Input */}
      <Input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="mb-4 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
      />
      
      {/* Question List */}
      {questions.map((q, qIndex) => (
        <Card key={qIndex} className="mb-6 border border-gray-200 shadow-sm rounded-lg">
          <CardContent className="p-4">
            {/* Question Textarea */}
            <Textarea
              placeholder="Enter question text"
              value={q.questionText}
              onChange={(e) => updateQuestion(qIndex, "questionText", e.target.value)}
              className="mb-2 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
            />

            {/* Options Inputs */}
            {q.options.map((opt, oIndex) => (
              <div
                key={oIndex}
                className={`mb-2 w-full border border-gray-300 p-3 rounded-lg ${
                  opt === q.correctAnswer ? "bg-green-100 border-green-500 text-green-800" : ""
                }`}
              >
                <Input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                  className="w-full"
                />
              </div>
            ))}

            {/* Correct Answer Input */}
            <Input
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) => updateQuestion(qIndex, "correctAnswer", e.target.value)}
              className="mb-4 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-gray-500"
            />

            {/* Remove Question Button */}
            <Button variant="destructive" onClick={() => removeQuestion(qIndex)} className="w-full">
              Remove Question
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Add Question Button */}
      <Button
        className="mb-6 w-full border border-gray-300 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        onClick={() => setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctAnswer: "" }])}
      >
        + Add Question
      </Button>

      {/* Submit Button */}
      <Button className="w-full mb-6 border border-gray-300 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors" onClick={handleSubmit}>
        {updateLoading ? "Updating..." : "Submit Updates"}
      </Button>

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        {/* Delete Button */}
        <Button
          variant="destructive"
          onClick={handleDelete}
          className="border border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500"
        >
          Delete Quiz
        </Button>

        {/* Publish Toggle Button */}
        <Button
          variant="outline"
          onClick={handlePublishToggle}
          className="border border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500"
        >
          {isPublished ? "Unpublish Quiz" : "Publish Quiz"}
        </Button>
      </div>
    </div>
  );
}
