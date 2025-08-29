import { useState } from 'react'
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx'
import StatCounter from './StatCounter.jsx'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About.jsx'
import Jobs from './pages/Jobs.jsx'




function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/jobs' element={<Jobs/>} />
      </Routes>
          

      
    
    </div>
  )
}

export default App
