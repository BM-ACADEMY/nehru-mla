// src/components/Banner.jsx
import React from "react";
import backgroundImage from "../assets/BannerN1.png";

export default function Banner() {
  return (
    <section className="w-full relative pt-24 bg-white">
      {/* Container for alignment with other sections */}
      <div className="container max-w-7xl mx-auto px-4">
        <div className="w-full relative">
          <img
            src={backgroundImage}
            alt="Banner"
            className="w-full object-contain rounded-xl shadow-lg animate-fadeZoom animate-float"
          />
        </div>
      </div>
    </section>
  );
}
            