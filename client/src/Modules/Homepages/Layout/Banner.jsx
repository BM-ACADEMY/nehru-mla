import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/banner/banners/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data && res.data.length > 0) {
          setBanner(res.data[res.data.length - 1]); // Load latest banner
        }
      } catch (err) {
        console.error("Error loading banner:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanner();
  }, []);

  if (loading) return null;
  if (!banner) return null;

  const imageSrc = banner.image_url || `${MEDIA_URL}${banner.image}`;

  return (
    <section className="w-full pt-[70px] bg-white">
      {/* FULL-WIDTH IMAGE EXACTLY LIKE POSTED SCREENSHOT */}
      <img
        src={imageSrc}
        alt="Banner"
        className="w-full h-auto object-cover"
      />
    </section>
  );
};

export default Banner;
