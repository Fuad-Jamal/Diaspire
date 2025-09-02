import './utilities/i18n.jsx'
import { useState } from 'react'

import Home from './pages/home.jsx'
import LanguageSwitcher from './utilities/translation.jsx'

import { Routes, Route } from 'react-router-dom'
import Events from './pages/Events.jsx'
import Jobs from './pages/Jobs.jsx'
import Resources from './pages/resources.jsx'
import Mentors from './pages/mentors.jsx'
<<<<<<< HEAD
import MenteesHomepage from './pages/menteesHomepage.jsx'
=======
import Mentorhome from './pages/DashboardM.jsx'
import CreatePasswordForm from './pages/profile.jsx'
import CreateMenteeProfileForm from './pages/mprofile.jsx'
>>>>>>> ft/mentorDashboard




function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/resources' element={<Resources/>} />
        <Route path='/mentors' element={<Mentors/>} />
<<<<<<< HEAD
        <Route path='/mentees' element={<MenteesHomepage/>} />
=======
        <Route path='/career' element={<Mentorhome/>} />
        <Route path='/profile' element={<CreatePasswordForm/>} />
        <Route path='/mprofile' element={<CreateMenteeProfileForm/>} />
>>>>>>> ft/mentorDashboard
      </Routes>
      

      
     <div className="fixed bottom-6 right-6 z-50">
        <LanguageSwitcher />
      </div>
    </div>
  )
}

export default App
