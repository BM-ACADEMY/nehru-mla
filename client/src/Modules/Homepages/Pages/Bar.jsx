import React, { useState } from "react";

const Bar = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "எங்களை பற்றி" },
    { id: "vision", label: "நோக்கம்" },
    { id: "mission", label: "பணிக்குறிப்பு" },
  ];

  return (
    <div className="w-full font-sans text-gray-900 px-4 md:px-12 py-10 bg-gradient-to-br from-white via-[#f7f7f7] to-[#fff3f3]">

      {/* 🔥 Party Top Ribbon */}
      <div className="bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] text-white text-center py-4 rounded-2xl shadow-lg">
        <p className="text-xl md:text-2xl font-extrabold tracking-wide drop-shadow-lg">
          🇮🇳 மக்கள் முன்னேற்றம் எங்கள் இலக்கு —{" "}
          <span className="text-black bg-white px-2 py-1 rounded font-bold">
            நாமது மக்கள் கழகம்
          </span>{" "}
          🇮🇳
        </p>
      </div>

      {/* 🟦 Tabs */}
      <div className="flex justify-center gap-4 bg-white border border-gray-200 py-3 mt-8 rounded-xl shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] text-white shadow-xl scale-105"
                : "text-gray-800 hover:text-[#D62828]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 📜 Content */}
      <div className="text-center py-12 px-5 md:px-16 bg-white rounded-2xl shadow-xl mt-8 fade-in">

        {activeTab === "about" && (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] bg-clip-text text-transparent drop-shadow-md">
              எங்களை பற்றி
            </h2>

            <div className="mx-auto w-32 h-1.5 bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] rounded-full mt-4 mb-6"></div>

            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              நாமது மக்கள் கழகம் என்பது மக்களுக்காக உருவான இயக்கம்.  
              மக்கள் நலன், கல்வி, வேலைவாய்ப்பு மற்றும் சமூக முன்னேற்றம் ஆகியவற்றை  
              மையப்படுத்தி செயல்படுகிறது.
            </p>
          </>
        )}

        {activeTab === "vision" && (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] bg-clip-text text-transparent drop-shadow-md">
              எங்கள் நோக்கம்
            </h2>

            <div className="mx-auto w-32 h-1.5 bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] rounded-full mt-4 mb-6"></div>

            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              ஒற்றுமை, கல்வி, வளர்ச்சி — இவை மூன்றையும் வலிமையாகக் கொண்டு  
              நம் சமுதாயத்தின் ஒவ்வொரு குடும்பத்தையும் உயர்த்துவதே  
              எங்கள் நோக்கம்.
            </p>

            <p className="mt-4 text-[#D62828] font-semibold italic">
              “நம் ஊர் வளர — நம் மக்கள் உயர” 🇮🇳
            </p>
          </>
        )}

        {activeTab === "mission" && (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] bg-clip-text text-transparent drop-shadow-md">
              பணிக்குறிப்பு
            </h2>

            <div className="mx-auto w-32 h-1.5 bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] rounded-full mt-4 mb-6"></div>

            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              கல்வி, தொழில் முனைவு, சமூக நீதி மற்றும் இளைஞர் முன்னேற்றம்  
              ஆகிய துறைகளில் மாற்றத்தை கொண்டு வருவது  
              எங்கள் தீர்க்கமான பணிக்குறிப்பு.
            </p>
          </>
        )}

      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.7s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Bar;
