import { useState, useEffect } from 'react';
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

    if (selectedRole === 'youth') {
      navigate('/mprofile');
    } else if (selectedRole === 'professional') {
      navigate('/profile');
    } else {
      navigate('/mentees');
    }
  };

  const handleSignOut = () => {
    navigate('/');
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
            <button
              className="px-4 py-2 text-white font-medium rounded-full border border-gray-300 hover:bg-gray-100 transition"
              onClick={() => {
                const role = localStorage.getItem("userRole");
                setSelectedRole(role);
                setAuthMode("login");
                setShowAuthPopup(true);
              }}
            >
              Login
            </button>
            <button
              className="bg-[#FDCB58] text-[#002F6C] px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform"
              onClick={() => setShowRolePopup(true)}
            >
              Get Started
            </button>
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

    <button
      className="px-4 py-2 bg-white text-[#002F6C] rounded-full font-semibold hover:bg-[#FDCB58] transition"
      onClick={() => {
        setSelectedRole(null);
        setAuthMode("login");
        setShowAuthPopup(true);
        setIsMobileMenuOpen(false);
      }}
    >
      Login
    </button>

    <button
      className="px-4 py-2 bg-[#FDCB58] text-[#002F6C] rounded-full font-bold hover:scale-105 transition-transform"
      onClick={() => {
        setShowRolePopup(true);
        setIsMobileMenuOpen(false);
      }}
    >
      Get Started
    </button>
  </div>
)}

{/* Role Selector Popup */}
{showRolePopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[350px]">
      <h2 className="text-xl font-bold text-center mb-4 text-[#002F6C]">Select Your Role</h2>
      <div className="flex flex-col gap-4">
        <button
          className="px-4 py-2 bg-[#FDCB58] text-[#002F6C] rounded-full font-bold hover:scale-105 transition-transform"
          onClick={() => {
            setSelectedRole('youth');
            setAuthMode("signup");
            setShowRolePopup(false);
            setShowAuthPopup(true);
          }}
        >
          Join as Youth
        </button>
        <button
          className="px-4 py-2 bg-[#002F6C] text-white rounded-full font-semibold hover:bg-[#001a3d] transition"
          onClick={() => {
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
        className="mt-4 w-full bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
        onClick={() => setShowRolePopup(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}


      {/* Auth Popup */}
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
