// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import Sidebar from "../Pages/Dashboard/Sidebar";
// import Breadcrumbs from "../Pages/Dashboard/Breadcrumbs";
// import { clearAuth, getRefreshToken } from "../../../utils/auth";
// import api from "../../../utils/axiosInstance";   // Correct axios instance
// import { HiMenuAlt2, HiLogout, HiUserCircle } from "react-icons/hi";

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile state
//   const [isCollapsed, setCollapsed] = useState(false);     // Desktop state

//   /* ----------------- Logout Handler ----------------- */
//   const handleLogout = () => {
//     clearAuth();
//     navigate("/admin/login", { replace: true });
//   };

//   /* ----------------- Token Refresh Logic ----------------- */
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const refresh = getRefreshToken();
//       if (!refresh) return;
//       try {
//         const res = await api.post("/admin/refresh/", { refresh });
//         if (res.data?.access) localStorage.setItem("admin_access_token", res.data.access);
//       } catch (err) {
//         clearAuth();
//         navigate("/admin/login", { replace: true });
//       }
//     }, 4 * 60 * 1000);
//     return () => clearInterval(interval);
//   }, [navigate]);

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
//       {/* Sidebar Component */}
//       <Sidebar 
//         isMobileOpen={isSidebarOpen} 
//         setIsMobileOpen={setSidebarOpen}
//         isCollapsed={isCollapsed}
//         setIsCollapsed={setCollapsed}
//         onLogout={handleLogout}
//       />

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        
//         {/* Top Header */}
//         <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10">
//           <div className="flex items-center gap-4">
//             {/* Mobile Toggle */}
//             <button 
//               onClick={() => setSidebarOpen(true)}
//               className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
//             >
//               <HiMenuAlt2 size={24} />
//             </button>
            
//             {/* Breadcrumbs (Hidden on very small screens if needed) */}
//             <div className="hidden sm:block">
//               <Breadcrumbs />
//             </div>
//           </div>

//           {/* Right Side Actions */}
//           {/* Right Side Actions */}
// <div className="flex items-center gap-4">

//   {/* Logout Button with Hover Effect */}
//   <button
//     onClick={handleLogout}
//     className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-500 border border-transparent 
//                 hover:text-red-600 hover:border-red-100 
//                transition-all duration-200"
//     title="Logout"
//   >
//     <span className="text-sm font-medium hidden sm:block">Logout</span>
//     <HiLogout 
//       size={20} 
//       className="text-red-500 group-hover:text-red-600 transition-colors" 
//     />
//   </button>
// </div>
//         </header>

//         {/* Scrollable Main View */}
//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
//            {/* Breadcrumbs for Mobile (Visible only on small screens) */}
//            <div className="sm:hidden mb-4">
//              <Breadcrumbs />
//            </div>
           
//            <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HiMenuAlt1, HiBell } from "react-icons/hi";
import Sidebar from "../Pages/Dashboard/Sidebar";
import Breadcrumbs from "../Pages/Dashboard/Breadcrumbs";
import { clearAuth } from "../../../utils/auth";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-sans antialiased">
      {/* 1. Sidebar (Fixed on Mobile, Static on Desktop) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onLogout={handleLogout}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          
          <div className="flex items-center gap-4">
            {/* Hamburger (Mobile Only) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7E27A]"
            >
              <HiMenuAlt1 size={26} />
            </button>
            
            {/* Breadcrumbs (Desktop & Tablet) */}
            <div className="hidden sm:block">
              <Breadcrumbs />
            </div>
          </div>

        </header>

        {/* Scrollable Main View */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {/* Mobile Breadcrumbs (Visible only on tiny screens) */}
          <div className="block sm:hidden mb-6">
             <Breadcrumbs />
          </div>

          {/* Page Content Injection */}
          <div className="animate-fade-in-up">
            <Outlet />
          </div>
          
          {/* Bottom spacer for mobile scrolling comfort */}
          <div className="h-10 md:hidden"></div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;