import { Quiz } from "../models/quiz.model.js";
import { User } from "../models/user.model.js";
// app.post('/api/v1/quiz/create', async (req, res) => {
  export const createQuiz = async (req, res) => {
    const instructorId = req.id;  // Access the instructorId from the middleware (req.id)

  // const { quizTitle, instructorId, questions } = req.body;
  const { quizTitle, questions } = req.body;

  try {
      // Create a new quiz entry
      const newQuiz = new Quiz({
          quizTitle,
          instructorId,
          questions
      });

      // Save it to the database
      const savedQuiz = await newQuiz.save();

      // Respond with the saved quiz
      res.status(201).json(savedQuiz);
  } catch (error) {
      console.error('Error saving quiz:', error);
      res.status(500).json({ message: 'Error saving quiz' });
  }
};

// Get all quizzes (just for testing purposes)
// app.get('/api/v1/quiz/get', async (req, res) => {
  export const getQuizzes = async(req,res) => {
  try {
      const quizzes = await Quiz.find();
      res.status(200).json(quizzes);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving quizzes' });
  }
};



// It we use when we click on an QUiz we n eed that quiz by the ID:-

export const getQuizById = async (req, res) => {
  const { id } = req.params; // Get the quiz ID from the request params

  try {
    const quiz = await Quiz.findById(id); // Query the database for the quiz by ID

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' }); // Handle case where quiz doesn't exist
    }

    res.status(200).json(quiz); // Return the quiz data
  } catch (error) {
    console.error('Error retrieving quiz:', error);
    res.status(500).json({ message: 'Error retrieving quiz' }); // Handle server error
  }
};



// use to get the QUiz of a specific 

export const getQuizzesByInstructorId = async (req, res) => {
  const  instructorId  = req.id; // Get the instructor ID from the query params

  try {
    // Query the database to find all quizzes created by the specified instructor
    const quizzes = await Quiz.find({ instructorId });

    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this instructor' }); // Handle case where no quizzes exist
    }

    res.status(200).json(quizzes); // Return all quizzes created by the instructor
  } catch (error) {
    console.error('Error retrieving quizzes:', error);
    res.status(500).json({ message: 'Error retrieving quizzes' }); // Handle server error
  }
};
// Works for "http://localhost:8080/api/v1/quiz/creatorQuiz?instructorId=67aeb7d7e6549791c0884011"



// export const editQuiz = async (req, res) => {
//   const { id } = req.params; // Get the quiz ID from the request params
//   const quizData = req.body; // Get the updated quiz data from the request body

//   try {
//     // Find the quiz by ID and update it with the new data
//     const updatedQuiz = await Quiz.findByIdAndUpdate(id, quizData, {
//       new: true, // Return the updated quiz document
//       runValidators: true, // Ensure that validation is run on the update
//     });

//     if (!updatedQuiz) {
//       return res.status(404).json({ message: 'Quiz not found' }); // Handle the case where the quiz doesn't exist
//     }

//     res.status(200).json(updatedQuiz); // Return the updated quiz
//   } catch (error) {
//     console.error('Error updating quiz:', error);
//     res.status(500).json({ message: 'Error updating quiz' }); // Handle server error
//   }
// };



export const editQuiz = async (req, res) => {
  const { id } = req.params; // Get the quiz ID from the request params
  const quizData = req.body; // Get the updated quiz data from the request body
  
  // Destructure quizData (to handle the structure you're passing in the frontend)
  const { quizTitle, questions, isPublished } = req.body;
  console.log(req.body);

  try {
    // Validate the incoming data
    if (!quizTitle || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Invalid data provided' , data:quizData}); // If data is invalid
    }

    // Find the quiz by ID and update it with the new data
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { quizTitle, questions, isPublished },  // Update the quiz with the new data
      {
        new: true, // Return the updated quiz document
        runValidators: true, // Ensure that validation is run on the update
      }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' }); // If quiz is not found
    }

    res.status(200).json(updatedQuiz); // Return the updated quiz data
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Error updating quiz' }); // If server error occurs
  }
};



// PATCH: Toggle publish status for a quiz
// router.patch('/:quizId/publish', async (req, res) => {
  export const publishQuiz = async(req,res) => {
  const { quizId } = req.params; // Get quizId from URL params
  console.log(quizId);
  const { isPublished } = req.body; // Get the new publish status from the request body
console.log(req.body);
  try {
    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' ,});
    }

    // Update the publish status of the quiz
    quiz.isPublished = isPublished;
    await quiz.save();

    // Return the updated quiz
    return res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};




// DELETE quiz
// router.delete('/quiz/:id/delete', async (req, res) => {
  export const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;

    // Find the quiz by ID and delete it
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the quiz." });
  }
};


































// const router = express.Router();

// // Create a new quiz
// router.post('/quizzes', async (req, res) => {
//   try {
//     const { quizTitle, instructorId, questions } = req.body;
//     const newQuiz = new Quiz({ quizTitle, instructorId, questions });
//     await newQuiz.save();
//     res.status(201).json(newQuiz);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get all quizzes
// router.get('/quizzes', async (req, res) => {
//   try {
//     const quizzes = await Quiz.find().populate('instructorId', 'name');
//     res.status(200).json(quizzes);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get a specific quiz by ID
// router.get('/quizzes/:id', async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id).populate('instructorId', 'name');
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }
//     res.status(200).json(quiz);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update a quiz by ID
// router.put('/quizzes/:id', async (req, res) => {
//   try {
//     const { quizTitle, questions } = req.body;
//     const updatedQuiz = await Quiz.findByIdAndUpdate(
//       req.params.id,
//       { quizTitle, questions },
//       { new: true }
//     );
//     if (!updatedQuiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }
//     res.status(200).json(updatedQuiz);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete a quiz by ID
// router.delete('/quizzes/:id', async (req, res) => {
//   try {
//     const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
//     if (!deletedQuiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;