// src/components/Feed.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Loader from "../components/common/loader";
import initialPosts from "../data/posts"; // Import the initial posts
import AddPostModal from "../components/AddPostModal";

function Feed() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(initialPosts || []); // Initialize posts from imported data
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, Logout } = useFirebase(null);
  const navigate = useNavigate();

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, [user, navigate]);

  async function handleLogout() {
    setLoading(true);
    await Logout();
    navigate("/"); // Navigate to login after logout
    setLoading(false);
  }

  // Function to toggle the followed state of a post
  function toggleFollow(postId) {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, followed: !post.followed } // Toggle follow state
          : post
      )
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div>{loading && <Loader />}</div>
      <header className="bg-blue-500 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/feed">My App</Link>
          </h1>

          <button onClick={toggleModal} type="button">
            {/* Round "+" on mobile */}
            <span className="flex items-center justify-center w-8 h-8 md:hidden text-lg font-bold bg-gray-200 text-gray-900 rounded-full dark:bg-gray-700 dark:text-white">
              +
            </span>
            {/* "Add Post" on md and larger */}
            <span className="hidden md:block  items-center justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Add Post
            </span>
          </button>

          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleDropdown}
            >
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">
                {user ? user.displayName : "Guest"}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
                <Link
                  to={`/profile/${user.uid}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <Link
                  to={`/edit/${user.uid}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 flex-grow">
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Welcome to My App {user ? user.displayName : "Guest"}
          </h2>
          <p className="text-gray-700 mb-8">
            Discover the best features and services tailored for you. Sign up
            today and explore the amazing possibilities.
          </p>
        </section>

        <section className="mt-16 space-y-6 max-w-4xl mx-auto">
          {" "}
          {/* Adjust width and center */}
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={post.userAvatar}
                    alt={post.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold">{post.username}</span>
                </div>
                <button
                  onClick={() => toggleFollow(post.id)}
                  className={`${
                    post.followed
                      ? "bg-white text-blue-500 border border-blue-500"
                      : "bg-blue-500 text-white"
                  } px-4 py-1 text-sm rounded hover:bg-blue-600`}
                >
                  {post.followed ? "Unfollow" : "Follow"}
                </button>
              </div>

              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover  mb-4"
              />

              <div className="flex space-x-4">
                <button>❤️ Likes</button>
                <button>💬 Comments</button>
              </div>

              <p className="text-gray-700 mt-4">
                <strong>{post.username}</strong> {post.caption}
              </p>
            </div>
          ))}
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </div>
      </footer>
      {isModalOpen && (
        <AddPostModal
          closeModal={toggleModal}
          onAddPost={(newPost) => {
            // Update posts state to include the new post
            setPosts((prevPosts) => [newPost, ...prevPosts]);
          }}
        />
      )}
    </div>
  );
}

export default Feed;
