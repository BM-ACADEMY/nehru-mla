import React from "react";
import supportPuducherry from "../assets/support puducherry.jpg"; // adjust alias if not using @

export default function FloatingButton({ onClick, label = "Join Us" }) {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col items-end space-y-2 z-50">
      {/* Support Puducherry Tag */}
    <div
  className="flex items-center bg-gradient-to-r from-[#0A1944] to-[#1e3a8a] 
             shadow-md rounded-full px-3 py-1 border border-blue-700 
             transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
>
  <img
    src={supportPuducherry}
    alt="Support Puducherry"
    className="w-7 h-7 md:w-8 md:h-8 mr-2 rounded-full object-cover border border-blue-400"
  />
  <span
    className="text-sm md:text-base font-semibold tracking-wide uppercase 
               text-white border-l pl-2 border-blue-400"
  >
    Support Puducherry
  </span>
</div>




      {/* Floating Join Us Button */}
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-[#0A1944] to-[#1e3a8a] 
                   text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg font-semibold
                   hover:scale-105 hover:shadow-xl transform transition-all duration-300 
                   text-sm md:text-base"
      >
        {label}
      </button>
    </div>
  );
}
