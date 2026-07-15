// Single option button used in MCQ and True/False questions
// Changes appearance based on whether it is selected

function OptionButton({ label, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all
        ${
          isSelected
            ? "bg-indigo-600 text-white border-indigo-600" // selected state
            : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400" // default state
        }`}
    >
      {label}
    </button>
  );
}

export default OptionButton;
