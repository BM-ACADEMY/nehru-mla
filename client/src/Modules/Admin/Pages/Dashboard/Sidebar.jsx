import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiPhotograph,
  HiNewspaper,
  HiViewGrid,
  HiClipboardList,
  HiOutlineExclamationCircle,
} from "react-icons/hi";

import logo from "../../../../assets/banner/nehru_logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/admin/banner", label: "Banner", icon: <HiViewGrid /> },
    { to: "/admin/gallery", label: "Gallery", icon: <HiPhotograph /> },
    { to: "/admin/blogs", label: "Blogs", icon: <HiNewspaper /> },
    { to: "/admin/license", label: "Memberships", icon: <HiClipboardList /> },
    { to: "/admin/complaints", label: "Complaints", icon: <HiOutlineExclamationCircle /> },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-md rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 shadow-lg
        flex flex-col transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex flex-col items-center">
          <img
            src={logo}
            className="w-16 h-16 rounded-full border border-gray-300 object-cover"
            alt="logo"
          />
          <h2 className="text-lg font-semibold mt-3 text-gray-900">NMK Admin</h2>
          <p className="text-xs text-gray-500">Management Panel</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-[#F7E27A] text-gray-900 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="text-center py-3 text-xs text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} NMK
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
