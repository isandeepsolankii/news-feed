import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/common/loader";

function EditProfilePage() {
  const { user, Logout, getUserPosts, handleEditUserDetails } = useFirebase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State to handle the loader

  // Redirect to /feed if user is null
  useEffect(() => {
    if (!user) {
      navigate("/feed");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    fullName: user?.displayName,
    dateOfBirth: "",
    email: user?.email || "",
    phoneNumber: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      fullName: user?.displayName,
      dateOfBirth: "",
      email: user?.email || "",
      phoneNumber: "",
      bio: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    setLoading(true); // Show loader while posting
    await handleEditUserDetails(
      formData.dateOfBirth,
      formData.fullName,
      formData.phoneNumber,
      formData.bio
    );
    setLoading(false); // Hide loader after post is added

    // Refresh the page to reload the posts
    window.location.href = `/feed`; // Redirect to the profile page
    window.location.reload(); // Reload the page at the new location
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {loading && <Loader />} {/* Show loader while data is loading */}
      <header className="bg-blue-500 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Container - Form */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Edit Your Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                disabled
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Bio
              </label>
              <textarea
                rows="5"
                cols="50"
                placeholder="Enter Your Bio"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formData.bio}
              </textarea>
            </div>

            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-2 rounded shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Right Container - Preview */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="space-y-4">
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="Profile"
                className="w-20 h-20 rounded-full mt-2"
              />
            </div>
            <p className="text-gray-700">
              <strong>Full Name:</strong> {formData.fullName || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Date of Birth:</strong> {formData.dateOfBirth || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Email ID:</strong> {formData.email || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Phone Number:</strong> {formData.phoneNumber || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Bio:</strong> {formData.bio || "N/A"}
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default EditProfilePage;
