// Shows how far the user is in the quiz
// e.g. Question 3 of 10 -> 30% filled bar

function ProgressBar({ current, total }) {
  // Calculate percentage completed
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full flex flex-col gap-1">
      {/* Question count text */}
      <div className="flex justify-between text-sm text-gray-500">
        <span>
          Question {current} of {total}
        </span>
        <span>{percentage}% complete</span>
      </div>

      {/* Progress bar track */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        {/* Filled portion */}
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
