// src/pages/Home.jsx
import React from "react";
import { Award, Users, MapPin, Star } from "lucide-react";

export default function Home() {
  const profilePoints = [
    {
      icon: <MapPin className="w-6 h-6 text-[#0A1944]" />,
      title: "Current Position",
      description:
        "Member of the Puducherry Legislative Assembly (MLA) representing the Orleanpet constituency since May 2021 (Independent).",
    },
    {
      icon: <Award className="w-6 h-6 text-[#0A1944]" />,
      title: "Electoral Success",
      description:
        "Twice elected as MLA – first in 2011 (AINRC) and again in 2021 (Independent).",
    },
    {
      icon: <Users className="w-6 h-6 text-[#0A1944]" />,
      title: "Constituency Focus",
      description:
        "Known for his strong grassroots connect and dedication to addressing the needs of the people of Orleanpet.",
    },
    {
      icon: <Star className="w-6 h-6 text-[#0A1944]" />,
      title: "Leadership Style",
      description:
        "A leader who stands with the community, advocating for development, social welfare, and public empowerment.",
    },
  ];

  return (
    <div className="home bg-white"> {/* <-- page background set to white */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <section>
          <h2 className="text-3xl font-extrabold text-[#0A1944] mb-10 text-center relative">
            G. Nehru Kuppusamy – Political Profile
            <span className="absolute left-1/2 -bottom-2 w-20 h-1 bg-[#0A1944] rounded-full transform -translate-x-1/2"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profilePoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg 
                           bg-white hover:bg-amber-100 hover:shadow-md transition duration-200"
              >
                <div className="flex-shrink-0">{point.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {point.title}
                  </h3>
                  <p className="text-gray-700">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
