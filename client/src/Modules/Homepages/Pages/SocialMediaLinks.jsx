import React from "react";

const SocialMediaLinks = () => {
  const YOUTUBE_LINK = "https://www.youtube.com/@Neyam64";

  return (
    <section className="bg-gradient-to-br from-[#0033A0]/10 via-white to-[#D62828]/10 py-20 min-h-[80vh] flex flex-col items-center justify-center px-6">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#000000] bg-clip-text text-transparent mb-4">
          Follow Us on YouTube
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Stay connected through our official YouTube channel and be part of our journey 🇮🇳
        </p>
      </div>

      {/* YouTube Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 border-t-8 border-[#D62828] max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold text-[#D62828] mb-8">
          Neyam Official YouTube Channel
        </h2>

        {/* YouTube Thumbnail Embed */}
        <div className="relative w-full overflow-hidden rounded-2xl shadow-lg mb-8">
          <iframe
            className="w-full h-64 md:h-80"
            src="https://www.youtube.com/embed?listType=user_uploads&list=Neyam64"
            title="Neyam YouTube Channel"
            allowFullScreen
          ></iframe>
        </div>

        {/* YouTube Button */}
        <a
          href={YOUTUBE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-10 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#000000] shadow-xl hover:scale-105 hover:opacity-90 transition-all cursor-pointer"
        >
          Visit YouTube Channel
        </a>
      </div>
    </section>
  );
};

export default SocialMediaLinks;
