import { useState } from 'react'
import Navbar from './components/navbar.jsx'
import Home from './components/home.jsx'
import StatCounter from './StatCounter.jsx'

import './App.css'



function App() {
  

  return (
    <div>

      < Navbar />
      <Home/>
      <>
<section className=" relative grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-blue-300 pt-[100px] h-[300px] text-center">
<h1 className="absolute text-gray-900 top-4 left-1/2 transform -translate-x-1/2 text-center text-2xl font-bold z-10">
      Our Impact
    </h1>
      <StatCounter  target={320} label="Jobs Secured" />
      <StatCounter target={250} label="Mentors Engaged" />
      <StatCounter target={18} label="Countries Represented" />
    </section>   
    </> 
    
    </div>
  )
}

export default App
