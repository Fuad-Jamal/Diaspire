import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const CreatePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    linkedinUrl: '',
    bio: '',
    schedule: '',
    imgFile: null
  });

  const [status, setStatus] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, imgFile: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: '', type: '' });

    const { firstName, lastName, email, password, confirmPassword, linkedinUrl, bio } = formData;

    if (password !== confirmPassword) {
      setStatus({ message: 'Passwords do not match.', type: 'error' });
      setLoading(false);
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setStatus({ message: 'Name, email, and password are required.', type: 'error' });
      setLoading(false);
      return;
    }

    if (!linkedinUrl || !bio) {
      setStatus({ message: 'LinkedIn and bio are required.', type: 'error' });
      setLoading(false);
      return;
    }

    const capitalize = str =>
      str.trim().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');

    const formattedFirstName = capitalize(firstName);
    const formattedLastName = capitalize(lastName);
    const fullName = `${formattedFirstName} ${formattedLastName}`;
    const user = auth.currentUser;

    if (!user) {
      setStatus({ message: 'You must be signed in to create a profile.', type: 'error' });
      setLoading(false);
      return;
    }

    localStorage.setItem("userName", fullName);
    localStorage.setItem("userFirstName", formattedFirstName);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userLinkedIn", linkedinUrl);
    localStorage.setItem("userBio", bio);
    localStorage.setItem("mentorId", user.uid);
    localStorage.setItem("userRole", "professional");

    try {
      await setDoc(doc(db, "mentors", user.uid), {
        name: fullName,
        email: user.email,
        linkedinUrl,
        bio,
        img: "/default-avatar.png", // You can replace this with uploaded image logic later
        title: "Mentor",
        category: "General",
        socials: {
          linkedin: linkedinUrl,
          twitter: "",
          instagram: "",
          github: "",
        },
        createdAt: new Date()
      });

      await fetch("http://localhost:5000/send-mentor-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email: user.email })
      });

      setStatus({ message: 'Profile created successfully!', type: 'success' });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        linkedinUrl: '',
        bio: '',
        schedule: '',
        imgFile: null
      });

      setTimeout(() => navigate("/mentor-dashboard"), 2000);
    } catch (error) {
      console.error("Error creating profile:", error);
      setStatus({ message: 'Something went wrong. Please try again.', type: 'error' });
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Profile</h2>

        {status.message && (
          <div className={`mb-4 px-4 py-3 rounded-md text-center ${
            status.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-700'
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {["firstName", "lastName", "email", "password", "confirmPassword", "linkedinUrl"].map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field === "linkedinUrl" ? "LinkedIn Profile URL" : field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          ))}

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio / About Me</label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a little about yourself..."
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">My Availability</label>
            <textarea
              id="schedule"
              name="schedule"
              rows="4"
              value={formData.schedule}
              onChange={handleChange}
              placeholder="e.g: 2 hours a week"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div>
            <label htmlFor="imgFile" className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
            <input
              type="file"
              id="imgFile"
              name="imgFile"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
            >
              {loading ? 'Creating...' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
