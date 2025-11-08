// src/components/Hero.jsx
import React from "react";
import heroimage from "../assets/BannerN2.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-stretch pt-20 bg-white">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600;700&display=swap');

          * {
            font-family: 'Josefin Sans', sans-serif;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fadeIn {
            animation: fadeIn 1s ease-in forwards;
          }
        `}
      </style>

      {/* Container */}
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
            <button className="bg-[#0A1944] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#142c6a] transition transform hover:-translate-y-1 hover:scale-105 shadow-lg">
              Learn More
            </button>
            <button className="bg-transparent border-2 border-[#0A1944] text-[#0A1944] px-8 py-3 rounded-lg font-semibold hover:bg-[#0A1944] hover:text-white transition transform hover:-translate-y-1 hover:scale-105">
              Contact Us
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
