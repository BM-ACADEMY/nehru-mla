import React, { useState, useRef } from "react";
import PledgeCard from "./Pledge";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function JoinForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    profession: "",
    state: "Puducherry",
    area: "",
    userPhoto: null, // ✅ new field
  });

  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, userPhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("PledgeCard.pdf");
  };

  const handleWhatsApp = () => {
    const message = `Thanks for joining us, ${formData.name}!\nState: ${formData.state}\nPhone: ${formData.phone}\nArea: ${formData.area}\n\nI strongly support Puducherry becoming a State!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // ================= AFTER SUBMIT ==================
  if (submitted) {
    return (
      <div
        className="min-h-screen  flex flex-col justify-center items-center"
        style={{ backgroundColor: "#ebf8ff" }}
      >
        <div ref={cardRef}>
          <PledgeCard
            name={formData.name}
            date={new Date().toLocaleDateString()}
            phone={formData.phone}
            link="http://localhost:5173/join-form"
            userPhoto={formData.userPhoto} // ✅ pass photo here
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={handleDownload}
            className="bg-[#0A1944] text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:opacity-90"
          >
            📄 Download Card
          </button>
          <button
            onClick={handleWhatsApp}
            className="bg-green-500 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:opacity-90"
          >
            💬 Share on WhatsApp
          </button>
        </div>
      </div>
    );
  }

  // ================== FORM ==================
  return (
    <div
      className="min-h-screen mx-auto pt-22 flex justify-center items-center"
      style={{ backgroundColor: "#ebf8ff" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border-t-5 border-[#0A1944]"
      >
        <h2 className="pt-10 text-2xl font-bold mb-2 text-[#0A1944] text-center">
          Stand With Puducherry
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Demand to change Puducherry Union Territory to <b>State</b>
        </p>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                name="profession"
                placeholder="Profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* ✅ File Upload with Preview */}
            <div className="mt-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Upload Your Photo:
              </label>
              <div className="flex flex-col items-center">
                <div
                  className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-[#0A1944] transition"
                  onClick={() =>
                    document.getElementById("photoInput").click()
                  }
                >
                  {formData.userPhoto ? (
                    <img
                      src={formData.userPhoto}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm text-center">
                      + Upload
                    </span>
                  )}
                </div>
                <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={nextStep}
                className="bg-[#0A1944] text-white px-6 py-2 rounded-xl"
              >
                Next →
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">State / Union Territory *</option>
                <option value="Puducherry">Puducherry</option>
              </select>
              <input
                type="text"
                name="area"
                placeholder="Your Area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-6 py-2 rounded-xl"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-[#0A1944] text-white px-6 py-2 rounded-xl"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
