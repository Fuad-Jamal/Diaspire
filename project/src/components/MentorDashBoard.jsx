import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [mentorName, setMentorName] = useState('');
  const [mentorInitials, setMentorInitials] = useState('');
  const [mentorBio, setMentorBio] = useState('');
  const [mentorLinkedIn, setMentorLinkedIn] = useState('');
  const [requestCount, setRequestCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const mentorId = localStorage.getItem("mentorId");
    const role = localStorage.getItem("userRole");
    if (role !== "professional" || !mentorId) return;

    const fetchData = async () => {
      const docRef = doc(db, "mentors", mentorId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMentorName(data.name || "");
        setMentorBio(data.bio || "");
        setMentorLinkedIn(data.linkedinUrl || "");
        const parts = data.name?.split(" ") || [];
        const initials = parts[0]?.[0] + (parts[1]?.[0] || '');
        setMentorInitials(initials.toUpperCase());
      }

      const q = query(
        collection(db, "requests"),
        where("mentorId", "==", mentorId),
        where("status", "==", "pending")
      );
      const snapshot = await getDocs(q);
      setRequestCount(snapshot.size);
    };

    fetchData();
  }, []);

  const navItems = [
    {
      name: 'Dashboard',
      route: '/mentor-dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
        </svg>
      )
    },
    {
      name: 'Registered Events',
      route: '/mentor-events',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 10h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'My Resources',
      route: '/mentor-resources',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      name: 'Requests',
      route: '/mentor-requests',
      icon: (
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13.5 4.5l6 6m0 0l-6 6m6-6H3" />
          </svg>
          {requestCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {requestCount}
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col w-auto h-[60%] rounded-b-lg px-8 py-8 bg-white border-r">
      <div className="flex items-center mb-8 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
          {mentorInitials}
        </div>
        <div className="ml-2">
          <p className="font-semibold text-gray-900">{mentorName}</p>
          <p className="text-sm text-gray-500">Mentor</p>
          {mentorBio && <p className="text-sm text-gray-600 mt-1 italic">{mentorBio}</p>}
          {mentorLinkedIn && (
            <a
              href={mentorLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline mt-1 block"
            >
              View LinkedIn Profile
            </a>
          )}
          <button
            onClick={() => navigate('/edit-profile')}
            className="mt-3 px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(item.route)}
            className="flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 text-gray-700 hover:bg-gray-100"
          >
            <span className="mr-3 text-gray-500">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
