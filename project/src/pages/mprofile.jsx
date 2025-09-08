import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc } from "firebase/firestore";

const CreateMenteeProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mentorshipGoals: '',
    skillsToLearn: '',
  });

  const [status, setStatus] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: '', type: '' });

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setStatus({ message: 'Passwords do not match. Please try again.', type: 'error' });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.mentorshipGoals) {
      setStatus({ message: 'All fields are required.', type: 'error' });
      return;
    }

    // Format name
    const capitalize = str =>
      str.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    const formattedFirstName = capitalize(formData.firstName);
    const formattedLastName = capitalize(formData.lastName);
    const fullName = `${formattedFirstName} ${formattedLastName}`;

    // Save to localStorage
    localStorage.setItem("menteeFullName", fullName);
    localStorage.setItem("menteeFirstName", formattedFirstName);
    localStorage.setItem("menteeEmail", formData.email);
    localStorage.setItem("menteeGoals", formData.mentorshipGoals);
    localStorage.setItem("menteeSkills", formData.skillsToLearn);

    try {
      // Save to Firestore
      await addDoc(collection(db, "mentees"), {
        name: fullName,
        email: formData.email,
        mentorshipGoals: formData.mentorshipGoals,
        skillsToLearn: formData.skillsToLearn,
        createdAt: new Date()
      });

      // Send welcome email
      await fetch("http://localhost:5000/send-welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email: formData.email })
      });

      setStatus({ message: 'Mentee profile created successfully!', type: 'success' });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mentorshipGoals: '',
        skillsToLearn: '',
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error saving mentee:", error);
      setStatus({ message: 'Something went wrong. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Mentee Profile</h2>

        {status.message && (
          <div className={`mb-4 px-4 py-3 rounded-md text-center ${status.type === 'success' ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            <span className="block sm:inline">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          {/* Mentorship Goals */}
          <div>
            <label htmlFor="mentorshipGoals" className="block text-sm font-medium text-gray-700">Mentorship Goals</label>
            <textarea
              id="mentorshipGoals"
              name="mentorshipGoals"
              rows="4"
              value={formData.mentorshipGoals}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            ></textarea>
          </div>

          {/* Skills to Learn */}
          <div>
            <label htmlFor="skillsToLearn" className="block text-sm font-medium text-gray-700">Skills to Learn</label>
            <textarea
              id="skillsToLearn"
              name="skillsToLearn"
              rows="2"
              value={formData.skillsToLearn}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
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
