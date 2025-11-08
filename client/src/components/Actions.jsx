import React from "react";
import { Building2, GraduationCap, ShieldCheck } from "lucide-react";
import safety from "../assets/womens safety.jpg";
import bridge from "../assets/bridge.jpg";
import education from "../assets/education.png"; // <- import local image

export default function Actions() {
  const actions = [
    {
      title: "Strengthening Infrastructure",
      desc: "Advocating for smart urban planning to reduce congestion and pollution.",
      icon: <Building2 className="w-12 h-12 text-[#0A1944]" />,
      img: bridge,
    },
    {
      title: "Empowering Youth & Education",
      desc: "Scholarships for underprivileged students.",
      icon: <GraduationCap className="w-12 h-12 text-[#0A1944]" />,
      img: education, // <- use the imported variable
    },
    {
      title: "Women’s Safety & Empowerment",
      desc: "Advocacy for stricter laws against gender-based violence.",
      icon: <ShieldCheck className="w-12 h-12 text-[#0A1944]" />,
      img: safety,
    },
  ];

  return (
    <section className="py-20 px-6 md:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#16182F]">
          Our Key Initiatives
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Driving change with a focus on progress, inclusivity, and sustainability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {actions.map((action, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition transform hover:-translate-y-2"
          >
            <div className="h-40 w-full overflow-hidden">
              <img
                src={action.img}
                alt={action.title}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
            <div className="p-8 text-center">
              <div className="flex justify-center items-center mb-4">
                {action.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {action.title}
              </h3>
              <p className="text-gray-600">{action.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
