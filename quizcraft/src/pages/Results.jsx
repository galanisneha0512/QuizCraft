import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreCard from "../components/results/ScoreCard";
import AnswerReview from "../components/results/AnswerReview";

function Results() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  // Bookmarked question indexes
  // We use localStorage for now - will replace with MySQL later
  const [bookmarked, setBookmarked] = useState(() => {
    const saved = localStorage.getItem("bookmarkedQuestions");
    return saved ? JSON.parse(saved) : [];
  });

  // Load questions and answers from sessionStorage
  useEffect(() => {
    const storedQuestions = sessionStorage.getItem("quizQuestions");
    const storedAnswers = sessionStorage.getItem("quizAnswers");

    // If either is missing, send back to upload
    if (!storedQuestions || !storedAnswers) {
      navigate("/upload");
      return;
    }
    setQuestions(JSON.parse(storedQuestions));
    setUserAnswers(JSON.parse(storedAnswers));
  }, [navigate]);

  // Calculate score
  // Compare user answer to correct answer (case insensitive)

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index] || "";
      if (
        userAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase()
      ) {
        correct++;
      }
    });
    return correct;
  };

  // Toggle bookmark for a question
  const handleBookmark = (index) => {
    setBookmarked((prev) => {
      let updated;

      if (prev.includes(index)) {
        // Remove bookmark if already saved
        updated = prev.filter((i) => i != index);
      } else {
        // Add bookmark
        updated = [...prev, index];
      }

      // Save to localStorage for now
      // Will be replaced with MySQL API call later
      localStorage.setItem("bookmarkedQuestions", JSON.stringify(updated));

      return updated;
    });
  };

  // Also save the actual question objects to localStorage when bookmarking
  // So we can show them on the Dashboard

  useEffect(() => {
    if (questions.length === 0) return;

    // Get existing saved questions from localStorage
    const existing = localStorage.getItem("savedQuestions");
    const savedQuestions = existing ? JSON.parse(existing) : [];

    // Build updated list of saved question objects based on bookmarked indexes
    const updatedSaved = bookmarked.map((index) => ({
      ...questions[index],
      savedAt: new Date().toISOString, // timestamp for when it was saved
    }));

    // Merge with existing saved questions avoiding duplicates by question text
    const merged = [
      ...savedQuestions.filter(
        (sq) => !updatedSaved.find((uq) => uq.question === sq.question),
        ...updatedSaved,
      ),
    ];

    localStorage.setItem("savedQuestions", JSON.stringify(merged));
  }, [bookmarked, questions]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading results...
      </div>
    );
  }

  const score = calculateScore();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-indigo-600 text-center">
          Quiz Results
        </h2>

        {/* Score and quote */}
        <ScoreCard score={score} total={questions.length} />

        {/* Answer review with bookmark option */}
        <AnswerReview
          questions={questions}
          userAnswers={userAnswers}
          bookmarked={bookmarked}
          onBookmark={handleBookmark}
        />

        {/* Action buttons */}
        <div className="flex gap-4 pb-10">
          <button
            onClick={() => navigate("/upload")}
            className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50"
          >
            Try Another Quiz
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
