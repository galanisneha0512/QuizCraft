import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        Welcome to QuizCraft
      </h1>
      <p className="text-gray-600 text-lg max-w-xl mb-8">
        Upload your study notes and let AI generate a quiz for you instantly.
        Practice smarter, not harder.
      </p>

      <div className="flex gap-4">
        <Link
          to="/signup"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
