import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function License() {
  const [formData, setFormData] = useState({
    name: "",
    aadhar_number: "",
    phone: "",
    address: "",
    photo: null,
  });

  const [checking, setChecking] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneAvailable, setPhoneAvailable] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // LIVE PHONE CHECK
  const checkPhone = async (number) => {
    if (number.length !== 10) {
      setPhoneAvailable(null);
      setPhoneMessage("");
      return;
    }

    setChecking(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/license/license/check_phone/`,
        { params: { phone: number } }
      );

      if (res.data.available) {
        setPhoneAvailable(true);
        setPhoneMessage("Phone number is available ✓");
      } else {
        setPhoneAvailable(false);
        setPhoneMessage("This phone number is already registered ✗");
      }
    } catch {
      setPhoneAvailable(false);
      setPhoneMessage("Server error checking number");
    }
    setChecking(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "phone") {
      const v = value.replace(/\D/g, "");
      setFormData((s) => ({ ...s, phone: v }));
      checkPhone(v);
      return;
    }

    if (name === "photo") {
      const file = files?.[0] ?? null;
      setFormData((s) => ({ ...s, photo: file }));
      setPreviewUrl(file ? URL.createObjectURL(file) : null);
      return;
    }

    setFormData((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return toast.error("Enter full name");
    if (!formData.aadhar_number.trim()) return toast.error("Enter Aadhar number");
    if (formData.phone.length !== 10) return toast.error("Enter 10-digit phone number");
    if (phoneAvailable === false) return toast.error("Phone already registered!");
    if (!formData.address.trim()) return toast.error("Enter address");
    if (!formData.photo) return toast.error("Upload a photo");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v ?? ""));

    try {
      const url = `${API_BASE_URL}/license/license/`;
      await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Membership application submitted!");

      // reset
      setFormData({ name: "", aadhar_number: "", phone: "", address: "", photo: null });
      setPreviewUrl(null);
      setPhoneMessage("");
      setPhoneAvailable(null);

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error(error.response?.data?.error || "Submission failed");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center py-12 bg-gradient-to-b from-[#f8fafc] to-[#fff6f6]">
      <div className="w-full max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#D62828]">

          {/* HEADER */}
          <div className="flex items-center gap-4 px-6 py-6 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-[#F2E205]">
            <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center shadow">
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#D62828] font-bold">NM</div>
            </div>
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-extrabold">Membership Card Application</h1>
              <p className="text-sm opacity-90 mt-1">Urupinar Attai — உறுப்பினர் அட்டை</p>
            </div>
          </div>

          {/* BODY */}
          <div className="px-6 md:px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">

            {/* FORM */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-md" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* AADHAR */}
                <div>
                  <label className="block text-sm font-medium">Aadhar Number</label>
                  <input name="aadhar_number" value={formData.aadhar_number} onChange={handleChange}
                    className="w-full border px-4 py-3 rounded-md" />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} maxLength={10}
                    className="w-full border px-4 py-3 rounded-md" />

                  {/* LIVE MESSAGE */}
                  {phoneMessage && (
                    <p className={`text-xs mt-1 ${phoneAvailable ? "text-green-600" : "text-red-600"}`}>
                      {checking ? "Checking..." : phoneMessage}
                    </p>
                  )}
                </div>

              </div>

              {/* ADDRESS */}
              <div>
                <label className="block text-sm font-medium">Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange}
                  rows="4" className="w-full border px-4 py-3 rounded-md"></textarea>
              </div>

              {/* PHOTO */}
              <div>
                <label className="block text-sm font-medium">Upload Photo</label>
                <input type="file" name="photo" accept="image/*"
                  ref={fileInputRef} onChange={handleChange}
                  className="block w-full text-sm" />
              </div>

              <button disabled={submitting}
                className="px-6 py-3 bg-gradient-to-r from-[#D62828] via-[#0033A0] to-[#F2E205] text-white rounded-full shadow-lg">
                {submitting ? "Submitting..." : "Submit Application"}
              </button>

            </form>

            {/* PREVIEW */}
            <aside className="md:col-span-1 bg-[#002855] text-white p-4 rounded-lg text-center">
              <div className="w-40 h-40 bg-white/10 border rounded-md flex items-center justify-center mx-auto overflow-hidden">
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-300">Photo Preview</span>
                )}
              </div>
            </aside>

          </div>

          <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600">
            Your details are used only for membership processing.
          </div>

        </div>
      </div>
    </div>
  );
}
