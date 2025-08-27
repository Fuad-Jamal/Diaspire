import { useState } from 'react';
import React from 'react'

/**
 * A responsive and interactive navigation bar component.
 *
 * This component handles desktop and mobile navigation menus, and uses
 * state to manage the visibility of the mobile menu. It uses props to
 * communicate navigation events back to the parent component.
 *
 * @param {object} props - The component props.
 * @param {function} props.onNavigate - A function to call when a navigation link is clicked.
 * @param {string} props.currentPage - The identifier for the currently active page.
 */
const Navbar = ({ onNavigate, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu's open/close state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40 rounded-xl">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo and Mobile Menu Button */}
        <a href="#home" onClick={() => onNavigate('home')} className="flex items-center">
          <img className="w-[150px] lg:w-[234px] rounded" src="./src/assets/logo.webp" alt="" />
        </a>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-neutral-600 focus:outline-none -ml-12"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#home"
            onClick={() => onNavigate('home')}
            className={`nav-link text-neutral-600 hover:text-blue-600 ${currentPage === 'home' ? 'font-semibold text-blue-600' : ''}`}
          >
            Home
          </a>
          <a
            href="#find-mentors"
            onClick={() => onNavigate('find-mentors')}
            className={`nav-link text-neutral-600 hover:text-blue-600 ${currentPage === 'find-mentors' ? 'font-semibold text-blue-600' : ''}`}
          >
            Find Mentors
          </a>
          <a
            href="#events"
            onClick={() => onNavigate('events')}
            className={`nav-link text-neutral-600 hover:text-blue-600 ${currentPage === 'events' ? 'font-semibold text-blue-600' : ''}`}
          >
            Events
          </a>
          <a
            href="#jobs"
            onClick={() => onNavigate('jobs')}
            className={`nav-link text-neutral-600 hover:text-blue-600 ${currentPage === 'jobs' ? 'font-semibold text-blue-600' : ''}`}
          >
            Jobs
          </a>
          <a
            href="#resources"
            onClick={() => onNavigate('resources')}
            className={`nav-link text-neutral-600 hover:text-blue-600 ${currentPage === 'resources' ? 'font-semibold text-blue-600' : ''}`}
          >
            Resources
          </a>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <button className="px-4 py-2 text-neutral-600 font-medium rounded-lg hover:bg-neutral-100">Login</button>
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">Sign Up</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden px-6 pt-2 pb-4 space-y-2 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <a
          href="#home"
          onClick={() => { onNavigate('home'); toggleMobileMenu(); }}
          className="nav-link block text-neutral-600 hover:text-blue-600"
        >
          Home
        </a>
        <a
          href="#find-mentors"
          onClick={() => { onNavigate('find-mentors'); toggleMobileMenu(); }}
          className="nav-link block text-neutral-600 hover:text-blue-600"
        >
          Find Mentors
        </a>
        <a
          href="#events"
          onClick={() => { onNavigate('events'); toggleMobileMenu(); }}
          className="nav-link block text-neutral-600 hover:text-blue-600"
        >
          Events
        </a>
        <a
          href="#jobs"
          onClick={() => { onNavigate('jobs'); toggleMobileMenu(); }}
          className="nav-link block text-neutral-600 hover:text-blue-600"
        >
          Jobs
        </a>
        <a
          href="#resources"
          onClick={() => { onNavigate('resources'); toggleMobileMenu(); }}
          className="nav-link block text-neutral-600 hover:text-blue-600"
        >
          Resources
        </a>
        <div className="border-t border-neutral-200 pt-4 space-y-2">
          <button className="w-full text-left px-4 py-2 text-neutral-600 font-medium rounded-lg hover:bg-neutral-100">Login</button>
          <button className="w-full text-left px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">Sign Up</button>
        </div>
      </div>
    </header>
    </>
  );
};

export default Navbar;