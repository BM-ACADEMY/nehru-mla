import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../../../assets/banner/BannerN2.png";

const Hero = () => {
  return (
    <section className="relative w-full bg-white py-20 md:py-28">

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center gap-12">

        {/* LEFT — IMAGE BLOCK */}
        <div className="md:w-1/2 relative">
          {/* BACKGROUND BLOCK */}
          <div className="absolute -left-6 -bottom-6 w-full h-full bg-[#003366] rounded-xl md:rounded-2xl"></div>

          {/* IMAGE */}
          <img
            src={HeroImage}
            alt="Leader"
            className="relative z-10 w-full rounded-xl md:rounded-2xl shadow-2xl border-[6px] border-white"
          />
        </div>

        {/* RIGHT — TEXT CONTENT */}
        <div className="md:w-1/2">
          {/* Small Title */}
          <p className="text-sm font-semibold tracking-wide text-[#D62828] mb-3">
            ABOUT US
          </p>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A2342] leading-snug mb-3">
            Get involved{" "}
            <span className="text-[#D6A419]">Contribution</span>
            <br />
            Make yourself Proud!
          </h2>

          {/* Underline */}
          <div className="w-12 h-[3px] bg-[#0A2342] mb-6"></div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-8 text-base md:text-lg">
            Your contribution helps us reach more communities, host impactful
            events, and fight for policies that matter to the people.
            Every rupee counts in building a stronger, more united tomorrow.
            Support transparency, development, and people-first leadership.
          </p>

          {/* CTA Button */}
          <Link
            to="/license"
            className="bg-[#D62828] text-white px-8 py-3 rounded-md font-semibold text-lg shadow-md hover:bg-[#b61f20] transition"
          >
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
