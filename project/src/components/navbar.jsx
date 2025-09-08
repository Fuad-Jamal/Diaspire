import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuthPopup from '../utilities/auth';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [authMode, setAuthMode] = useState("signup");

  const navigate = useNavigate();

  const handleSignIn = (user) => {
    console.log("User signed in:", user);
    setShowAuthPopup(false);

    const role = localStorage.getItem("userRole");

    if (role === 'youth') {
      navigate('/mprofile'); // mentee
    } else if (role === 'professional') {
      navigate('/mentor-dashboard'); // mentor
    } else {
      navigate('/mentees'); // fallback
    }
  };

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <>
      <header className="bg-white backdrop-blur-lg shadow-sm sticky top-0 z-40 rounded-b-xl">
        <nav className="container mx-auto px-6 flex justify-between items-center">
          <a href="/" onClick={() => onNavigate?.('home')} className="flex items-center">
            <img className="w-[150px] lg:w-[234px] rounded" src="./src/assets/logo.webp" alt="Diaspire Logo" />
          </a>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/">Home</Link>
            <Link to="/mentors">Find Mentors</Link>
            <Link to="/events">Events</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/resources">Resources</Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {/* LOGIN button */}
            <button
              className="px-4 py-2 text-neutral-600 font-medium rounded-lg hover:bg-neutral-100"
              onClick={() => {
                const role = localStorage.getItem("userRole");
                setSelectedRole(role);
                setAuthMode("login");
                setShowAuthPopup(true);
              }}
            >
              Login
            </button>

            {/* SIGNUP button */}
            <button
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
              onClick={() => setShowRolePopup(true)}
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Role selector popup for signup */}
      {showRolePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h2 className="text-xl font-bold text-center mb-4">Select Your Role</h2>
            <div className="flex flex-col gap-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => {
                  localStorage.setItem("userRole", "youth");
                  setSelectedRole('youth');
                  setAuthMode("signup");
                  setShowRolePopup(false);
                  setShowAuthPopup(true);
                }}
              >
                Join as Youth
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={() => {
                  localStorage.setItem("userRole", "professional");
                  setSelectedRole('professional');
                  setAuthMode("signup");
                  setShowRolePopup(false);
                  setShowAuthPopup(true);
                }}
              >
                Join as Professional
              </button>
            </div>
            <button
              className="mt-4 w-full bg-gray-300 py-2 rounded"
              onClick={() => setShowRolePopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Auth popup */}
      {showAuthPopup && (
        <GoogleAuthPopup
          mode={authMode}
          onClose={() => setShowAuthPopup(false)}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />
      )}
    </>
  );
};

export default Navbar;
