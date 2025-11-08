// src/pages/JoinSection.jsx
import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import bannerUrl from "../assets/BannerN2.png";

// List of Puducherry areas
const puducherryAreas = [
  "Puducherry City",
  "Ariyankuppam",
  "Bahour",
  "Villianur",
  "Thirubuvanai",
  "Kurumbapet",
  "Mudaliarpet",
  "Uppalam",
  "Orleampeth",
  "Reddiarpalayam",
  "Karaikal Town",
  "Thirunallar",
  "Kottakuppam",
  "Muthialpet",
  "Neravy",
  "Kottucherry",
  "T.R. Pattinam",
  "Nedungadu",
  "Mahe Town",
  "Chalakkara",
  "Palloor",
  "Cherukallayi",
  "Yanam Town",
  "Mettakur",
  "Darial",
  "Farampeta"
];

const JoinSection = () => {
  const formRef = useRef();
  const [photo, setPhoto] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  // Load banner
  useEffect(() => {
    fetch(bannerUrl)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => setBannerImg(reader.result);
        reader.readAsDataURL(blob);
      });
  }, []);

  // Photo upload handler
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setPhoto(event.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const data = {
      name: form.name.value || "Full Name",
      phone: form.phone.value || "Phone",
      state: form.state.value || "Puducherry",
      area: form.area.value || "N/A",
    };
    setFormData(data);
    setSubmitted(true);
  };

  // Download PDF
  const handleDownload = async () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: [600, 300] });
    const { name, phone, state, area } = formData;

    // Card Base
    const borderWidth = 5;
    doc.setFillColor(0, 48, 135);
    doc.roundedRect(0, 0, 600, 300, 20, 20, "F");
    doc.setFillColor(255);
    doc.roundedRect(borderWidth, borderWidth, 600 - 2 * borderWidth, 300 - 2 * borderWidth, 15, 15, "F");

    // Banner
    if (bannerImg) {
      try {
        doc.addImage(bannerImg, "PNG", 430, 20, 140, 70);
      } catch (e) {
        console.error("Banner error", e);
      }
    }

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("Puducherry Victory Party", 40, 50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("For the welfare of every citizen!", 40, 68);

    // Photo
    const photoX = 40, photoY = 100, photoSize = 100;
    if (photo) {
      const imgType = photo.includes("png") ? "PNG" : "JPEG";
      doc.addImage(photo, imgType, photoX, photoY, photoSize, photoSize, undefined, "FAST");
    } else {
      doc.setDrawColor(0);
      doc.setLineWidth(1);
      doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2, "S");
      doc.setFontSize(10);
      doc.text("No Photo", photoX + 10, photoY + photoSize / 2 + 5);
    }

    // QR Code
    try {
      const qrData = `Name: ${name}, Phone: ${phone}, State: ${state}, Area: ${area}`;
      const qrImg = await QRCode.toDataURL(qrData);
      doc.addImage(qrImg, "PNG", 460, 100, 100, 100);
    } catch (e) {
      console.error("QR code error", e);
    }

    // Member Info
    let infoX = 160, infoY = 110, lineSpacing = 25;
    const drawInfo = (label, value) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}: `, infoX, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(value, infoX + label.length * 6 + 10, infoY);
      infoY += lineSpacing;
    };
    drawInfo("Name", name);
    drawInfo("Phone", phone);
    drawInfo("State", state);
    drawInfo("Area", area);

    doc.save("membership-card.pdf");
  };

  // Share on WhatsApp
  const handleWhatsAppShare = () => {
    const { name, phone, state, area } = formData;
    const message = `Hello! I just joined Puducherry Victory Party.\nName: ${name}\nPhone: ${phone}\nState: ${state}\nArea: ${area}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-center items-start p-6">
      {!submitted ? (
        <div className="pt-16 w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-6 text-center">Stand with Puducdccherry State</h1>

          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            {photo ? (
              <img src={photo} alt="member" className="w-40 h-40 object-cover rounded-full border-2 border-gray-300" />
            ) : (
              <div className="w-40 h-40 border-2 border-gray-300 rounded-full flex items-center justify-center">Photo</div>
            )}
            <input type="file" accept="image/*" id="photo-upload" onChange={handlePhotoChange} className="hidden" />
            <label htmlFor="photo-upload" className="mt-4 bg-blue-800 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-900 transition">
              Choose Photo
            </label>
          </div>

          {/* Form */}
          <form ref={formRef} className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" className="border p-3 rounded-lg" required />
            <input type="text" name="phone" placeholder="Phone Number" className="border p-3 rounded-lg" required />
            <input type="text" name="state" placeholder="State" className="border p-3 rounded-lg" defaultValue="Puducherry" required />
            
            <select name="area" className="border p-3 rounded-lg" required defaultValue="">
              <option value="" disabled>Select Area</option>
              {puducherryAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>

            <button type="submit" className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="pt-16 w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold mb-4">Thank you for joining us!</h1>
          <p className="mb-6">You can download your membership card or share it on WhatsApp.</p>
          <div className="flex gap-4">
            <button onClick={handleDownload} className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Download Card
            </button>
            <button onClick={handleWhatsAppShare} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
              Share on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinSection;
