import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/complaints/complaints/`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      toast.warn("⚠️ Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(API_URL, formData);

      toast.success("Complaint submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("❌ Failed to submit complaint. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#D40000]/10 via-white to-[#0033A0]/10 py-16 px-4 md:px-12">
      <ToastContainer position="top-right" autoClose={2000} transition={Slide} />

      {/* NMK Styled Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-14 border-t-[10px] border-[#D40000]">

        {/* Title Section */}
        <h2 className="text-4xl font-extrabold text-center mb-3 bg-gradient-to-r from-[#D40000] via-[#0033A0] to-[#FCD200] bg-clip-text text-transparent">
          Submit a Complaint
        </h2>

        <div className="w-24 h-1.5 bg-gradient-to-r from-[#D40000] to-[#0033A0] mx-auto rounded-full"></div>

        <p className="text-center text-gray-600 mt-5 mb-10">
          Your voice matters. Share your concerns with the NMK team 👇
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0033A0] focus:border-[#0033A0]"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#D40000] focus:border-[#D40000]"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email (optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0033A0]"
              placeholder="you@example.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#D40000]"
              placeholder="Complaint subject"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-2">Complaint Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0033A0]"
              placeholder="Describe your complaint..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-[#D40000] via-[#0033A0] to-[#000000] text-white font-bold px-10 py-3 rounded-full shadow-lg hover:scale-105 transition-all disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Complaint;
