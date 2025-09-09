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
    const role = localStorage.getItem("userRole");
    const mentorId = localStorage.getItem("mentorId");

    if (role !== "professional" || !mentorId) return;

    const fetchMentorProfile = async () => {
      try {
        const docRef = doc(db, "mentors", mentorId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMentorName(data.name || "");
          setMentorBio(data.bio || "");
          setMentorLinkedIn(data.linkedin || "");
          const parts = data.name?.split(" ") || [];
          const initials = parts[0]?.[0] + (parts[1]?.[0] || '');
          setMentorInitials(initials.toUpperCase());
        }
      } catch (err) {
        console.error("Error fetching mentor profile:", err);
      }
    };

    fetchMentorProfile();
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const mentorId = localStorage.getItem("mentorId");

    if (role !== "professional" || !mentorId) return;

    const fetchRequestCount = async () => {
      try {
        const q = query(collection(db, "requests"), where("mentorId", "==", mentorId));
        const snapshot = await getDocs(q);
        setRequestCount(snapshot.size);
      } catch (err) {
        console.error("Error fetching request count:", err);
      }
    };

    fetchRequestCount();
  }, []);

  const navItems = [
    {
      name: 'Dashboard',
      route: '/mentor-dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.422-.422 1.1-.422 1.522 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75m-7.5-3v5.625m-3-1.5h.007v.008H7.5v-.008z" />
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
            d="M6.75 3v-2.25c0-.414.336-.75.75-.75h.75a.75.75 0 01.75.75v2.25H16.5m3.75 0V3h-4.5m-9 9h6m-9 9h12a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v14.25c0 .621.504 1.125 1.125 1.125h12.75A2.25 2.25 0 0021 21v-3" />
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
            d="M12 21.75c-1.573 0-3.13-.306-4.556-.917M12 21.75a1.5 1.5 0 002.25-1.5v-7.5a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 002.25 1.5m-6.75-2.25c1.426-.611 2.983-.917 4.556-.917H12m0 1.5v-7.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-3m3.75-1.5c-1.426-.611-2.983-.917-4.556-.917M12 21.75a1.5 1.5 0 00-1.5-1.5v-7.5a1.5 1.5 0 01-1.5-1.5h-3a1.5 1.5 0 01-1.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5H5.25m-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v7.5" />
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
            className="mt-3 px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"          >
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
            <span className="w-6 h-6 mr-3 text-gray-500">
              {item.icon}
            </span>
            <span className="font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Dashboard;
