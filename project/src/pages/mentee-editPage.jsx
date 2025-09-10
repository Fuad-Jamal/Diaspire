import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';

const EditMenteeProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menteeId, setMenteeId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mentorshipGoals: '',
    skillsToLearn: '',
    imgUrl: '',
  });

  useEffect(() => {
    const email = localStorage.getItem('menteeEmail');
    const fullName = localStorage.getItem('menteeFullName') || '';
    const [first, last] = fullName.split(' ');

    setFormData({
      firstName: first || '',
      lastName: last || '',
      email: email || '',
      mentorshipGoals: localStorage.getItem('menteeGoals') || '',
      skillsToLearn: localStorage.getItem('menteeSkills') || '',
      imgUrl: '',
    });

    // Fetch mentee document ID from Firebase
    const fetchMenteeDoc = async () => {
      const q = query(collection(db, 'mentees'), where('email', '==', email));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setMenteeId(snapshot.docs[0].id);
      }
    };

    fetchMenteeDoc();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

    try {
      if (menteeId) {
        const docRef = collection(db, 'mentees');
        const menteeDoc = query(docRef, where('email', '==', formData.email));
        const snapshot = await getDocs(menteeDoc);
        if (!snapshot.empty) {
          const docToUpdate = snapshot.docs[0].ref;
          await updateDoc(docToUpdate, {
            name: fullName,
            mentorshipGoals: formData.mentorshipGoals,
            skillsToLearn: formData.skillsToLearn,
            img: formData.imgUrl || '/default-avatar.png',
          });

          // Update localStorage
          localStorage.setItem('menteeFullName', fullName);
          localStorage.setItem('menteeFirstName', formData.firstName);
          localStorage.setItem('menteeGoals', formData.mentorshipGoals);
          localStorage.setItem('menteeSkills', formData.skillsToLearn);

          setLoading(false);
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Update failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Edit Your Mentee Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="mentorshipGoals" className="block text-sm font-medium text-gray-700">Mentorship Goals</label>
            <textarea
              id="mentorshipGoals"
              name="mentorshipGoals"
              rows="4"
              value={formData.mentorshipGoals}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
              required
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
            <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
            <input
              type="url"
              id="imgUrl"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenteeProfile;
