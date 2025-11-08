// src/components/About.jsx
import React from "react";

const Aboutsection =() => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          About <span className="text-blue-900">Neyam</span>
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">       
          Neyam is dedicated to empowering communities and building a stronger,
          sustainable Puducherry. Through innovative programs and initiatives,
          we strive to create positive social impact and lasting change.
        </p>

        {/* YouTube Channel Link */}
        <div className="mt-6">
          <a
            href="https://www.youtube.com/channel/UCjDXUxs2tPkRH0Z_Nsoev2Q"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 transition"
          >
            📺 Visit Our YouTube Channel
          </a>
        </div>
      </div>
    </section>
  );
}
export default Aboutsection ;