import React from "react";

const worksData = [
  { title: "Project 1", desc: "Description of Project 1" },
  { title: "Project 2", desc: "Description of Project 2" },
  { title: "Project 3", desc: "Description of Project 3" },
];

export default function Works() {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">Our Works</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {worksData.map((work, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-xl mb-2">{work.title}</h3>
            <p className="text-gray-600">{work.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
