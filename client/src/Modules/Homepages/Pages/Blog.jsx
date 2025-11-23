import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [expandedId, setExpandedId] = useState(null);

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

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10">

        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#002855] mb-4">
          Latest Updates & Activities
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-16">
          Stay informed about our recent initiatives, meetings, and community-driven programs.
        </p>

        {/* Loading & Error */}
        {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* Blog Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogs.map((blog, index) => {
            const isExpanded = expandedId === blog._id;

            return (
              <div
                key={blog._id}
                className={`flex flex-col md:flex-row bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden 
                ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* IMAGE */}
                <div className="w-full md:w-1/2">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
                  <h3 className="text-2xl font-bold text-[#002855] leading-snug">
                    {blog.title}
                  </h3>

                  {/* Date */}
                  <p className="text-sm text-[#D89F00] flex items-center gap-2 mt-3 font-medium">
                    📅{" "}
                    {new Date(blog.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <hr className="my-4 border-gray-300" />

                  {/* Scrollable Expandable Content */}
                  <div
                    className={`text-gray-700 leading-relaxed transition-all duration-300 
                      ${isExpanded ? "h-40 overflow-y-auto pr-1" : "h-16 overflow-hidden"}`}
                    style={{ scrollbarWidth: "thin" }}
                  >
                    {blog.subtitle || blog.content}
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => toggleExpand(blog._id)}
                    className="text-[#D62828] font-semibold hover:underline mt-3"
                  >
                    {isExpanded ? "Show Less ↑" : "Read More →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BlogHome;
