import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-indigo-600">
        QuizCraft
      </Link>

      {/* Links */}
      <div className="flex gap-6 items-center">
        {user ? (
          // Logged in links
          <>
            <Link to="/upload" className="text-gray-600 hover:text-indigo-600">
              Create Quiz
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-indigo-600"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Logout
            </button>
          </>
        ) : (
          // Logged out links
          <>
            <Link to="/login" className="text-gray-600 hover:text-indigo-600">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
