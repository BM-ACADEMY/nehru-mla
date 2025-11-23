// src/Modules/Homepages/Layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Logo from "../../../assets/banner/nehru_logo.png";

const Footer = () => {
  // Using a placeholder image since local assets cannot be resolved in this environment
  
  const menuItems = ["Home", "Gallery", "Blog", "Contact"];

  return (
    <footer className="bg-[#00254e] text-white relative overflow-hidden">
      
      {/* ✨ Vector Background Design (Subtle Waves) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Additional Abstract Geometric Vector */}
      <div className="absolute top-0 right-0 z-0 opacity-5 pointer-events-none transform translate-x-1/3 -translate-y-1/4">
         <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FCD200" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,71.2,32.6C60.2,43.7,49.5,53,37.6,60.8C25.7,68.6,12.6,74.9,-1.2,76.9C-15,79,-30.1,76.8,-43.3,69.5C-56.5,62.2,-67.9,49.8,-75.7,35.6C-83.5,21.4,-87.7,5.4,-84.8,-9.4C-81.9,-24.2,-71.9,-37.8,-59.6,-47.5C-47.3,-57.2,-32.7,-63,-18.2,-64.5C-3.7,-66,10.8,-63.2,25.3,-60.4L30.5,-59.8Z" transform="translate(100 100)" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          
          {/* 🔵 Column 1: Logo + Description */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/20">
                <img
                  src={Logo}
                  alt="NMK Logo"
                  className="w-10 h-10 md:w-16 md:h-16 object-contain rounded-full"
                />
              </div>

              <span className="text-white font-bold text-lg md:text-xl leading-snug group-hover:text-[#FCD200] transition-colors">
                Namathu Makkal Kazhagam
              </span>
            </Link>

            <p className="text-blue-100 text-sm md:text-base leading-relaxed opacity-90">
              Namathu Makkal Kazhagam (NMK) is a people-first political movement
              committed to empowering communities, uplifting youth, and building
              a stronger, united Tamil society.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3 mt-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D40000] hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/10">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* 🔴 Column 2: Quick Links */}
          <div className="flex flex-col md:items-center text-sm space-y-3">
            <h2 className="font-bold text-[#FCD200] text-lg mb-4 uppercase tracking-wide">
              Quick Links
            </h2>

            <div className="flex flex-col gap-3 md:text-left">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-blue-100 hover:text-[#FCD200] hover:translate-x-1 md:hover:translate-x-0 md:hover:scale-110 transition-all duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* 🟡 Column 3: Join Us & CTA */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <h2 className="font-bold text-[#FCD200] text-lg mb-2 uppercase tracking-wide">
              Get Involved
            </h2>
            <p className="text-blue-200 text-sm md:text-right mb-2">
                Join us in making a difference today.
            </p>

            <Link
              to="/license"
              className="inline-block bg-gradient-to-r from-[#D40000] to-[#b30000] border border-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-red-900/50 hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Join NMK</span>
            </Link>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://bmtechx.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FCD200] hover:text-white hover:underline font-semibold transition-colors"
            >
              BMTechx.in.
            </a>{" "}
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;