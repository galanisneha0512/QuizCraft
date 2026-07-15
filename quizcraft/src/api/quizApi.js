import axios from "axios";

// Base URL of our FastAPI backend
// All API calls will use this as the starting point
const API_BASE = "http://localhost:8000/api";

// Function to generate quiz - called from Upload.jsx
// Sends study material and settings, gets back questions
export const generateQuiz = async (text, settings) => {
  // Make a POST request to /api/generate_quiz
  const response = await axios.post(`${API_BASE}/generate_quiz`, {
    text: text, // study material
    num_questions: settings.numQuestions, // number of questions
    question_types: settings.questionTypes, // ["mcq", "true_false" etc.]
    difficulty: settings.difficulty, // "easy", "medium", "hard"
  });

  // response.data is what FastAPI returns
  // we return just the questions array
  console.log(response.data.questions);
  return response.data.questions;
};
