// Shows the final score and a motivational quote based on performance

function ScoreCard({ score, total }) {
  // Calculate percentage
  const percentage = Math.round((score / total) * 100);

  // Quote and color based on score range
  const getFeedback = () => {
    if (percentage <= 40) {
      return {
        quote: "Every expert was once a beginner. Keep going!",
        sub: "Review the answers below and try again.",
        color: "text-red-500",
        bg: "bg-red-50",
        border: "border-red-200",
      };
    } else if (percentage <= 70) {
      return {
        quote: "Good effort! You're getting there.",
        sub: "A little more practice and you'll nail it.",
        color: "text-yellow-500",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
      };
    } else {
      return {
        quote: "Excellent work! You've mastered this topic.",
        sub: "Keep up the great work!",
        color: "text-green-500",
        bg: "bg-green-50",
        border: "border-green-200",
      };
    }
  };

  const feedback = getFeedback();

  return (
    <div
      className={`rounded-xl border p-6 text-center ${feedback.bg} ${feedback.border}`}
    >
      {/* Score display */}
      <h2 className={`text-5xl font-bold mb-2 ${feedback.color}`}>
        {score} / {total}
      </h2>

      <p className="text-gray-500 text-sm mb-4">{percentage}% correct</p>

      {/* Quote */}
      <p className={`text-lg font-medium ${feedback.color}`}>
        "{feedback.quote}"
      </p>
      <p className="text-gray-500 text-sm mt-1">{feedback.sub}</p>
    </div>
  );
}

export default ScoreCard;
