// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/NEYAM.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Smooth scroll when hash changes
  const { hash } = useLocation();
  React.useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 font-josefin">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&display=swap');
          .font-josefin { font-family: 'Josefin Sans', sans-serif; }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <RouterLink
            to="/"
            className="flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img src={logo} alt="Neyam Logo" className="h-10 w-auto" />
          </RouterLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <RouterLink
              to="/"
              className="cursor-pointer text-[#16182F] font-semibold hover:text-blue-600 transition"
            >
              Home
            </RouterLink>

            <RouterLink
              to="/gallery"
              className="cursor-pointer text-[#16182F] font-semibold hover:text-blue-600 transition"
            >
              Gallery
            </RouterLink>

            <RouterLink
              to="/contact"
              className="cursor-pointer text-[#16182F] font-semibold hover:text-blue-600 transition"
            >
              Contacts
            </RouterLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg font-josefin">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <RouterLink
              to="/#"
              className="block px-3 py-2 rounded-md text-[#16182F] font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </RouterLink>

            <RouterLink
              to="/#gallery"
              className="block px-3 py-2 rounded-md text-[#16182F] font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </RouterLink>

            <RouterLink
              to="/#contact"
              className="block px-3 py-2 rounded-md text-[#16182F] font-semibold hover:bg-blue-50 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Contacts
            </RouterLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
