import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./auth/Login/Login";
import SignupPage from "./auth/Signup/SignUp";
import HomePage from "./pages/home";
import Feed from "./pages/feed";
import Profile from "./pages/profile"; // Import the Profile component
import EditProfilePage from "./pages/editProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile/:uid" element={<Profile />} />
        <Route path="edit/:uid" element={<EditProfilePage />} />
        {/* Dynamic route for user profile */}
      </Routes>
    </Router>
  );
}

export default App;
