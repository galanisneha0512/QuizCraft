// This utility function cleans and validates the questions array
// returned by Gemini before we use it in the Quiz page
// Sometimes AI returns slightly inconsistent data — this fixes that

export const parseQuiz = (questions) => {
  // Filter out any question that doesn't have a type or question text
  const validQuestions = questions.filter(
    (question) => question.type && (question.question || question.questions),
  );

  // Normalize each question to make sure all fields exist
  return validQuestions.map((q) => {
    // For MCQ - make sure options array exists
    if (q.type === "mcq") {
      return {
        type: "mcq",
        question: q.question || q.questions,
        options: q.options || [], // fallback to empty array if missing
        answer: q.answer || "",
      };
    }

    // For True/False — normalize answer to "True" or "False"
    if (q.type === "true_false") {
      return {
        type: "true_false",
        question: q.question || q.questions,
        answer: q.answer || "True",
      };
    }

    // For Short Answer
    if (q.type === "short_answer") {
      return {
        type: "short_answer",
        question: q.question || q.questions,
        answer: q.answer,
      };
    }

    // Return as is if type is unknown
    return q;
  });
};
