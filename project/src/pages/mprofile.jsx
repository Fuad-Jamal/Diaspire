import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

// A form component for creating a mentee profile.
const CreateMenteeProfileForm = () => {
  // State to hold all form data.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mentorshipGoals: '',
    skillsToLearn: '',
  });

    const navigate = useNavigate()
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
  setStatus({ message: '', type: '' });

  if (formData.password !== formData.confirmPassword) {
    setStatus({ message: 'Passwords do not match. Please try again.', type: 'error' });
    return;
  }

  if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.mentorshipGoals) {
    setStatus({ message: 'All fields are required.', type: 'error' });
    return;
  }

  console.log("Mentee Profile Creation Data Submitted:", formData);

  // Send welcome email
  fetch("http://localhost:5000/send-welcome-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Email sent:", data.message);
  })
  .catch(err => {
    console.error("Email error:", err);
  });

  setStatus({ message: 'Mentee profile created successfully!', type: 'success' });

  setFormData({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mentorshipGoals: '',
    skillsToLearn: '',
  });

  setTimeout(() => {
    navigate("/dashboard");
  }, 2000);
};


  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Mentee Profile</h2>
        
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

          {/* Mentorship Goals Textarea */}
          <div>
            <label htmlFor="mentorshipGoals" className="block text-sm font-medium text-gray-700">Your Mentorship Goals</label>
            <textarea
              id="mentorshipGoals"
              name="mentorshipGoals"
              rows="4"
              value={formData.mentorshipGoals}
              onChange={handleChange}
              placeholder="What do you hope to achieve with a mentor?"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            ></textarea>
          </div>

          {/* Skills to Learn Textarea */}
          <div>
            <label htmlFor="skillsToLearn" className="block text-sm font-medium text-gray-700">Skills you want to learn</label>
            <textarea
              id="skillsToLearn"
              name="skillsToLearn"
              rows="2"
              value={formData.skillsToLearn}
              onChange={handleChange}
              placeholder="e.g., Python, Public Speaking, Leadership"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
          
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Create Mentee Profile
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMenteeProfileForm;
