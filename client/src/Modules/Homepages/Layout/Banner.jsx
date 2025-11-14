import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banners/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data && res.data.length > 0) {
          setBanner(res.data[res.data.length - 1]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load banner.");
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  if (loading) return <Section msg="Loading banner..." />;
  if (error || !banner) return <Section msg="No banner available." />;

  const imageSrc = banner.image_url
    ? banner.image_url
    : `${MEDIA_URL}${banner.image}`;

  return (
    <section className="w-full bg-white pt-[70px]">
      <div className="container mx-auto max-w-7xl px-4">

        <div className="relative rounded-3xl overflow-hidden border-[5px] border-white shadow-lg">

          {/* Banner Image */}
          <img
            src={imageSrc}
            alt={banner.title}
            className="w-full h-[320px] md:h-[480px] lg:h-[580px] object-cover"
          />

          {/* Party-colored overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

          {/* Text Block */}
          <div className="absolute bottom-10 left-8 md:left-14 text-white drop-shadow-xl fade-up">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-2">
              {banner.title}
            </h2>

            {banner.subtitle && (
              <p className="text-lg md:text-2xl opacity-90 mb-3">
                {banner.subtitle}
              </p>
            )}

            {/* Party color underline */}
            <div className="w-28 h-[4px] rounded-full bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] mb-4"></div>

            {/* Slogan */}
            <p className="text-base md:text-lg font-semibold text-[#F2E205] italic">
              “நம் ஊர் வளர — நம் மக்கள் உயர”
            </p>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(25px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-up {
            animation: fadeUp 0.9s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

/* Reusable empty section */
const Section = ({ msg }) => (
  <section className="w-full bg-white text-center py-16 mt-[70px]">
    <p className="text-gray-600">{msg}</p>
  </section>
);

export default Banner;
