// src/Modules/Admin/Pages/Dashboard/Breadcrumbs.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  let paths = location.pathname.split("/").filter(Boolean);

  // Remove duplicates
  paths = paths.filter((path, index) => path !== paths[index - 1]);

  return (
    <nav className="text-gray-600 text-sm mb-4 px-4 md:px-0">
      <ol className="flex flex-wrap items-center space-x-2">

        {/* Home */}
        <li>
          <Link
            to="/admin/banner"
            className="text-gray-700 hover:text-black font-medium"
          >
            Home
          </Link>
        </li>

        {/* Dynamic Breadcrumbs */}
        {paths.slice(1).map((path, index) => {
          const routeTo = "/" + paths.slice(0, index + 2).join("/");

          return (
            <li key={routeTo} className="flex items-center space-x-2">
              <span className="text-gray-400">/</span>

              <Link
                to={routeTo}
                className="capitalize hover:text-black text-gray-700 font-medium transition truncate max-w-xs md:max-w-full"
                title={path}
              >
                {/* Gold highlight for last item */}
                {index === paths.slice(1).length - 1 ? (
                  <span className="text-black font-semibold px-2 py-0.5 rounded-md bg-[#F7E27A]">
                    {path.replace(/-/g, " ")}
                  </span>
                ) : (
                  path.replace(/-/g, " ")
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
