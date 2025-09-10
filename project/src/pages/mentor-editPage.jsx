import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedinUrl: '',
    bio: '',
    imgUrl: '',
  });

  useEffect(() => {
    const fetchMentorProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, 'mentors', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const [first, last] = data.name?.split(' ') || [];

        setFormData({
          firstName: first || '',
          lastName: last || '',
          email: user.email || '',
          linkedinUrl: data.linkedinUrl || '',
          bio: data.bio || '',
          imgUrl: data.img || '',
        });
      }
    };

    fetchMentorProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const capitalize = str =>
      str
        .trim()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    const fullName = capitalize(`${formData.firstName} ${formData.lastName}`);

    try {
      const docRef = doc(db, 'mentors', user.uid);
      await updateDoc(docRef, {
        name: fullName,
        linkedinUrl: formData.linkedinUrl,
        bio: formData.bio,
        img: formData.imgUrl || '/default-avatar.png',
      });

      localStorage.setItem('userName', fullName);
      localStorage.setItem('userFirstName', formData.firstName);
      localStorage.setItem('userLinkedIn', formData.linkedinUrl);
      localStorage.setItem('userBio', formData.bio);

      setLoading(false);
      navigate('/mentor-dashboard');
    } catch (error) {
      console.error('Update failed:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/mentor-dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Edit Your Profile</h2>

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
            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              value={formData.bio}
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

          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-3 px-4 rounded-md bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
