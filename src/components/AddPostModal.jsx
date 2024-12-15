import { useState } from "react";
import { useFirebase } from "../context/firebase";
import Loader from "./common/loader";

function AddPostModal({ closeModal, onAddPost }) {
  const { user, handleNewPost } = useFirebase(); // Access user from context
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [loading, setLoading] = useState(false); // State to handle the loader

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Show loader while posting
    await handleNewPost(newsTitle, newsDescription);
    setLoading(false); // Hide loader after post is added

    // Refresh the page to reload the posts
    window.location.href = `/profile/${user.uid}`; // Redirect to the profile page
    window.location.reload(); // Reload the page at the new location
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      {loading && <Loader />} {/* Show loader while data is loading */}
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              News Title
            </label>
            <input
              type="text"
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the news title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">
              News Description
            </label>
            <textarea
              value={newsDescription}
              onChange={(e) => setNewsDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Write a description for the news..."
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPostModal;
