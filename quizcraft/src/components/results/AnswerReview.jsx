// Shows each question with:
// - User's selected answer
// - Correct answer
// - Bookmark button to save the question

function AnswerReview({ questions, userAnswers, bookmarked, onBookmark }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-700">Review Answers</h3>
      {questions.map((question, index) => {
        const userAnswer = userAnswers[index] || "Not answered";
        const isCorrect =
          userAnswer.trim().toLowerCase() ===
          question.answer.trim().toLowerCase();

        const isBookmarked = bookmarked.includes(index);

        return (
          <div
            key={index}
            className={`rounded-xl border p-5 flex flex-col gap-3
              ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            {/* Question header — number, correct/wrong, bookmark */}
            <div className="flex justify-between items-start gap-2">
              <p className="text-sm font-medium text-gray-800">
                {index + 1}. {question.question}
              </p>

              {/* Bookmark button */}
              <button
                onClick={() => onBookmark(index)}
                title={isBookmarked ? "Remove bookmark" : "Save question"}
                className="text-lg shrink-0"
              >
                {isBookmarked ? "🔖" : "🏷️"}
              </button>
            </div>

            {/* User's answer */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Your answer:</span>
              <span
                className={`font-medium ${isCorrect ? "text-green-600" : "text-red-500"}`}
              >
                {userAnswer}
              </span>
              <span>{isCorrect ? "✅" : "❌"}</span>
            </div>

            {/* Correct answer — only show if wrong */}
            {!isCorrect && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Correct answer:</span>
                <span className="font-medium text-green-600">
                  {question.answer}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AnswerReview;
