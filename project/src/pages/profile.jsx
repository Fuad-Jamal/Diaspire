import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from "../firebase"
import { collection, addDoc } from "firebase/firestore"


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
  imgUrl: '',
  imgFile: null,
});


  const [status, setStatus] = useState({
    message: '',
    type: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imgFile: e.target.files[0] }));
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true);
    setStatus({ message: '', type: '' });

    
    if (formData.password !== formData.confirmPassword) {
      setStatus({ message: 'Passwords do not match. Please try again.', type: 'error' });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setStatus({ message: 'Name, email, and password are required fields.', type: 'error' });
      return;
    }

    if (!formData.linkedinUrl || !formData.bio) {
  setStatus({ message: 'Please provide your LinkedIn and a short bio.', type: 'error' });
  return;
}

try {
    const capitalize = str =>
      str
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    const formattedFirstName = capitalize(formData.firstName);
    const formattedLastName = capitalize(formData.lastName);
    const fullName = `${formattedFirstName} ${formattedLastName}`;

    localStorage.setItem("userName", fullName);
    localStorage.setItem("userFirstName", formattedFirstName);
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userLinkedIn", formData.linkedinUrl);
    localStorage.setItem("userBio", formData.bio);

    await addDoc(collection(db, "mentors"), {
      name: fullName,
      email: formData.email,
      linkedinUrl: formData.linkedinUrl,
      bio: formData.bio,
      img: formData.imgUrl || "/default-avatar.png",
      title: "Mentor",
      category: "General",
      socials: {
        linkedin: formData.linkedinUrl || "",
        twitter: "",
        instagram: "",
        github: "",
      },
    });

    await fetch("http://localhost:5000/send-mentor-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName, email: formData.email })
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
      imgUrl: '',
      imgFile: null,
    });

    setTimeout(() => {
      navigate("/mentor-dashboard");
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
    setStatus({ message: 'Something went wrong. Please try again.', type: 'error' });
  }

  setLoading(false);
};
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Profile</h2>

        {/* Conditional rendering for status messages */}
        {status.message && (
          <div className={`mb-4 px-4 py-3 rounded-md text-center ${status.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            <span className="block sm:inline">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Input */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* LinkedIn URL Input */}
          <div>
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">LinkedIn Profile URL</label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Bio/About Me Textarea */}
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
            ></textarea>
          </div>

          {/* Profile Image URL Input */}
              <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image (URL or Upload)
            </label>
            <input
              type="url"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="mt-1 block w-full px-4 py-2 border rounded-md mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-600"
            />
          </div>

          {/* Submit Button */}
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
