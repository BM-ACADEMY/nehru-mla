import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HiChevronRight, HiHome } from "react-icons/hi";

const Breadcrumbs = () => {
  const location = useLocation();
  let paths = location.pathname.split("/").filter(Boolean);
  
  // Remove duplicates if any
  paths = paths.filter((path, index) => path !== paths[index - 1]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {/* Home Icon */}
        <li className="inline-flex items-center">
          <Link
            to="/admin/banner"
            className="inline-flex items-center text-sm font-medium text-gray-500 transition-colors"
          >
            <HiHome className="w-4 h-4 me-1.5" />
            Home
          </Link>
        </li>

        {paths.slice(1).map((path, index) => {
          const routeTo = "/" + paths.slice(0, index + 2).join("/");
          const isLast = index === paths.slice(1).length - 1;

          return (
            <li key={routeTo}>
              <div className="flex items-center">
                <HiChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                {isLast ? (
                  <span className="ms-1 text-sm text-gray-800 capitalize px-2 py-0.5 rounded-md">
                    {path.replace(/-/g, " ")}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="ms-1 text-sm font-medium text-gray-500 hover:text-gray-900 md:ms-2 capitalize transition-colors"
                  >
                    {path.replace(/-/g, " ")}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;