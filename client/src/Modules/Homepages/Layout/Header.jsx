import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/banner/nehru_logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Updated menu items
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Gallery", path: "/gallery" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="w-full h-[80px] px-6 md:px-12 lg:px-20 flex items-center justify-between">

        {/* LEFT → LOGO + TEXT */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 object-contain"
          />

          <div className="leading-tight">
            {/* Tamil Name — BLUE */}
            <div className="text-2xl font-extrabold" style={{ color: "#002B75" }}>
              நாமது மக்கள் கழகம்
            </div>

            {/* English Name — RED */}
            <div className="text-sm font-semibold" style={{ color: "#D62828" }}>
              Namathu Makkal Kazhagam
            </div>
          </div>
        </Link>

        {/* CENTER MENU */}
        <nav className="hidden md:flex items-center gap-10 text-[17px] font-semibold">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative group ${
                  active ? "text-[#002B75]" : "text-[#002B75]"
                }`}
              >
                {item.label}

                {/* Bottom line — Blue */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#002B75] transition-all 
                  ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* RIGHT → RED JOIN BUTTON */}
        <button
          onClick={() => navigate("/license")}
          className="hidden md:block px-6 py-2 rounded-md text-white font-bold transition"
          style={{ backgroundColor: "#D62828" }}
        >
          Join Us Now
        </button>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMobileMenu} className="md:hidden p-2">
          <svg width="32" height="32" viewBox="0 0 30 30">
            <path d="M4 7h22M4 15h22M4 23h22" stroke="#000" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4">
          <ul className="flex flex-col gap-3 text-lg font-medium">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 border-b border-gray-200 text-[#002B75]"
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
            className="w-full mt-3 py-3 font-bold text-white rounded-md"
            style={{ backgroundColor: "#D62828" }}
          >
            Join Us Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
