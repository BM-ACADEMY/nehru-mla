// src/components/Achievement.jsx
import React from "react";
import Image1 from "../assets/Nehru1.png"
import Image2 from "../assets/Nehru2.png"
import Image3 from "../assets/Nehru3.png"
import Image4 from "../assets/Nehru4.png"

const achievements = [
  {
    title: "Standing together in Protest",
    description: "Actively participated in community and political movements to voice public concerns and advocate for social justice.",
    image: Image1 // Replace with your image path
  },
//   {
//     title: "Political Experience",
//     description: "Elected as MLA from Orleanpet in 2011 and 2021, actively contributing to local governance, policy-making, and community development initiatives.",
//     // image: Image2
//   },
  {
    title: "Media Interaction on Public Matters",
    description: "Regularly engages with newspapers, TV, and digital media to inform citizens about policies, initiatives, and local issues.",
    image: Image3
  },
  {
    title: "Supports in Natural Disaster",
    description: "Actively participated in relief efforts during natural disasters, providing aid, resources, and community support to affected citizens.",
    image: Image4
  },
//   {
//     title: "Electoral Success",
//     description: "Won multiple elections, including the 2021 Orleanpet seat as an independent candidate, demonstrating strong public support and leadership.",
//     image: "/images/election.png"
//   }
];


export default function Achievement() {
  return (
    <section className="py-16 bg-gray-50" id="achievements">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-extrabold text-[#16182F] text-center mb-10">
      Services
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {achievements.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <img src={item.image} alt={item.title} />
          <h3 className="text-xl  md:text-2xl font-semibold  text-[#16182F] mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

  );
}
