import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroimage from "../assets/BannerN2.png";
import FloatingButton from "./FloatingButton";

export default function Hero() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-stretch pt-20 bg-white">
      {/* Floating Popup Button */}
      <FloatingButton onClick={() => setIsOpen(true)} label="Join Us" />


      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-md text-center animate-fadeIn"
          >
            <h2 className="text-3xl font-extrabold text-[#0A1944] mb-4">
              Join Our Movement
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Be part of Puducherry’s vision for growth, progress, and unity.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/join-form")}
                className="bg-gradient-to-r from-[#0A1944] to-[#1e3a8a] text-white 
                  px-6 py-3 rounded-lg font-semibold shadow-md
                  hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Support
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border border-gray-400 px-6 py-3 rounded-lg font-semibold
                  hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-stretch">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-0 text-center md:text-left z-10 fadeIn min-h-[600px]">
          <h1 className="text-[50px] md:text-[80px] font-semibold leading-tight mb-6 text-[#16182F]">
            Nehru Kuppusamy, <br className="hidden md:block" />
            <span className="text-[#0A1944]">
              Serving with Vision, and Progress
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium">
            Working Together for a Stronger, Inclusive, and Sustainable Puducherry.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 md:justify-start">
            <button
              onClick={() => navigate("/join-form")}
              className="bg-[#0A1944] text-white px-8 py-3 rounded-lg font-semibold 
                hover:bg-[#142c6a] transition transform hover:-translate-y-1 
                hover:scale-105 shadow-lg cursor-pointer"
            >
              Join Us
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center items-center px-6 md:px-0 fadeIn">
          <img
            src={heroimage}
            alt="Nehru Kuppusamy"
            className="w-full h-full max-h-[700px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
