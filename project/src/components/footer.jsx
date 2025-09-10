import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#002F6C] text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Mission */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-[#FDCB58] font-poppins">DIASPIRE</h2>
          <p className="mt-4 text-gray-200 font-inter max-w-sm mx-auto md:mx-0">
            Diaspire is a tech-enabled mentoring platform bridging Rwandan youth with diaspora professionals to build futures together.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <p className="font-bold pb-2 text-xl text-[#FDCB58] font-poppins">Quick Links</p>
          <ul className="space-y-2 text-gray-300 font-inter">
            <li><a href="#" className="hover:text-[#FDCB58] transition-colors duration-300">FAQ</a></li>
            <li><a href="#" className="hover:text-[#FDCB58] transition-colors duration-300">Events</a></li>
            <li><a href="#" className="hover:text-[#FDCB58] transition-colors duration-300">Jobs</a></li>
          </ul>
        </div>

        {/* Support & Address */}
        <div className="text-center md:text-left">
          <p className="font-bold pb-2 text-xl text-[#FDCB58] font-poppins">Support</p>
          <ul className="space-y-2 text-gray-300 font-inter">
            <li><a href="#" className="hover:text-[#FDCB58] transition-colors duration-300">Contact Us</a></li>
          </ul>
          <p className="font-bold mt-6 pb-2 text-xl text-[#FDCB58] font-poppins">Address</p>
          <p className="text-gray-200 font-inter">info@diaspire.com</p>
          <p className="text-gray-200 font-inter">Kigali, Rwanda</p>
        </div>

        {/* Socials & Legal */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold mb-4 text-[#FDCB58] font-poppins">Join Our Tribe</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#FDCB58] transition-transform transform hover:scale-110">
              <FaLinkedin size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#FDCB58] transition-transform transform hover:scale-110">
              <FaInstagram size={28} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[#FDCB58] transition-transform transform hover:scale-110">
              <FaFacebook size={28} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#FDCB58] transition-transform transform hover:scale-110">
              <FaTwitter size={28} />
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-400 font-inter">
            &copy; {new Date().getFullYear()} Diaspire.com — All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-400 font-inter">
            Legal information & Privacy policy
          </p>
        </div>
      </div>
    </footer>
  );
}
