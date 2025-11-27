import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiX,
  HiPhotograph,
  HiNewspaper,
  HiViewGrid,
  HiClipboardList,
  HiOutlineExclamationCircle,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiLogout
} from "react-icons/hi";
import logo from "../../../../assets/banner/nehru_logo.png";

const Sidebar = ({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed, onLogout }) => {
  
  const links = [
    { to: "/admin/banner", label: "Banner", icon: <HiViewGrid size={22} /> },
    { to: "/admin/gallery", label: "Gallery", icon: <HiPhotograph size={22} /> },
    { to: "/admin/blogs", label: "Blogs", icon: <HiNewspaper size={22} /> },
    { to: "/admin/license", label: "Memberships", icon: <HiClipboardList size={22} /> },
    { to: "/admin/complaints", label: "Complaints", icon: <HiOutlineExclamationCircle size={22} /> },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:relative z-50 h-screen bg-white border-r border-gray-200 shadow-xl md:shadow-none transition-all duration-300 ease-in-out flex flex-col
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "md:w-20" : "md:w-64"} w-64
        `}
      >
        {/* Header / Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
            <img src={logo} className="w-8 h-8 rounded-full object-cover" alt="Logo" />
            {!isCollapsed && (
              <span className="font-bold text-gray-800 text-lg tracking-wide">NMK Admin</span>
            )}
          </div>
          {/* Mobile Close Button */}
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-gray-500">
            <HiX size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative
                ${isActive 
                  ? "bg-[#F7E27A] text-gray-900 font-semibold shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
                ${isCollapsed ? "justify-center" : ""}
                `
              }
            >
              <span className="shrink-0">{item.icon}</span>
              
              {!isCollapsed && <span>{item.label}</span>}

              {/* Tooltip for Collapsed Mode */}
            
            </NavLink>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-gray-100">
          
          {/* Logout Button (Visible in Sidebar) */}
          <button 
            onClick={onLogout}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors
            ${isCollapsed ? "justify-center" : ""}`}
          >
            <HiLogout size={22} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-full mt-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isCollapsed ? <HiChevronDoubleRight size={20} /> : <HiChevronDoubleLeft size={20} />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;