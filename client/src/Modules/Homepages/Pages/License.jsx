import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Enhanced Membership (License) form with polished styling, preview,
 * accessible labels, validation hints and the project color palette:
 * - Deep blue:  #002855 / #0033A0
 * - Campaign red: #D62828
 * - Accent yellow: #FFD700
 * - Neutral backgrounds & white
 */
export default function License() {
  const [formData, setFormData] = useState({
    name: "",
    aadhar_number: "",
    phone: "",
    address: "",
    photo: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0] ?? null;
      setFormData((s) => ({ ...s, photo: file }));
      if (file) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  const validate = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return false;
    }
    if (!formData.aadhar_number.trim() || formData.aadhar_number.length < 4) {
      toast.error("Please enter a valid Aadhar number.");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      toast.error("Please enter a valid phone number.");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your address.");
      return false;
    }
    if (!formData.photo) {
      toast.error("Please upload a photo.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v ?? ""));

    try {
      const res = await axios.post(`${API_BASE_URL}/license/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Membership application submitted successfully!");
      console.log("License created:", res.data);

      // Reset
      setFormData({
        name: "",
        aadhar_number: "",
        phone: "",
        address: "",
        photo: null,
      });
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error submitting license:", error);
      const msg =
        error.response?.data?.detail ||
        (error.response?.data && JSON.stringify(error.response.data)) ||
        "Failed to submit. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-12 bg-gradient-to-b from-[#f8fafc] to-[#fff6f6]">
      <div className="w-full max-w-3xl mx-auto px-6">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#D62828]">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-6 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#F2E205]">
            <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center shadow">
              {/* small emblem circle */}
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#D62828] font-bold">
                NM
              </div>
            </div>

            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Membership Card Application
              </h1>
              <p className="text-sm opacity-90 mt-1">Urupinar Attai — உறுப்பினர் அட்டை</p>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
            {/* Left: Form */}
            <form
              onSubmit={handleSubmit}
              className="md:col-span-2 space-y-4"
              aria-label="Membership application form"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name / முழு பெயர்
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. M. Arshath"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar number
                  </label>
                  <input
                    name="aadhar_number"
                    value={formData.aadhar_number}
                    onChange={handleChange}
                    placeholder="XXXX-XXXX-XXXX"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9xxxxxxxxx"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full postal address"
                  rows={4}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0033A0]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo (Passport size)
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                             file:bg-gradient-to-r file:from-[#0033A0] file:via-[#D62828] file:to-[#F2E205] file:text-white cursor-pointer"
                  required
                />
                <p className="text-xs text-gray-400 mt-2">
                  Accepted: JPG, PNG. Max recommended size: 2MB.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-3 justify-center w-full md:w-auto px-6 py-3 rounded-full font-semibold text-white shadow-lg
                             bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] hover:scale-105 transition-transform disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>

            {/* Right: Preview & Summary */}
            <aside className="md:col-span-1 bg-[#002855] text-white rounded-lg p-4 flex flex-col items-center gap-4">
              <div className="w-40 h-40 rounded-md bg-white/5 flex items-center justify-center overflow-hidden border-4 border-white/20">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center px-2">
                    <div className="text-sm opacity-80">Photo Preview</div>
                    <div className="text-xs mt-1 text-[#FFD700] italic">Upload a photo to preview</div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <h3 className="font-bold text-lg">Apply for Membership</h3>
                <p className="text-sm text-gray-200 mt-2 max-w-[220px]">
                  Fill this form to apply for the official membership card. We'll
                  review and contact you once approved.
                </p>
              </div>

              <div className="w-full border-t border-white/10 pt-3 text-sm text-gray-200">
                <div className="flex justify-between mb-1">
                  <span className="opacity-90">Processing time</span>
                  <span className="font-semibold">3–7 business days</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Support</span>
                  <a
                    href="tel:+919000000000"
                    className="text-[#FFD700] font-semibold"
                  >
                    +91 90000 00000
                  </a>
                </div>
              </div>
            </aside>
          </div>

          {/* Footer note */}
          <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600">
            <div className="max-w-3xl mx-auto">
              By submitting this application you agree to our data usage policy — your
              information will be used only for membership processing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
