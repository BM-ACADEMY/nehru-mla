// src/components/LatestVideos.jsx
import React, { useEffect, useState } from "react";

export default function LatestVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UCjDXUxs2tPkRH0Z_Nsoev2Q"
        );
        const data = await res.json();
        setVideos(data.items.slice(0, 3)); // latest 3 videos
      } catch (error) {
        console.error("Error fetching RSS:", error);
      }
    };
    fetchRSS();
  }, []);

  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#16182F] text-center mb-10">
        Latest YouTube Videos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {videos.map((video) => (
          <a
            key={video.guid}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col"
          >
            {/* Thumbnail with YouTube-style hover effect */}
            <div className="relative w-full overflow-hidden rounded-xl">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 rounded-full p-3">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Video info like YouTube */}
            <div className="mt-3 flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" /> {/* Placeholder for channel avatar */}
              <div>
                <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">YouTube</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
