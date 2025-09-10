import React, { useState } from 'react';
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: '', type: '' });

    const {
      firstName, lastName, email, password, confirmPassword,
      mentorshipGoals, skillsToLearn
    } = formData;

    if (password !== confirmPassword) {
      setStatus({ message: 'Passwords do not match.', type: 'error' });
      setLoading(false);
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassword || !mentorshipGoals) {
      setStatus({ message: 'All fields are required.', type: 'error' });
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

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setStatus({ message: 'You must be signed in to create a profile.', type: 'error' });
      setLoading(false);
      return;
    }

    localStorage.setItem("menteeId", user.uid);
    localStorage.setItem("menteeFullName", fullName);
    localStorage.setItem("menteeFirstName", formattedFirstName);
    localStorage.setItem("menteeEmail", email);
    localStorage.setItem("menteeGoals", mentorshipGoals);
    localStorage.setItem("menteeSkills", skillsToLearn);

    try {
      const profileRef = doc(db, "mentees", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        setStatus({ message: 'Profile already exists. Redirecting to dashboard...', type: 'success' });
        setTimeout(() => navigate("/dashboard"), 2000);
        return;
      }

      await setDoc(profileRef, {
        userId: user.uid,
        name: fullName,
        email,
        mentorshipGoals,
        skillsToLearn,
        createdAt: Timestamp.now()
      });

      const mentorId = localStorage.getItem("mentorId");
      const connectionId = [mentorId, user.uid].sort().join("_");

      await setDoc(doc(db, "connections", connectionId), {
  mentorId,
  menteeId: user.uid,
  menteeEmail: email,
  status: "pending", 
  createdAt: Timestamp.now()
});


      await fetch("http://localhost:5000/send-welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email })
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

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      console.error("Error saving mentee:", error);
      setStatus({ message: 'Something went wrong. Please try again.', type: 'error' });
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Your Mentee Profile</h2>

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
          {["firstName", "lastName", "email", "password", "confirmPassword"].map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field === "confirmPassword" ? "Confirm Password" : field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              />
            </div>
          ))}

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

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-white rounded-md transition ${
                loading ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Creating...' : 'Create Mentee Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMenteeProfileForm;
