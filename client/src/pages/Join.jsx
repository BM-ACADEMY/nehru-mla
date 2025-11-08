// src/pages/JoinSection.jsx
import React, { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import QRCode from "qrcode"; // npm install qrcode
import bannerUrl from "../assets/BannerN2.png";

const JoinSection = () => {
  const formRef = useRef();
  const [photo, setPhoto] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);

  useEffect(() => {
    fetch(bannerUrl)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => setBannerImg(reader.result);
        reader.readAsDataURL(blob);
      });
  }, []);

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setPhoto(event.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = async () => {
    const doc = new jsPDF("landscape", "pt", [600, 300]);
    const form = formRef.current;

    const name = form.name.value || "Full Name";
    const booth = form.booth.value || "Booth No";
    const phone = form.phone.value || "Phone";
    const constituency = form.constituency.value || "...";
    const district = form.district.value || "...";

    // --- Card Base with blue border ---
    const borderWidth = 5;
    doc.setFillColor(0, 48, 135); // deep blue border
    doc.roundedRect(0, 0, 600, 300, 20, 20, "F");

    doc.setFillColor(255); // white inner card
    doc.roundedRect(borderWidth, borderWidth, 600 - 2 * borderWidth, 300 - 2 * borderWidth, 15, 15, "F");

    // --- Banner Top Right ---
    if (bannerImg) {
      try {
        doc.addImage(bannerImg, "PNG", 430, 30, 140, 70);
      } catch (e) {
        console.error("Banner image error", e);
      }
    }

    // --- Header ---
    doc.setFontSize(18);
    doc.setTextColor(0); // black
    doc.setFont("helvetica", "bold");
    doc.text("Tamil Nadu Victory Party", 40, 60);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("For the welfare of every citizen!", 40, 78);

    // --- Member Photo (left) ---
    const photoX = 40;
    const photoY = 100;
    const photoSize = 100;

    if (photo) {
      try {
        const imgType = photo.includes("png") ? "PNG" : "JPEG";
        doc.addImage(photo, imgType, photoX, photoY, photoSize, photoSize, undefined, "FAST");
      } catch (e) {
        console.error("Member photo error", e);
      }
    } else {
      doc.setDrawColor(0);
      doc.setLineWidth(1);
      doc.circle(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, "S");
      doc.setFontSize(10);
      doc.text("No Photo", photoX + 15, photoY + 55);
    }

    // --- QR Code (right) ---
    const qrX = 460;
    const qrY = 120;
    const qrSize = 100;
    try {
      const qrData = `Name: ${name}, Phone: ${phone}, Booth: ${booth}`;
      const qrImg = await QRCode.toDataURL(qrData);
      doc.addImage(qrImg, "PNG", qrX, qrY, qrSize, qrSize);
    } catch (e) {
      console.error("QR code error", e);
    }

    // --- Member Info (center) ---
    let infoX = 160;
    let infoY = 110;
    const lineSpacing = 25;

    const drawInfo = (label, value) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text(`${label}: `, infoX, infoY);
      doc.setFont("helvetica", "normal");
      doc.text(value, infoX + label.length * 6 + 10, infoY);
      infoY += lineSpacing;
    };

    drawInfo("Name", name);
    drawInfo("Booth No", booth);
    drawInfo("Constituency", constituency);
    drawInfo("District", district);
    drawInfo("State", "Tamil Nadu");

    // --- Signature Box ---
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.setFillColor(240); // light gray
    doc.rect(430, 230, 140, 40, "F");
    doc.setFontSize(10);
    doc.setTextColor(0);
    doc.text("Leader Signature", 445, 255);

    doc.save("membership-card.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-black mb-4">
          Join Our Party
        </h1>
        <form ref={formRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            {photo ? (
              <img
                src={photo}
                alt="member"
                className="w-40 h-40 object-cover rounded-full border-2 border-gray-300"
              />
            ) : (
              <div className="w-40 h-40 border-2 border-gray-300 rounded-full flex items-center justify-center">
                Photo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-4"
            />
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
            />
            <input
              type="text"
              name="booth"
              placeholder="Booth No"
              className="border p-3 rounded-lg"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="border p-3 rounded-lg"
            />
            <select name="constituency" className="border p-3 rounded-lg">
              <option value="">Select Constituency</option>
              <option value="Constituency A">Constituency A</option>
              <option value="Constituency B">Constituency B</option>
            </select>
            <select name="district" className="border p-3 rounded-lg">
              <option value="">Select District</option>
              <option value="District A">District A</option>
              <option value="District B">District B</option>
            </select>
            <button
              type="button"
              onClick={handleDownload}
              className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
            >
              Download Membership Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinSection;
