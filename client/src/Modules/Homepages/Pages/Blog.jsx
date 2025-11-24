import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogBg from "../../../assets/banner/blog_bg_1.jpg";


const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(API_URL);
        setBlogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="bg-gray-50 py-16 md:py-20" style={{ backgroundImage: `url(${BlogBg})` }} >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#002855] mb-4">
          Latest Updates & Activities
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Stay informed about our recent initiatives, meetings, and community-driven programs.
        </p>

        {/* Loading & Error States */}
        {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Blog Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
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

                  {/* Subtitle / Description (Limited to 3 lines) */}
                  <div className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 h-16 overflow-hidden">
                    {post.subtitle || post.content || "No description available."}
                  </div>

                  {/* <div className="mt-auto pt-4 border-t border-gray-100 w-full flex justify-center">
                    <Link
                      to="/blog" 
                      className="text-[#D62828] font-bold text-sm flex items-center gap-1 uppercase tracking-wide hover:underline"
                    >
                      Read More <span className="text-lg">→</span>
                    </Link>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogHome;