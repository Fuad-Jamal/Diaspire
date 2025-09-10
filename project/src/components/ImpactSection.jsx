import React from 'react';
import StatCounter from '../StatCounter';
import { FaBriefcase, FaUserFriends, FaGlobeAfrica } from 'react-icons/fa';

export default function ImpactSection() {
  return (
    <section className="bg-[#0B1E3F] py-24 px-6 md:px-12 text-center relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute inset-0 opacity-10 bg-[url('/src/assets/pattern.svg')] bg-cover bg-center"></div>

      {/* Section Title */}
      <h2 className="relative text-3xl lg:text-4xl font-bold font-poppins text-white mb-6">
        Our Impact
      </h2>
      <p className="relative text-lg text-gray-300 font-inter max-w-2xl mx-auto mb-16">
        Diaspire is shaping brighter futures by unlocking opportunities, 
        fostering mentorship, and connecting Rwanda’s youth to the global stage. 
        Here’s what we’ve achieved so far:
      </p>

      {/* Stat Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="rounded-2xl bg-white p-10 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
          <FaBriefcase className="text-[#0B1E3F] text-5xl mb-4 mx-auto" />
          <StatCounter target={320} label="Youth Hired" className="text-[#0B1E3F]"/>
          <p className="text-gray-600 text-sm mt-2">Secured meaningful jobs & internships</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl bg-[#FDCB58] p-10 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
          <FaUserFriends className="text-[#0B1E3F] text-5xl mb-4 mx-auto" />
          <StatCounter target={250} label="Mentors Active" />
          <p className="text-[#0B1E3F] text-sm mt-2">Diaspora professionals guiding youth</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl bg-white p-10 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
          <FaGlobeAfrica className="text-[#0B1E3F] text-5xl mb-4 mx-auto" />
          <StatCounter target={18} label="Countries Engaged" />
          <p className="text-gray-600 text-sm mt-2">Global knowledge driving local impact</p>
        </div>
      </div>
    </section>
  );
}
