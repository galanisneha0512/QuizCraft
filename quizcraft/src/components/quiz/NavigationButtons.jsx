// Previous, Next, and Submit buttons for navigating between questions

function NavigationButtons({ onPrev, onNext, onSubmit, isFirst, isLast }) {
  return (
    <div className="flex justify-between items-center mt-6">
      {/* Previous button - disabled on first question */}
      <button
        onClick={onPrev}
        disabled={isFirst}
        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:border-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ← Previous
      </button>

      {/* Next or Submit button depending on position */}
      {isLast ? (
        // Show Submit on last question
        <button
          onClick={onSubmit}
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          Submit Quiz
        </button>
      ) : (
        // Show Next on all other questions
        <button
          onClick={onNext}
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          Next →
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
