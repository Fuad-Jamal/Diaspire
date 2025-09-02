import { useState } from 'react'

import Home from './pages/home.jsx'

import { Routes, Route } from 'react-router-dom'
import Events from './pages/Events.jsx'
import Jobs from './pages/Jobs.jsx'
import Resources from './pages/resources.jsx'
import FindMentors from './pages/mentors.jsx'




function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/resources' element={<Resources/>} />
        <Route path='/mentors' element={<FindMentors/>} />
      </Routes>
      

      
    
    </div>
  )
}

export default App
