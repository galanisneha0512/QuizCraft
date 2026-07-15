// Renders a single question based on its type
// Handles MCQ, True/False, and Short Answer differently

import OptionButton from "./OptionButton";

function QuestionCard({ question, questionNumber, userAnswer, onAnswer }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Question text */}
      <h3 className="text-lg font-medium text-gray-800">
        {questionNumber}. {question.question}
      </h3>

      {/* MCQ - show 4 options as buttons */}
      {question.type === "mcq" && (
        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              label={option}
              isSelected={userAnswer === option} // highlight if this option is selected
              onClick={() => onAnswer(option)} // save this option as the answer
            />
          ))}
        </div>
      )}

      {/* True / False - show only two buttons */}
      {question.type === "true_false" && (
        <div className="flex gap-4">
          {["True", "False"].map((option) => (
            <OptionButton
              key={option}
              label={option}
              isSelected={userAnswer === option}
              onClick={() => onAnswer(option)}
            />
          ))}
        </div>
      )}

      {/* Short Answer - show a text input */}
      {question.type === "short_answer" && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={userAnswer || ""}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
