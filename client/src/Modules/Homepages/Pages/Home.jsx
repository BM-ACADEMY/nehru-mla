import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HeroImage from "../../../assets/banner/BannerN2.png";
import BlogBg from "../../../assets/banner/blog_bg_1.jpg";
import { Play, ArrowRight,MessageSquareWarning } from "lucide-react";
import { Handshake, Scale } from "lucide-react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const BLOG_API = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;
    const Banneriamge = "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop";


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(BLOG_API);
        setBlogs(res.data.slice(0, 4)); // Show only 4 blogs
      } catch (err) {
        console.error(err);
        setError("Failed to load blog preview.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="font-sans bg-gradient-to-br from-[#0033A0]/5 via-white to-[#D62828]/5 text-gray-900">
      <div className="">
        

        <section 
          className="text-center py-16 relative bg-cover bg-center bg-no-repeat shadow-sm overflow-hidden"
          // 2. Apply the imported image using inline styles
          style={{ backgroundImage: `url(${BlogBg})` }} 
        >
          
          {/* 3. White Overlay (Optional - makes text readable) */}

          {/* Content Wrapper (z-10 puts content on top of the overlay) */}
          <div className="relative z-10 px-4">
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002855]">
              Support Humanity & Country
            </h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#D89F00] mt-1">
              Campaign Highlights
            </h3>
            <p className="text-gray-700 mt-4 text-md max-w-3xl mx-auto">
              Stay connected with our movement through the latest announcements,
              achievements & public welfare activities.
            </p>

            {/* Loading & Error */}
            {loading && (
              <p className="text-center text-gray-500 mt-8">Loading blogs...</p>
            )}
            {error && (
              <p className="text-center text-[#D62828] font-semibold mt-8">{error}</p>
            )}

            {/* Blog Cards Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-left">
                {blogs.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group h-full"
                  >
                    {/* IMAGE SECTION - TOP */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Date Badge */}
                      <div className="absolute top-3 right-3 bg-[#FDE047] text-[#002855] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {new Date(post.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    {/* CONTENT SECTION - CENTERED */}
                    <div className="p-6 flex flex-col flex-grow items-center text-center">
                      <h3 className="text-xl font-bold text-[#002855] leading-snug mb-3 line-clamp-2 group-hover:text-[#D62828] transition-colors">
                        {post.title}
                      </h3>

                      <div className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 h-16 overflow-hidden">
                        {post.subtitle || "No description available."}
                      </div>

                      <div className="mt-auto pt-4 border-t border-gray-100 w-full flex justify-center">
                        <Link
                          to="/blog"
                          className="text-[#D62828] font-bold text-sm flex items-center gap-1 uppercase tracking-wide hover:underline"
                        >
                          Read More <span className="text-lg">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View All / Join Button */}
            <div className="text-center mt-16">
              <Link
                to="/license" // You had license here, or change to /blog
                className="group relative inline-flex items-center justify-center overflow-hidden px-8 py-3 sm:px-10 sm:py-4 font-bold text-base text-white bg-[#C81E1E] border-2 border-[#C81E1E] shadow-md transition-colors duration-300 ease-in-out hover:text-[#C81E1E] rounded-md"
              >
                <span className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10">Join Now</span>
              </Link>
            </div>

          </div>
        </section>



        {/* GET TO KNOW US SECTION */}
       <section className="w-full py-20 bg-[#0033A0] relative overflow-hidden flex items-center justify-center">
      {/* Background Pattern (Subtle Waves/Lines) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 Q 25 25 50 50 T 100 50" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M0 60 Q 25 35 50 60 T 100 60" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M0 40 Q 25 15 50 40 T 100 40" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Image with Solid Color Backdrops */}
        <div className="relative group mx-auto max-w-md lg:max-w-full">
          {/* Yellow Backdrop (Top-Left) */}
          <div className="absolute -top-4 -left-4 w-full h-full bg-[#FFD700] rounded-sm -z-10 transition-transform duration-300 "></div>
          
          {/* Red Backdrop (Bottom-Right) - Creating the corner accent effect */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#D62828] rounded-sm -z-10 lg:w-32 lg:h-32"></div>
           {/* Extended Red border effect if needed, or just the block as per ref */}
           <div className="absolute -bottom-4 -right-4 w-full h-full border-b-18 border-r-18 border-[#D62828] rounded-sm -z-10"></div>

          {/* Main Image Container */}
          <div className="relative overflow-hidden rounded-sm shadow-2xl bg-gray-900 aspect-video lg:aspect-[3/3]">
            <img
              src={HeroImage}
              alt="Inauguration Event"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700 ease-in-out"
            />
            
            {/* Play Button with Wave Effect */}
            <a
              href="https://www.youtube.com/@Neyam64"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center group/btn"
            >
              <div className="relative flex items-center justify-center">
                {/* The "Waves" - Ping Animation */}
                <div className="absolute w-20 h-20 bg-white/30 rounded-full animate-ping opacity-75"></div>
                <div className="absolute w-28 h-28 bg-white/10 rounded-full animate-pulse delay-75"></div>
                
                {/* The Button Itself */}
                <div className="relative w-20 h-20 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center transform transition duration-300 group-hover/btn:scale-110 z-20">
                   <Play className="w-8 h-8 text-[#D62828] fill-[#D62828] ml-1" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="text-white relative">
          {/* Faint large text in background for depth */}
          <span className="absolute -top-20 -left-10 text-9xl font-bold text-white/5 pointer-events-none select-none hidden lg:block">
            LEADERS
          </span>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-[2px] bg-[#FFD700]"></div>
              <p className="text-sm tracking-widest font-bold text-[#FFD700]">
                Get to know us
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Get involved <br />
              <span className="text-[#FFD700]">Contribution</span> <br />
              Make yourself Proud!
            </h2>

            <div className="w-16 h-1 bg-white/30 mb-8"></div>

            <p className="text-md text-blue-100 leading-relaxed max-w-lg mb-10">
              We are a people-driven movement built on integrity, inclusion,
              and action. Join hands with us to shape policies, serve communities, 
              and stand tall for the values that define a better tomorrow.
            </p>

            <button
  className="
    group relative inline-flex items-center gap-2 
    px-8 py-4 rounded font-bold
    bg-[#D62828] text-white border-2 border-[#D62828]
    shadow-lg transition-all duration-300
    overflow-hidden
    hover:-translate-y-1 hover:shadow-red-600/30 hover:text-[#D62828]
  "
>
  {/* White expanding background */}
  <span
    className="
      absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 
      bg-white transition-all duration-300 ease-out 
      group-hover:w-full
    "
  ></span>

  {/* Text */}
  <span className="relative z-10">Join Now</span>

  {/* Arrow Icon */}
  <ArrowRight
    className="
      relative z-10 w-5 h-5 transition-transform duration-300
      group-hover:translate-x-1
    "
  />
</button>

          </div>
        </div>
      </div>

      {/* Background Decoration (Blurry blobs) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D62828]/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
    </section>

        {/* ⭐ MISSION & VISION */}
     <section 
      className="relative w-full py-24 bg-fixed bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${Banneriamge})` }}
    >
      {/* Dark Blue Overlay (Opacity 90% to match the #002855 theme) */}
      <div className="absolute inset-0 bg-[#002855]/90"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center text-white">
        
        {/* Header Section */}
        <div className="mb-12 max-w-3xl">
          <p className="text-sm tracking-[0.2em] font-bold text-yellow-400 mb-6 uppercase">
            — Mission & Vision
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Our Mission Revolves Around <br className="hidden md:block" />
            <span className="text-yellow-400">Well-being of Humanity</span>
          </h2>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Grid for the two main points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-5xl mt-8">
          
          {/* Card 1: Solidarity */}
          <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:-translate-y-2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#D62828] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Handshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Fostering Solidarity</h3>
              <p className="text-blue-100 leading-relaxed text-center">
                Promoting social harmony, equal opportunity, and
                brotherhood across the nation to build a unified future.
              </p>
            </div>
          </div>

          {/* Card 2: Power to the People */}
          <div className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:-translate-y-2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#D62828] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Power to the People</h3>
              <p className="text-blue-100 leading-relaxed text-center">
                Ensuring transparency, accountability, and inclusive
                governance for everyone, empowering every voice.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-16">
             
             
        </div>

      </div>
    </section>
      </div>

      {/* ------------------------------------------------ */}
      {/* ⭐ STICKY COMPLAINT BOX */}
    <Link
  to="/complaint"
  className="fixed bottom-8 right-8 z-50 flex items-center gap-2 
             bg-gradient-to-r from-blue-600 to-cyan-500 
             text-white px-5 py-3 rounded-full 
             shadow-lg shadow-blue-500/30 
             hover:shadow-blue-500/50 hover:scale-105 
             transition-all duration-300"
>
  <MessageSquareWarning className="w-5 h-5" />
  <span className="font-medium text-sm">Feedback & Complaints</span>
</Link>
    </main>
  );
};

export default Home;
