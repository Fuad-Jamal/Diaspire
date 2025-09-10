import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Main Info */}
        <div className="text-center md:text-left">
          {/* Using text for the logo is cleaner and more scalable */}
          <h2 className="text-3xl font-extrabold text-blue-400">DIASPIRE</h2>
          <p className="mt-4 text-gray-300 max-w-sm mx-auto md:mx-0">
            DIASPIRE is an independent mentoring platform bridging Rwandan youth with diaspora professionals.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <p className="font-bold pb-2 text-xl">Quick links</p>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Events</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Jobs</a></li>
          </ul>
        </div>

        {/* Support & Address */}
        <div className="text-center md:text-left">
          <p className="font-bold pb-2 text-xl">Support</p>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-300">Contact us</a></li>
          </ul>
          <p className="font-bold mt-4 pb-2 text-xl">Address</p>
          <p className="text-gray-300">info@diaspire.com</p>
          <p className="text-gray-300">Kigali-Rwanda</p>
        </div>

        {/* Socials & Legal */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-4">Join Our Tribe</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-400 transition-transform transform hover:scale-110">
              <FaLinkedin size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-blue-400 transition-transform transform hover:scale-110">
              <FaInstagram size={28} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-400 transition-transform transform hover:scale-110">
              <FaFacebook size={28} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition-transform transform hover:scale-110">
              <FaTwitter size={28} />
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Copyright &copy; {new Date().getFullYear()} DIASPIRE.com - All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Legal information and Privacy policy
          </p>
        </div>
      </div>
    </footer>
  );
}