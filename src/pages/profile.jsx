import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import AddPostModal from "../components/AddPostModal"; // Import the modal component
import Loader from "../components/common/loader";

function Profile() {
  const { user, Logout, getUserPosts } = useFirebase();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // State to handle the loader

  // Fetch posts when the component mounts, and user is available
  useEffect(() => {
    const fetchPosts = async () => {
      if (user) {
        setLoading(true); // Show loader while fetching posts
        const userPosts = await getUserPosts();
        setPosts(userPosts);
        setLoading(false); // Hide loader once posts are fetched
      }
    };

    fetchPosts();
  }, [user]); // Run only when 'user' changes (i.e., when logged in)

  // Redirect to login if user is not available
  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if no user is logged in
    }
  }, [user, navigate]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  async function handleLogout() {
    await Logout();
    navigate("/");
  }

  console.log(posts);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {loading && <Loader />} {/* Show loader when loading */}
      <header className="bg-blue-500 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My App</h1>
          <Link to="/feed">
            {/* Circular "Home" for mobile */}
            <span className="flex items-center justify-center w-12 h-12 md:hidden  font-medium text-xl bg-gray-200 text-gray-900 rounded-full dark:bg-gray-700 dark:text-white">
              🏠
            </span>
            {/* "Home" text for larger screens */}
            <span className="hidden md:block  items-center justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Home
            </span>
          </Link>

          <nav>
            <button
              className="w-full text-left px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500 transition-all duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10 flex-grow">
        {/* User Info Section */}
        <section className="bg-white shadow-md rounded p-6 mb-8 relative">
          <div className="flex items-center space-x-6">
            {/* User Profile Picture - Uncomment if you have profile images */}
            <img
              src={user?.photoURL || "default-profile-pic.png"}
              alt={user?.displayName}
              className="w-24 h-24 rounded-full"
            />
            <div>
              {/* Display user information only if 'user' is available */}
              {user ? (
                <>
                  <h2 className="text-3xl font-bold">{user.displayName}</h2>
                  <p className="text-gray-600">This is bio</p>
                  <div className="mt-4 flex space-x-6">
                    <div className="text-center">
                      {/* You can add followers/following stats here */}
                      <p className="text-sm text-gray-500">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Following</p>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
          </div>
          <Link to={user?.uid ? `/edit/${user.uid}` : "/feed"}>
            <button className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
              Edit Profile
            </button>
          </Link>

          {/* Add Post Button */}
          <button
            onClick={toggleModal}
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 absolute top-20 right-4 "
          >
            Add Post
          </button>
        </section>

        {/* User Posts Section */}
        <section className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Posts</h3>
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.uid} className="bg-white shadow-md rounded p-4">
                  <h3 className="text-xl font-semibold">{post.newsTitle}</h3>
                  <button className="">Delete</button>
                  <p className="text-gray-700 text-sm">
                    {post.newsDescription}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-500 text-xs">
                      {post.likes} Likes
                    </span>
                    <span className="text-gray-500 text-xs">
                      {post.comments} Comments
                    </span>
                  </div>
                  <small>
                    Created At: {new Date(post.createdAt).toLocaleString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </div>
      </footer>
      {/* Add Post Modal */}
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

export default Profile;
