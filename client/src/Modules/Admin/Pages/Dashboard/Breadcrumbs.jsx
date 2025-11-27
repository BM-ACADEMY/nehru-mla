import React from "react";
import { useLocation, Link } from "react-router-dom";
import { HiHome, HiChevronRight } from "react-icons/hi";

const Breadcrumbs = () => {
  const location = useLocation();
  let paths = location.pathname.split("/").filter(Boolean);
  
  // Filter out 'admin' if it is the first path to avoid redundancy if desired, 
  // or keep it. Here we handle duplicates.
  paths = paths.filter((path, index) => path !== paths[index - 1]);

  return (
    <nav className="text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        
        {/* Home Icon */}
        <li>
          <Link
            to="/admin/banner"
            className="flex items-center text-gray-500 hover:text-[#D4B93E] transition-colors"
          >
            <HiHome className="w-4 h-4" />
          </Link>
        </li>

        {paths.slice(1).map((path, index) => {
          const routeTo = "/" + paths.slice(0, index + 2).join("/");
          const isLast = index === paths.slice(1).length - 1;
          const label = path.replace(/-/g, " ");

          return (
            <li key={routeTo} className="flex items-center gap-2">
              <HiChevronRight className="text-gray-400 w-4 h-4" />
              
              {isLast ? (
                <span className="font-semibold text-gray-800 capitalize bg-[#F7E27A]/20 px-2 py-0.5 rounded text-xs border border-[#F7E27A]/50">
                  {label}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-500 hover:text-gray-900 capitalize font-medium transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;