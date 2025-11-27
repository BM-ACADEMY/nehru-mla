import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/banner/nehru_logo.png";
import { UserPlus } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Changed About Us path to include the hash
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/#about" }, 
    { label: "Gallery", path: "/gallery" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  // 2. Effect to handle scrolling when arriving from a different page
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // Slight delay ensures the DOM is fully loaded
      }
    }
  }, [location]);

  // 3. Handler for smooth scrolling if already on the Home page
  const handleNavClick = (e, path) => {
    setMobileMenuOpen(false);

    // Check if it's a hash link (e.g., /#about)
    if (path.includes("#")) {
      const [route, hash] = path.split("#");

      // If we are already on the target route (Home), just scroll
      if (location.pathname === route) {
        e.preventDefault(); // Prevent router navigation
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        // If element not found immediately, update URL hash manually (optional)
        window.history.pushState(null, "", path);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm backdrop-blur-md">
      <div className="w-full h-[80px] sm:h-[85px] md:h-[90px] px-4 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between">

        {/* LEFT — LOGO + TEXT */}
        <Link to="/" className="flex items-center gap-3 sm:gap-4 group">
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <div className="leading-tight">
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#002B75] tracking-wide group-hover:text-[#001f56] transition">
              நமது மக்கள் கழகம்
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-semibold text-[#D62828] tracking-wide">
              Namathu Makkal Kazhagam
            </p>
          </div>
        </Link>

        {/* CENTER MENU */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[17px] font-medium tracking-tight">
          {menuItems.map((item) => {
            // Check active state (ignoring the hash for the match)
            const active = location.pathname === item.path.split("#")[0] && item.path !== "/#about";
            
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)} // Add Click Handler
                className={`relative group py-2 transition-colors duration-300 ${
                  active ? "text-[#D62828]" : "text-[#002B75] hover:text-[#D62828]"
                }`}
              >
                {item.label}
                
                {/* Center-Expanding Underline */}
                <span
                  className={`absolute left-1/2 bottom-0 h-[2.5px] bg-[#D62828] -translate-x-1/2 rounded-full transition-all duration-300 ease-out
                  ${active ? "w-4/5" : "w-0 group-hover:w-4/5"}`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* RIGHT — JOIN BUTTON */}
        <button
          onClick={() => navigate("/license")}
          className="hidden md:flex items-center gap-2 px-5 lg:px-6 py-2 md:py-2.5 rounded-full font-bold 
            text-white border-2 border-[#D62828] shadow-md hover:shadow-lg 
            transition-all hover:bg-[#c61f1f] hover:border-[#c61f1f]"
          style={{ backgroundColor: "#D62828" }}
        >
          <UserPlus size={20} className="text-white" />
          <span className="hidden lg:inline">Join Us Now</span>
          <span className="lg:hidden">Join</span>
        </button>

        {/* MOBILE MENU ICON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          <svg width="32" height="32" viewBox="0 0 30 30">
            <path d="M4 7h22M4 15h22M4 23h22" stroke="#333" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl px-6 py-4 animate-slideDown">
          <ul className="flex flex-col gap-3 text-lg font-medium">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)} // Add Click Handler Here too
                  className="block py-3 border-b border-gray-200 text-[#002B75] transition hover:text-[#001f56]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              navigate("/license");
            }}
            className="w-full mt-4 py-3 font-bold text-white rounded-full border-2 
              border-[#D62828] flex items-center justify-center gap-2 shadow-md 
              hover:shadow-lg transition-all hover:bg-[#c61f1f] hover:border-[#c61f1f]"
            style={{ backgroundColor: "#D62828" }}
          >
            <UserPlus size={20} className="text-white" />
            Join Us Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;