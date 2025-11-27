import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiX,
  HiPhotograph,
  HiNewspaper,
  HiViewGrid,
  HiClipboardList,
  HiOutlineExclamationCircle,
  HiLogout
} from "react-icons/hi";
import logo from "../../../../assets/banner/nehru_logo.png";

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const links = [
    { to: "/admin/banner", label: "Banner", icon: <HiViewGrid size={20} /> },
    { to: "/admin/gallery", label: "Gallery", icon: <HiPhotograph size={20} /> },
    { to: "/admin/blogs", label: "Blogs", icon: <HiNewspaper size={20} /> },
    { to: "/admin/license", label: "Memberships", icon: <HiClipboardList size={20} /> },
    { to: "/admin/complaints", label: "Complaints", icon: <HiOutlineExclamationCircle size={20} /> },
  ];

  // Common classes for the sidebar container
  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-72 bg-white text-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out
    md:translate-x-0 md:static md:shadow-none border-r border-gray-100
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Header / Logo */}
          <div className="h-24 flex items-center justify-between px-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#F7E27A]"
              />
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-wide text-gray-900">
                  NMK Admin
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                  Dashboard
                </span>
              </div>
            </div>
            {/* Mobile Close Button */}
            <button 
              onClick={onClose} 
              className="md:hidden p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Menu
            </p>
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose} // Close sidebar on mobile when link clicked
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-[#F7E27A] text-gray-900 font-bold shadow-md shadow-yellow-200/50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {/* Icon wrapper to keep alignment perfect */}
                <span className="shrink-0">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer / Logout Area */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <HiLogout size={20} />
              <span className="text-sm font-semibold">Logout</span>
            </button>
            
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;