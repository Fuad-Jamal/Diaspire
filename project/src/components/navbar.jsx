import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuthPopup from '../utilities/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showRolePopup, setShowRolePopup] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [authMode, setAuthMode] = useState("signup");

  const navigate = useNavigate();

  const handleSignIn = async (user) => {
    setShowAuthPopup(false);

    const role = localStorage.getItem("userRole");
    if (!role || !user?.email) {
      navigate('/mentees');
      return;
    }

    const collectionName = role === "professional" ? "mentors" : "mentees";
    const q = query(collection(db, collectionName), where("email", "==", user.email));
    const snapshot = await getDocs(q);

   if (!snapshot.empty) {
  const docId = snapshot.docs[0].id;
  const docData = snapshot.docs[0].data();

  localStorage.setItem("mentorId", docId);

  const hasProfile = docData.bio && docData.linkedinUrl;

  if (role === "professional") {
    navigate(hasProfile ? "/mentor-dashboard" : "/profile");
  } else {
    navigate("/dashboard");
  }
} else {
  // New user — route to profile creation
  if (role === "professional") {
    navigate("/profile");
  } else {
    navigate("/mprofile");
  }
}


  };

  const handleSignOut = () => {
    localStorage.removeItem("mentorId");
    localStorage.removeItem("menteeId");
    localStorage.removeItem("userRole");
    navigate('/');
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="flex justify-between items-center px-6 lg:px-24 py-6 bg-[#002F6C] sticky top-0 z-50">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <h1 className="text-white text-2xl font-bold tracking-wide pr-48">DIASPIRE</h1>

          <div className="hidden md:flex items-center space-x-6 text-white pr-40">
            <Link to="/" className="hover:text-[#FDCB58] transition">Home</Link>
            <Link to="/mentors" className="hover:text-[#FDCB58] transition">Find Mentors</Link>
            <Link to="/events" className="hover:text-[#FDCB58] transition">Events</Link>
            <Link to="/jobs" className="hover:text-[#FDCB58] transition">Jobs</Link>
            <Link to="/resources" className="hover:text-[#FDCB58] transition">Resources</Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <button
              className="px-4 py-2 text-white font-medium rounded-full border border-gray-300 hover:bg-gray-100 transition"
              onClick={() => {
                localStorage.removeItem("userRole");
                setSelectedRole(null);
                setAuthMode("login");
                setShowAuthPopup(true); // ✅ Login opens auth directly
              }}
            >
              Login
            </button>

            <button
              className="bg-[#FDCB58] text-[#002F6C] px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform"
              onClick={() => {
                localStorage.removeItem("userRole");
                setSelectedRole(null);
                setAuthMode("signup");
                setShowRolePopup(true); // ✅ Signup opens role selection
              }}
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Role Selection Popup */}
      {showRolePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h2 className="text-xl font-bold text-center mb-4">Select Your Role</h2>
            <div className="flex flex-col gap-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => {
                  localStorage.setItem("userRole", "youth");
                  setSelectedRole("youth");
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
                  setSelectedRole("professional");
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
