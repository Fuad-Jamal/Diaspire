import { useState } from 'react'

import Home from './pages/home.jsx'

import { Routes, Route } from 'react-router-dom'
import Events from './pages/Events.jsx'
import Jobs from './pages/Jobs.jsx'
import Resources from './pages/resources.jsx'
import Mentors from './pages/mentors.jsx'
import MenteesHomepage from './pages/menteesHomepage.jsx'




function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/resources' element={<Resources/>} />
        <Route path='/mentors' element={<Mentors/>} />
      </Routes>
      

      
    
    </div>
  )
}

export default App
