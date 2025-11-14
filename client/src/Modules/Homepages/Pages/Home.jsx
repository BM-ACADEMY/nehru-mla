import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 🎯 SAME HERO IMAGE
import HeroImage from "../../../assets/banner/BannerN2.png";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const BLOG_API = `${import.meta.env.VITE_API_BASE_URL}/blog/posts/`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(BLOG_API);
        setBlogs(res.data.slice(0, 4)); // Show only 4
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
    <main className="font-sans bg-gradient-to-br from-[#0033A0]/10 via-white to-[#D62828]/10 text-gray-900">
      <div className="container mx-auto px-4 md:px-16 lg:px-24 xl:px-32 py-16">

        {/* ------------------------------------------------ */}
        {/* ⭐ BLOG PREVIEW (instead of gallery) */}
        {/* ------------------------------------------------ */}

        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#002855]">
            Support Humanity & Country
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#D89F00] mt-1">
            Campaign Highlights
          </h3>

          <p className="text-gray-700 mt-4 text-lg max-w-3xl mx-auto">
            Stay connected with our movement through the latest announcements,
            achievements & public welfare activities.
          </p>
        </section>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading blogs...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-[#D62828] font-semibold">
            {error}
          </p>
        )}

        {/* BLOG LIST */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {blogs.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row"
              >
                {/* LEFT IMAGE */}
                <div className="w-full md:w-1/3">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* RIGHT CONTENT */}
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-bold text-[#002855]">
                    {post.title}
                  </h3>

                  {/* Date */}
                  <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                    📅{" "}
                    {new Date(post.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  {/* Subtitle */}
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {post.subtitle?.substring(0, 150) || ""}
                  </p>

                  <Link
                    to={`/blog/${post._id}`}
                    className="inline-block mt-4 text-[#D62828] font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-block px-10 py-3 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#000000] text-white font-semibold rounded-full shadow-xl hover:opacity-90 hover:scale-105 transition"
          >
            View All Blogs
          </Link>
        </div>

        {/* ------------------------------------------------ */}
        {/* ⭐ GET TO KNOW US (YouTube Section) */}
        {/* ------------------------------------------------ */}

        <section className="w-full py-20 mt-24 bg-[#0033A0] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-full h-full border-t-[12px] border-[#FFD700]"></div>
              <div className="absolute -bottom-5 -right-5 w-full h-full border-b-[12px] border-[#D62828]"></div>

              <div className="relative overflow-hidden border-[8px] border-white shadow-3xl rounded-md">
                <img
                  src={HeroImage}
                  alt="YouTube Preview"
                  className="w-full h-auto object-cover"
                />

                <a
                  href="https://www.youtube.com/@Neyam64"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full shadow-2xl hover:scale-110 transition flex items-center justify-center">
                    <span className="text-red-600 text-4xl">▶</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="text-white">
              <p className="text-sm tracking-widest font-semibold text-yellow-400 mb-4">
                — GET TO KNOW US —
              </p>

              <h2 className="text-4xl md:text-5xl font-extrabold leading-snug">
                Get involved <span className="text-yellow-400">Contribution</span>
                <br />
                Make yourself Proud!
              </h2>

              <div className="w-16 h-1 bg-white mt-4 mb-6"></div>

              <p className="text-lg text-gray-200 leading-relaxed max-w-lg">
                We are a people-driven movement based on integrity, inclusion,
                and action.
              </p>

              <Link
                to="/license"
                className="mt-8 inline-block bg-[#D62828] px-8 py-3 text-white rounded-md font-semibold hover:bg-[#b71f1f] shadow-xl transition"
              >
                Join Now
              </Link>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ */}
        {/* ⭐ MISSION & VISION */}
        {/* ------------------------------------------------ */}

        <section className="w-full mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#002855] text-white px-10 md:px-16 py-16">
              <p className="text-sm tracking-widest font-semibold text-yellow-400 mb-4">
                — MISSION & VISION —
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
                Our Mission Revolves Around <br />
                <span className="text-yellow-400">Well-being of Humanity</span>
              </h2>

              <div className="w-16 h-1 bg-white mt-4 mb-10"></div>

              <div className="flex items-start gap-4 mb-10">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4225/4225745.png"
                  className="w-12"
                />
                <div>
                  <h3 className="text-xl font-bold mb-1">Fostering Solidarity</h3>
                  <p className="text-gray-200">
                    Promoting social harmony and equal opportunity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4225/4225961.png"
                  className="w-12"
                />
                <div>
                  <h3 className="text-xl font-bold mb-1">Power to the People</h3>
                  <p className="text-gray-200">
                    Transparency, accountability & inclusive governance.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative bg-[#D62828] flex items-center justify-center py-10">
              <div className="border-[10px] border-white shadow-2xl rounded-md overflow-hidden w-[85%] md:w-[75%]">
                <img src={HeroImage} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* STICKY COMPLAINT BOX */}
      <Link
        to="/complaint"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#000000] text-white px-5 py-3 rounded-full shadow-xl hover:scale-105 transition flex items-center gap-2"
      >
        🗳️ Complaint Box
      </Link>
    </main>
  );
};

export default Home;
