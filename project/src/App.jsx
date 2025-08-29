import { useState } from 'react'
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx'
import StatCounter from './StatCounter.jsx'
import { Routes, Route } from 'react-router-dom'
import Events from './pages/Events.jsx'
import Jobs from './pages/Jobs.jsx'
import Resources from './pages/resources.jsx'
import Mentors from './pages/mentors.jsx'




function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/events' element={<Events/>} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/resources' element={<Resources/>} />
        <Route path='/mentors' element={<Mentors/>} />
      </Routes>
          

      
    
    </div>
  )
}

export default App
