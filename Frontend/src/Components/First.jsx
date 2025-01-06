import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to Your Todo App!
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        Organize your tasks, boost your productivity, and stay on top of your goals.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Log In
        </button>
        <button
          onClick={handleSignup}
          className="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow hover:bg-gray-200 transition dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default First;
