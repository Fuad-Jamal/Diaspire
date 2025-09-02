import React, { useState } from 'react';


// A simple form component for creating a user account with a password.
const CreatePasswordForm = () => {
  // State to hold all form data.
  const [formData, setFormData] = useState({
    name: '', // Added 'name' field
    email: '',
    password: '',
    confirmPassword: '',
    linkedinUrl: '',
    bio: '',
  });

  // State for form submission status, success, and errors.
  const [status, setStatus] = useState({
    message: '',
    type: '', // 'success' or 'error'
  });

  // A generic change handler for all form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // The form submission handler.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset status message
    setStatus({ message: '', type: '' });

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setStatus({ message: 'Passwords do not match. Please try again.', type: 'error' });
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setStatus({ message: 'Name, email, and password are required fields.', type: 'error' });
      return;
    }

    // In a real application, you would send this data to an API.
    console.log("Profile Creation Data Submitted:", formData);

    // Set submitted state to true to show a success message.
    setStatus({ message: 'Profile created successfully!', type: 'success' });
    // Optionally reset the form after submission
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      linkedinUrl: '',
      bio: '',
    });
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
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePasswordForm;
