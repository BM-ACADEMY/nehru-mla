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
        setVideos(data.items.slice(0, 3)); // get latest 3 videos
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
          <div key={video.guid} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <a href={video.link} target="_blank" rel="noopener noreferrer">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover hover:scale-105 transition duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
