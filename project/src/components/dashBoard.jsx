import React from 'react';

// For a real-world application, you would import these icons
// from a library like Heroicons (e.g., @heroicons/react/24/outline)
// For this example, we'll use simple inline SVGs.

const UserIcon = () => (
  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
    J
  </div>
);

const navItems = [
  { name: 'Dashboard', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.422-.422 1.1-.422 1.522 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h9.75a1.125 1.125 0 001.125-1.125V9.75m-7.5-3v5.625m-3-1.5h.007v.008H7.5v-.008z" />
      </svg>
    ), isActive: true },
  { name: 'Find Mentors', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ), isActive: false },
  { name: 'Events', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v-2.25c0-.414.336-.75.75-.75h.75a.75.75 0 01.75.75v2.25H16.5m3.75 0V3h-4.5m-9 9h6m-9 9h12a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v14.25c0 .621.504 1.125 1.125 1.125h12.75A2.25 2.25 0 0021 21v-3" />
      </svg>
    ), isActive: false },
  { name: 'Job Board', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.75v4.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25v-4.5m18 0a2.25 2.25 0 00-2.25-2.25h-4.5m-3.75 0a2.25 2.25 0 00-2.25 2.25v4.5m5.25-4.5v2.25" />
      </svg>
    ), isActive: false },
  { name: 'Resources', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-1.573 0-3.13-.306-4.556-.917M12 21.75a1.5 1.5 0 002.25-1.5v-7.5a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 002.25 1.5m-6.75-2.25c1.426-.611 2.983-.917 4.556-.917H12m0 1.5v-7.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-3m3.75-1.5c-1.426-.611-2.983-.917-4.556-.917M12 21.75a1.5 1.5 0 00-1.5-1.5v-7.5a1.5 1.5 0 01-1.5-1.5h-3a1.5 1.5 0 01-1.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5H5.25m-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v7.5" />
      </svg>
    ), isActive: false }
];


const Dashboard = () => {
  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
      {/* Profile Section */}
      <div className="flex items-center mb-8 px-2">
        <UserIcon />
        <div className="ml-3">
          <p className="font-semibold text-gray-900">Jane Doe</p>
          <p className="text-sm text-gray-500">Mentee</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`
              flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200
              ${item.isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            <span className={`w-6 h-6 mr-3 ${item.isActive ? 'text-blue-700' : 'text-gray-500'}`}>
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