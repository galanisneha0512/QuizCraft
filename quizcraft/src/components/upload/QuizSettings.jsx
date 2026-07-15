// Controls for number of questions, question types, and difficulty

function QuizSettings({ settings, onChange }) {
  // Generic handler — updates only the changed field
  const handleChange = (field, value) => {
    onChange({ ...settings, [field]: value });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Number of questions */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Number of Questions: {settings.numQuestions}
        </label>
        <input
          type="range"
          min={3}
          max={20}
          value={settings.numQuestions}
          onChange={(e) =>
            handleChange("numQuestions", parseInt(e.target.value))
          }
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>3</span>
          <span>20</span>
        </div>
      </div>

      {/* Question types */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Question Types
        </label>
        <div className="flex gap-4 flex-wrap">
          {["mcq", "true_false", "short_answer"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={settings.questionTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleChange("questionTypes", [
                      ...settings.questionTypes,
                      type,
                    ]);
                  } else {
                    handleChange(
                      "questionTypes",
                      settings.questionTypes.filter((t) => t !== type),
                    );
                  }
                }}
                className="accent-indigo-600"
              ></input>
              {type === "mcq" && "MCQ"}
              {type === "true_false" && "True / False"}
              {type === "short_answer" && "Short Answer"}
            </label>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Difficulty</label>
        <div className="flex gap-3">
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleChange("difficulty", level)}
              className={`px-4 py-2 rounded-lg text-sm capitalize border transition-all
                ${settings.difficulty === level ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizSettings;
