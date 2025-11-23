import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../../assets/banner/BannerN2.png";

const Hero = () => {
  return (
    <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        {/* LEFT — IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start relative">
          <div className="relative w-full max-w-[450px]">
            <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 w-full h-full bg-[#0A3460] z-0"></div>
            <img
              src={HeroImage}
              alt="Leader"
              className="relative z-10 w-full h-auto object-cover shadow-sm"
            />
          </div>
        </div>

        {/* RIGHT — TEXT CONTENT */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex flex-col gap-[3px]">
              <span className="w-4 h-[2px] bg-[#D6A419]"></span>
              <span className="w-2 h-[2px] bg-[#D6A419]"></span>
              <span className="w-4 h-[2px] bg-[#D6A419]"></span>
            </div>
            <p className="text-sm font-bold tracking-wide text-[#D6A419] uppercase">
              About Us
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-[#0A2342] leading-tight mb-4">
            Get involved <span className="text-[#D6A419]">Contribution</span>
            <br />
            Make yourself Proud!
          </h2>

          <div className="w-16 h-[4px] bg-[#0A2342] mb-6"></div>

          <p className="text-gray-600 leading-relaxed mb-8 text-base sm:text-md text-justify">
            Your contribution helps us reach more communities, host impactful
            events, and fight for policies that matter to the people. Every
            rupee counts in building a stronger, more united tomorrow. Support
            transparency, development, and people-first leadership.
          </p>

          {/* CTA Button with VERTICAL Line Expand Hover Effect */}
       <Link
  to="/license"
  className="group relative inline-flex items-center justify-center overflow-hidden px-8 py-3 sm:px-10 sm:py-4 font-bold text-base text-white bg-[#C81E1E] border-2 border-[#C81E1E] shadow-md transition-colors duration-300 ease-in-out hover:text-[#C81E1E]"
>
  {/* The expanding white background layer */}
  {/* Added 'ease-out' for a smoother start-fast-end-slow animation */}
  <span className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
  
  {/* The text layer */}
  <span className="relative z-10">Join Now</span>
</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;