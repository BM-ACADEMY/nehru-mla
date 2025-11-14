import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../../assets/putsf-logo.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // ⭐ Blog added here
  const menuItems = ["Home", "Gallery", "Blog", "Contact"];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") scrollToTop();
    else {
      navigate("/");
      setTimeout(scrollToTop, 300);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-[0_4px_25px_rgba(0,0,0,0.05)]">
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 h-[75px] flex items-center justify-between">

        {/* LEFT — LOGO + TEXT */}
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-4 cursor-pointer"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
          />

          <div className="leading-tight">
            <div className="text-2xl md:text-3xl font-extrabold text-[#002B75]">
              நாமது மக்கள் கழகம்
            </div>
            <div className="text-sm text-gray-600">
              Namathu Makkal Kazhagam
            </div>
          </div>
        </button>

        {/* CENTER MENU (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center gap-10 text-lg font-medium">
          {menuItems.map((item) => {
            const isHome = item === "Home";
            return (
              <Link
                key={item}
                to={
                  isHome
                    ? "/"
                    : `/${item.toLowerCase().replace(/\s+/g, "")}`
                }
                onClick={(e) => {
                  if (isHome) handleHomeClick(e);
                }}
                className="relative group"
              >
                <span className="cursor-pointer text-gray-800 group-hover:text-[#002B75] transition">
                  {item}
                </span>

                {/* Hover underline */}
                <span className="absolute left-0 -bottom-1 w-0 group-hover:w-full h-[2px] bg-[#002B75] transition-all duration-300"></span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT — Join Us Button */}
        <button
          onClick={() => navigate("/license")}
          className="hidden md:block px-6 py-2 rounded-full text-white font-semibold 
          bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] 
          shadow-lg hover:scale-105 transition duration-300"
        >
          Join Us Now
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          aria-label="menu-btn"
          onClick={toggleMobileMenu}
          className="md:hidden p-2"
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <path d="M3 7h24M3 15h24M3 23h24" stroke="#000" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-md">
          <ul className="flex flex-col space-y-4 text-lg">
            {menuItems.map((item) => {
              const isHome = item === "Home";
              return (
                <li key={item}>
                  <Link
                    to={
                      isHome
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s+/g, "")}`
                    }
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (isHome) handleHomeClick(e);
                    }}
                    className="block py-2 border-b border-gray-200"
                  >
                    {item}
                  </Link>
                </li>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/license");
              }}
              className="w-full mt-2 py-2 rounded-full text-white font-bold 
              bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] 
              shadow-md"
            >
              Join Us Now
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
