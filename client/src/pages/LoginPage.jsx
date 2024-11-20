import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../services/merchant.service";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      username,
      password,
    };
    const response = await Login(loginData);
    console.log("response:", response);

    if (response.status === 200) {
      const id = response?.data?.data?.merchant_id;
      navigate(`/home/${id}`); // Navigate to the HomePage on successful login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/img/chai.jpg')", // Replace with your image path
      }}
    >
      {/* Tea Logo */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/img/tealogo.jpg" // Replace with your logo path
          alt="Tea Logo"
          className="w-24 h-24 rounded-full shadow-lg"
        />
        {/* Chai Coffee Label */}
        {/* <h2 className="text-lg font-semibold text-white mt-2 shadow-md">
          Chai Coffee
        </h2> */}
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-xl p-6 w-11/12 max-w-sm shadow-lg"
        style={{ opacity: 0.9 }} // Reduced opacity for translucency
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Login
        </h1>

        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        {/* Username Input */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your username"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
