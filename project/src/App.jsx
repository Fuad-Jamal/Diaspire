import './utilities/i18n.jsx'
import { useState } from 'react'

import Home from './pages/home.jsx'
import LanguageSwitcher from './utilities/translation.jsx'

import { Routes, Route } from 'react-router-dom'
import Events from './pages/Events.jsx'
import Jobs from './pages/Jobs.jsx'
import Resources from './pages/resources.jsx'
import Mentors from './pages/mentors.jsx'
import MenteesHomepage from './pages/menteesHomepage.jsx'
import Mentorhome from './pages/DashboardM.jsx'
import CreatePasswordForm from './pages/profile.jsx'
import CreateMenteeProfileForm from './pages/mprofile.jsx'
import MenteeWithMentors from './pages/menteesHomepage.jsx'
import FindMentors from './pages/mentors.jsx'
import MentorWithMentees from "./pages/mentorHomepage.jsx";
import RequestMentorship from './pages/request-mentor.jsx'
import EditProfile from './pages/mentor-editPage.jsx'
import EditMenteeProfile from './pages/mentee-editPage.jsx'
import MentorRequests from './components/mentor-request.jsx'
import MenteeRequests from './components/mentee-request.jsx'
import ChatWrapper from './utilities/chatWrapper.jsx';



function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentees" element={<MenteesHomepage />} />
        <Route path="/career" element={<Mentorhome />} />
        <Route path="/profile" element={<CreatePasswordForm />} />
        <Route path="/mprofile" element={<CreateMenteeProfileForm />} />
        <Route path="/home1" element={<MenteeWithMentors />} />
        <Route path="/mentors" element={<FindMentors />} />
        <Route path="/dashboard" element={<MenteeWithMentors />} />
        <Route path="/mentor-dashboard" element={<MentorWithMentees />} />
        <Route path="/request-mentor" element={<RequestMentorship />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/edit-menteeprofile" element={<EditMenteeProfile />} />
        <Route path="/mentor-requests" element={<MentorRequests />} />
        <Route path="/mentee-requests" element={<MenteeRequests />} />
        <Route path="/chat/:conversationId" element={<ChatWrapper />} />
      </Routes>

      <div className="fixed bottom-6 right-6 z-50">
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export default App
