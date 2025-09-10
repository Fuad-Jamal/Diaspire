import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// A simple confirmation popup component
const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <p className="text-lg font-semibold mb-4 text-gray-800">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
          >
            Stay
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const Logoutnavbar = ({ onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // New state for logout popup

  const navigate = useNavigate();

  const handleSignOut = () => {
    // This function now handles the navigation after user confirmation
    setShowLogoutConfirmation(false);
    navigate('/');
  };
  
  const cancelLogout = () => {
    // This function simply closes the popup
    setShowLogoutConfirmation(false);
  };

  // Optional: prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="flex justify-between items-center px-6 lg:px-24 py-6 bg-[#002F6C]">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {/* Logo */}
          <h1 className="text-white text-2xl font-bold tracking-wide pr-48">DIASPIRE</h1>
        
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 text-[#1F1F1F] font-inter text-sm pr-40">
            <Link to="/" className="text-white hover:text-[#FDCB58] transition">Home</Link>
            <Link to="/mentors" className="text-white hover:text-[#FDCB58] transition">Find Mentors</Link>
            <Link to="/events" className="text-white hover:text-[#FDCB58] transition">Events</Link>
            <Link to="/jobs" className="text-white hover:text-[#FDCB58] transition">Jobs</Link>
            <Link to="/resources" className="text-white hover:text-[#FDCB58] transition">Resources</Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* The Logout button has been updated to open the confirmation popup */}
            <Link 
              to="/" 
              onClick={(e) => {
                e.preventDefault(); // Prevents immediate navigation
                setShowLogoutConfirmation(true);
              }}
              className="px-4 py-2 text-white font-medium rounded-full border border-gray-300 hover:bg-yellow-400 transition"
            >
              LogOut
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#002F6C] z-50 flex flex-col px-6 py-8 space-y-6 shadow-lg transition-all duration-300">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="self-end text-white text-2xl"
          >
            ✕
          </button>

          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold hover:text-[#FDCB58]">Home</Link>
          <Link to="/mentors" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold hover:text-[#FDCB58]">Find Mentors</Link>
          <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold hover:text-[#FDCB58]">Events</Link>
          <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold hover:text-[#FDCB58]">Jobs</Link>
          <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-semibold hover:text-[#FDCB58]">Resources</Link>
          
          {/* Mobile Logout Button */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              setShowLogoutConfirmation(true);
              setIsMobileMenuOpen(false);
            }}
            className="px-4 py-2 text-white font-medium rounded-full border border-gray-300 hover:bg-yellow-400 transition"
          >
            LogOut
          </Link>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to log out?"
          onConfirm={handleSignOut}
          onCancel={cancelLogout}
        />
      )}
    </>
  );
};

export default Logoutnavbar;
