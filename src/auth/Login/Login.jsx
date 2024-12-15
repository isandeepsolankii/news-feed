import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import Loader from "../../components/common/loader";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { LoginWithEmailAndPassword, user } = useFirebase();
  const navigate = useNavigate();

  // Redirect when user is authenticated
  useEffect(() => {
    if (user) {
      navigate("/feed"); // Navigate to the /feed route when the user is logged in
    }
  }, [user, navigate]); // Only trigger when 'user' changes

  async function handleOnLogIn(event) {
    event.preventDefault();
    setLoading(true);
    await LoginWithEmailAndPassword(email, password);
    setLoading(false); // Stop loading once login attempt is made
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div>{loading && <Loader />}</div>
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring"
            onClick={handleOnLogIn}
          >
            Login
          </button>
        </form>
        <button className="w-full bg-red-500 text-white py-2 mt-4  rounded shadow-md hover:bg-red-600 focus:outline-none focus:ring">
          Login with Google
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
