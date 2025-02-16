import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";  // Assuming you're using sonner for notifications
import { useCreateQuizMutation } from '@/API/api/quizApi'; // Import RTK Query hook

export default function CreateQuiz() {
  const navigate = useNavigate();

  // Get instructorId from the Redux store
  // const instructorId = useSelector((state) => state.auth.user?.id) || "67aeb7d7e6549791c0884011";
  // const instructorId = useSelector((state) => state.auth.user?.id) ;
  // console.log(instructorId);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  // Use the RTK Query mutation hook for creating a quiz
  const [createQuiz, { isLoading, error }] = useCreateQuizMutation();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
    // if (!instructorId) {
    //   toast.error("Instructor ID is not available.");
    //   return;
    // }

    // const quizData = { quizTitle, instructorId, questions };
    const quizData = { quizTitle, questions };

    try {
      // Call the RTK query mutation to create a quiz
      console.log("sending DATA", quizData);
      await createQuiz(quizData).unwrap();

      // Success
      toast.success("Quiz created successfully!");
      navigate("/dashboard");  // Redirect to quiz list
    } catch (error) {
      // Handle error
      toast.error(error?.message || "Failed to create quiz.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create a Quiz</h1>
      <Input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="mb-3"
      />
      
      {questions.map((q, qIndex) => (
        <Card key={qIndex} className="mb-4">
          <CardContent className="p-4">
            <Textarea
              placeholder="Enter question text"
              value={q.questionText}
              onChange={(e) => updateQuestion(qIndex, "questionText", e.target.value)}
              className="mb-2"
            />
            {q.options.map((opt, oIndex) => (
              <Input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                className="mb-2"
              />
            ))}
            <Input
              type="text"
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) => updateQuestion(qIndex, "correctAnswer", e.target.value)}
              className="mb-2"
            />
            <Button variant="destructive" onClick={() => removeQuestion(qIndex)}>Remove Question</Button>
          </CardContent>
        </Card>
      ))}
      
      <Button className="mb-3" onClick={addQuestion}>+ Add Question</Button>
      <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Creating Quiz..." : "Submit Quiz"}
      </Button>
      {error && <div className="text-red-500 mt-4">{error.message}</div>}
    </div>
  );
}

