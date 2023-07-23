import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../middleware/apiLogin.js";
import useSession from "../../middleware/session.js";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Initialize the useSession hook
  const { login: sessionLogin, error: sessionError } = useSession();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from the api file
      const response = await login({ username, password });

      // Login successful, set user session using the useSession hook
      sessionLogin({ user: response.user, token: response.token });

      setError(""); // Clear any previous errors on successful login
      navigate("/"); // Redirect to home or protected route
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  // Show session-level or API login errors
  const errorMessage = error || sessionError;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
          <h2 className="text-2xl text-center mb-6">Login</h2>
          {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
