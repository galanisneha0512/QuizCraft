import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/upload/TextInput";
import FileUpload from "../components/upload/FileUpload";
import QuizSettings from "../components/upload/QuizSettings";
import { generateQuiz } from "../api/quizApi"; // import API call
import { parseQuiz } from "../utils/parseQuiz"; // import parser

function Upload() {
  const navigate = useNavigate();

  // Study material text
  const [text, setText] = useState("");

  // Quiz Configuration
  const [settings, setSettings] = useState({
    numQuestions: 5,
    questionTypes: ["mcq"],
    difficulty: "medium",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // When file is uploaded, populate the textarea with its content
  const handleFileRead = (content) => {
    setText(content);
  };

  const handleSubmit = async () => {
    setError("");

    // Basic validation
    if (!text.trim) {
      setError("Please paste your notes or upload a file.");
      return;
    }
    if (settings.questionTypes.length === 0) {
      setError("Please select atleast one question type.");
      return;
    }

    setLoading(true);

    try {
      //  Call to API
      const rawQuestions = await generateQuiz(text, settings);

      // Clean and validate the questions
      const questions = parseQuiz(rawQuestions);

      if (questions.length === 0) {
        setError(
          "AI could not generate questions. Please try different content.",
        );
        return;
      }

      // Save questions to sessionStorage so Quiz page can access them
      // We use sessionStorage because this data only needs to live for one session

      sessionStorage.setItem("quizQuestions", JSON.stringify(questions));

      // Navigate to quiz page
      navigate("/quiz");
    } catch (err) {
      setError(
        "Failed to generate quiz. Please check your connection and try again.",
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-indigo-600 text-center">
          Create Your Quiz
        </h2>

        {/* Text input */}
        <TextInput value={text} onChange={setText} />

        {/* Divider */}
        <div className="flex items-center gap-4">
          <hr className="flex-1 border-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* File upload */}
        <FileUpload onFileRead={handleFileRead} />

        {/* Quiz settings */}
        <QuizSettings settings={settings} onChange={setSettings} />

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium"
        >
          {loading ? "Generating Quiz..." : "Generate Quiz"}
        </button>
      </div>
    </div>
  );
}

export default Upload;
