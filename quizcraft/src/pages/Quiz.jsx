import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/quiz/ProgressBar";
import QuestionCard from "../components/quiz/QuestionCard";
import NavigationButtons from "../components/quiz/NavigationButtons";

function Quiz() {
  const navigate = useNavigate();

  // All questions loaded from sessionStorage
  const [questions, setQuestions] = useState([]);

  // Index of the currently visible question
  const [currentIndex, setCurrentIndex] = useState(0);

  // Stores user's answers - key is question index, value is the answer
  // e.g. { 0: "Oxygen", 1: "True", 2: "Glucose" }
  const [userAnswers, setUserAnswers] = useState({});

  // Load questions from sessionStorage when the component mounts
  useEffect(() => {
    const stored = sessionStorage.getItem("quizQuestions");

    if (!stored) {
      // If no questions found, send user back to upload page
      navigate("/upload");
      return;
    }

    setQuestions(JSON.parse(stored));
  }, [navigate]);

  // Save the user's answer for the current question
  const handleAnswer = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: answer, // store answer at the current question's index
    }));
  };

  // Go to previous question
  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // Go to next question
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Submit Quiz
  const handleSubmit = () => {
    // Save questions and answers to sessionStorage for Results page
    sessionStorage.setItem("quizAnswers", JSON.stringify(userAnswers));

    // Navigate to results page
    navigate("/results");
  };

  // Show nothing while questions are loading
  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Cannot generate quiz questions. Something went wrong. Please try again.
      </div>
    );
  }

  // Current question object
  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col gap-8">
        {/* Progress bar at the top */}
        <ProgressBar
          current={currentIndex + 1} // +1 because index starts at 0
          total={questions.length}
        />

        {/* Current question */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          userAnswer={userAnswers[currentIndex]} // pass saved answer if user came back
          onAnswer={handleAnswer}
        />

        {/* Navigation buttons */}
        <NavigationButtons
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isFirst={currentIndex === 0} // disable Prev on first
          isLast={currentIndex === questions.length - 1} // show Submit on last
        />
      </div>
    </div>
  );
}

export default Quiz;
