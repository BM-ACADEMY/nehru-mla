// src/components/About.jsx
import React from "react";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

const Aboutsection = () => {
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

        {/* Social Links */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          {/* YouTube Channel Link */}
          <a
            href="https://www.youtube.com/channel/UCjDXUxs2tPkRH0Z_Nsoev2Q"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 transition"
          >
            <FaYoutube className="mr-2" /> Visit Our YouTube
          </a>

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/neyamchannel/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            <FaInstagram className="mr-2" /> Follow Us on Instagram
          </a>

          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/nehru.kuppusamy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            <FaFacebook className="mr-2" /> Visit Our Facebook
          </a>
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;
