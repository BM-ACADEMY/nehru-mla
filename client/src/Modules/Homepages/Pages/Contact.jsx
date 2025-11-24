import React from "react";
import { Phone, MapPin, Smartphone, Building2, User, ExternalLink } from "lucide-react";

const Contact = () => {
  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: '#1a3b60' }}
    >
      {/* 1. Base Grid Pattern (Subtle Architectural Look) */}
      <div className="absolute inset-0 opacity-[0.05]" 
        style={{ 
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* 2. Large Vector Waves (Top Right) */}
      <svg className="absolute top-0 right-0 w-[600px] h-[600px] text-white/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0 C60 20 80 40 100 50 L100 0 Z" />
        <circle cx="100" cy="0" r="40" />
        <circle cx="100" cy="0" r="30" fillOpacity="0.5" />
        <circle cx="100" cy="0" r="20" fillOpacity="0.2" />
      </svg>

      {/* 3. Large Vector Shapes (Bottom Left) */}
      <svg className="absolute bottom-0 left-0 w-[500px] h-[500px] text-white/5 translate-y-1/3 -translate-x-1/4 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.2C93.5,8.8,82,21.9,71.1,33.4C60.2,45,49.9,55,38.1,62.9C26.3,70.8,13.2,76.6,-0.7,77.8C-14.5,79,-29,75.6,-41.6,68.2C-54.2,60.8,-64.9,49.5,-73.2,36.6C-81.5,23.7,-87.3,9.2,-86.3,-4.9C-85.3,-19,-77.5,-32.7,-67.2,-43.8C-56.9,-54.9,-44.1,-63.3,-30.9,-71.1C-17.7,-78.9,-4.1,-86,5.3,-95.2L14.7,-104.3" transform="translate(100 100)" />
      </svg>

      {/* Gradient Overlay for Depth (Top to Bottom) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3b60]/50 via-transparent to-[#1a3b60] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            We are here to listen and assist. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Profile / MLA Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-[#0033A0] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
               {/* Tiny decorative dot in card */}
               <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>

              <div className="relative z-10 flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-[#0033A0] group-hover:bg-[#0033A0] group-hover:text-white transition-colors">
                  <User size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">G. Nehru (a) Kuppusamy</h3>
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-wider rounded-full mt-2">
                    MLA – Orleanpet
                  </span>
                </div>
              </div>
              <div className="relative z-10 border-t border-slate-100 pt-4">
                 <p className="text-slate-700 font-semibold flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D62828] mr-3"></span>
                    All India N.R. Congress
                 </p>
              </div>
            </div>

            {/* 2. Contact Details Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-[#D62828] hover:-translate-y-1 transition-all duration-300 space-y-8 relative overflow-hidden">
              
              {/* Address */}
              <div className="flex items-start space-x-4 relative z-10">
                <div className="p-2 bg-red-50 rounded-lg text-[#D62828] shrink-0">
                    <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Constituency Office</h4>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    No.24, New Iyyanar Koil Street,<br/>
                    Vasugi Nagar, Kosapalayam,<br/>
                    Puducherry – 605013
                  </p>
                </div>
              </div>

              {/* Office Numbers */}
              <div className="flex items-start space-x-4 relative z-10">
                <div className="p-2 bg-blue-50 rounded-lg text-[#0033A0] shrink-0">
                    <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Office Phone</h4>
                  <div className="flex flex-col space-y-1">
                    <a href="tel:04132220602" className="text-slate-800 font-medium text-lg hover:text-[#0033A0] transition flex items-center gap-2 group">
                      0413 – 2220602
                    </a>
                    <a href="tel:04132232261" className="text-slate-800 font-medium text-lg hover:text-[#0033A0] transition flex items-center gap-2 group">
                      0413 – 2232261
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="flex items-start space-x-4 relative z-10">
                 <div className="p-2 bg-green-50 rounded-lg text-green-600 shrink-0">
                    <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Direct Mobile</h4>
                  <a href="tel:+919843048384" className="text-slate-800 font-medium text-lg hover:text-green-600 transition flex items-center gap-2">
                    +91 98430-48384
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Google Map */}
          <div className="lg:col-span-3 h-full min-h-[450px] lg:min-h-0 relative">
            {/* Decorative border/shadow for the map against dark bg */}
            <div className="absolute inset-0 bg-white/10 rounded-2xl translate-x-2 translate-y-2 blur-sm"></div>
            
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 relative z-10">
               <iframe 
                title="Office Location"
                width="100%" 
                height="100%" 
                className="absolute inset-0 grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                style={{ border: 0 }} 
                loading="lazy" 
                allowFullScreen 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9606.375054763383!2d79.81069928787886!3d11.936867692553706!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536176ef89f879%3A0x34f6ecbbe661aa2!2s1%2C%20New%20Iyyanar%20Koil%20St%2C%20Kuyavarpalayam%2C%20Puducherry%2C%20605013!5e1!3m2!1sen!2sin!4v1763979653109!5m2!1sen!2sin"
                >
              </iframe>
             
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;