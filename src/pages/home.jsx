import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My App</h1>
          <nav>
            <Link to="/login" className="text-white hover:underline mr-4">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:underline">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Welcome to My App</h2>
          <p className="text-gray-700 mb-8">
            Discover the best features and services tailored for you. Sign up
            today and explore the amazing possibilities.
          </p>
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring"
          >
            Get Started
          </Link>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-2">Feature 1</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
              sapien elit.
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-2">Feature 2</h3>
            <p className="text-gray-700">
              Nullam tristique tortor eget nisi consequat, sed viverra ligula
              dapibus.
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-2">Feature 3</h3>
            <p className="text-gray-700">
              Integer cursus nisl vel lectus tristique, in sodales massa
              malesuada.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
