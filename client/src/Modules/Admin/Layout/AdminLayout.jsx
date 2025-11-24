import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/Sidebar";
import Breadcrumbs from "../Pages/Dashboard/Breadcrumbs";
import { clearAuth } from "../../../utils/auth";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 md:ml-64 p-6 bg-gray-100 min-h-screen transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <Breadcrumbs />
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
