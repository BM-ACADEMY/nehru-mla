import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaExpand, FaImages, FaArrowRight } from "react-icons/fa";

// --- LightGallery Imports ---
import LightGallery from "lightgallery/react";

// Import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-share.css";

// Import plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgShare from "lightgallery/plugins/share";

const HomeGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const lightboxRef = useRef(null);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gallery/images/`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(API_URL);
        setImages(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load gallery images.");
      }
    };
    fetchImages();
  }, []);

  const onInit = (detail) => {
    if (detail) {
      lightboxRef.current = detail.instance;
    }
  };

  // Animations
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* --- New Modern Background (Dot Grid) --- */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* --- Header Section --- */}
        <motion.div
          className="flex flex-col items-center text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
       

          {/* Solid Bold Heading (No Gradient) */}
          <h2 className="max-w-4xl text-xl font-bold tracking-tight text-[#001f56] md:text-6xl lg:text-6xl leading-tight">
           Our Gallery Highlights <br className="hidden md:block" />
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            A curated collection of moments that define our journey. 
            Witness the unity and progress through our lens.
          </p>
        </motion.div>

        {error && <p className="text-center text-red-500 mb-8 font-medium">{error}</p>}

        {/* --- LightGallery Grid --- */}
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgAutoplay, lgShare]}
          elementClassNames="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8" // Increased gap for cleaner look
          mode="lg-fade"
        >
          {images.map((img) => (
            <a
              key={img._id}
              href={img.image_url}
              className="block group relative break-inside-avoid"
              data-sub-html={`<div class="lightgallery-caption"><h4>${img.title}</h4><p>Gallery Collection</p></div>`}
            >
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl bg-gray-100"
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Minimalist Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur p-4 rounded-full shadow-xl transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <FaExpand className="text-gray-900 text-xl" />
                    </div>
                </div>

                {/* Bottom Info Bar (Always Visible on Desktop, or visible on Hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {img.title}
                    </h4>
                </div>
              </motion.div>
            </a>
          ))}
        </LightGallery>

      </div>
    </section>
  );
};

export default HomeGallery;