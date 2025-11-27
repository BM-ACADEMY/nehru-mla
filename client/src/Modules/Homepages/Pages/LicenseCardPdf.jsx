// LicenseCardPdf.jsx
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "../../../api";
import { toast } from "react-toastify";
import signature from "../../../assets/banner/signature.png";
import personImage from "../../../assets/banner/Untitled design.png";
import qrcode from "../../../assets/banner/qrcode.svg";

import logo from "../../../assets/banner/nehru_logo.png";

export default function LicenseCardPdf({ license = {} }) {
  const cardRef = useRef();
  const [loading, setLoading] = useState(false);

  const sanitize = (str) =>
    !str || typeof str !== "string"
      ? "Member"
      : str.replace(/[^a-zA-Z0-9 _-]/g, "").replace(/\s+/g, "_");

  const safeName = sanitize(license.name);

  const downloadPdf = async () => {
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [650, 420],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 650, 420);
      pdf.save(`NEHRU_MLA_${safeName}.pdf`);
    } catch (err) {
      toast.error("PDF generation failed");
    }
  };

  const approveAndUpload = async () => {
    try {
      setLoading(true);

      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [650, 420],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 650, 420);

      const pdfBlob = pdf.output("blob");

      const formData = new FormData();
      formData.append("pdf_file", pdfBlob, `NEHRU_MLA_${safeName}.pdf`);

      const res = await API.post(
        `/license/license/${license._id}/upload_pdf/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const whatsLink = res.data.whatsapp_link;

      toast.success("Approved successfully!");
      navigator.clipboard.writeText(whatsLink);
      toast.info("WhatsApp link copied!");

      setTimeout(() => {
        window.open(whatsLink, "_blank", "noopener,noreferrer");
      }, 200);
    } catch (err) {
      toast.error(
        "Upload failed: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const photo = license.photo || "/static/default_photo.jpg";

  const name = license.name || "Member";
  const aadhar = license.aadhar_number || "xxxx-xxxx-xxxx";
  const phone = license.phone || "9xxxxxxxxx";
  const address = license.address || "Address";

  return (
    <div className="p-8">
      <div
        ref={cardRef}
        style={{
          width: 650,
          height: 420,
          background: "#ffffff",
          border: "1px solid #0a0a0aad",
          padding: 0,
          position: "relative",
          overflow: "hidden",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            height: 90,
            display: "flex",
            alignItems: "center",
            paddingLeft: 28,

            // ⭐ NEW CLEAN RED–WHITE–RED HEADER LIKE REFERENCE IMAGE
            background: "linear-gradient(to bottom, #fa180e)",

            borderBottom: "1px solid #0a0a0aad",
          }}
        >
          <div
            style={{
              width: 75,
              height: 75,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 20,
            }}
          >
            <img
              src={logo}
              crossOrigin="anonymous"
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "50%",
              }}
            />
          </div>

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 700,
                color: "white",
              }}
            >
              NAMATHU MAKKAL KAZHAGAM
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                textAlign: "center",
                fontWeight: 600,
                color: "white",
              }}
            >
              Official Membership Identification Card
            </p>
          </div>
        </div>
        

        <div
            style={{
              textAlign: "center",
              marginBottom: "1px",
              marginTop: "12px",
              width: "100%",
              // This container should fill the space above the details row
            }}
          >
            <span
              style={{
                padding: "4px 15px",
                borderRadius: "15px",
                color: "red",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              உறுப்பினர் அட்டை
            </span>
          </div>

        {/* BODY */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "18px 22px",
            height: 275,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1, // Ensure it is behind the text/details (which are zIndex 5)
              opacity: 0.08, // Set high transparency
              pointerEvents: "none", // Prevent click events
            }}
          >
            <img
              src={logo} 
              alt="Background Watermark"
              crossOrigin="anonymous"
              style={{
                width: "300px", // Large size for watermark effect
                height: "300px",
                objectFit: "contain",
              }}
            />
          </div>

          
          {/* LEFT SIDE (PHOTO + DETAILS SIDE BY SIDE) */}
          <div style={{ display: "flex", gap: 65 }}>
            {/* PHOTO */}
                <div
                style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    gap: 5, // Space between photo and QR
                }}
            >
                {/* PHOTO */}
                <div
                    style={{
                        width: 160,
                        height: 185,
                        borderRadius: 5,
                        overflow: "hidden",
                        border: "1px solid black",
                        flexShrink: 0,
                    }}
                >
                    <img
                        src={photo}
                        crossOrigin="anonymous"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                
                {/* QR CODE */}
                <img
                    src={qrcode} 
                    alt="QR Code"
                    crossOrigin="anonymous"
                    style={{
                      width: 60,
                      height: 60,
                      alignSelf: "flex-start",
                      marginTop: 5,
                    }}
                />
            </div>
            

            {/* DETAILS RIGHT OF PHOTO */}
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                width: 320,
                height: 185,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              {/* ROW 1 */}
              <div style={{ display: "flex", fontSize: 14 }}>
                <span style={{ width: 90, fontWeight: 700, color: "#0033A0" }}>
                  Name
                </span>
                <span>{name}</span>
              </div>

              {/* ROW 2 */}
              <div style={{ display: "flex", fontSize: 14 }}>
                <span style={{ width: 90, fontWeight: 700, color: "#0033A0" }}>
                  Aadhar
                </span>
                <span>{aadhar}</span>
              </div>

              {/* ROW 3 */}
              <div style={{ display: "flex", fontSize: 14 }}>
                <span style={{ width: 90, fontWeight: 700, color: "#0033A0" }}>
                  Phone
                </span>
                <span>{phone}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (SIGNATURE) */}
          <div
            style={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end", // ⭐ THIS FIXES ALIGNMENT
            padding: "0 20px",
            fontSize: 12,
            color: "#3a3939ad",
            fontWeight: 500,
          }}
        >
        

          {/* Bottom Right */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "20px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "150px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: -22,
                    right: -110,
                    display: "flex",
                    zIndex: "99",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={signature}
                    alt="signature"
                    style={{
                      width: 110,
                      height: "auto",
                      objectFit: "contain",
                      marginBottom: 0,
                    }}
                  />
                  <div
                    style={{ color: "#0033A0", fontWeight: 600, marginTop: -2 }}
                  >
                    Authorized Signature
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  width: 260,
                  height: 270,
                }}
              >
                <img
                  src={personImage}
                  alt="Person"
                  style={{
                    position: "absolute",
                    bottom: -30,
                    right: -40,
                    width: 300,
                    height: 300,
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadPdf}
          className="px-5 py-2 bg-red-600 text-white rounded-md"
        >
          Download PDF
        </button>

        <button
          onClick={approveAndUpload}
          disabled={loading}
          className="px-5 py-2 bg-green-600 text-white rounded-md"
        >
          {loading ? "Approving..." : "Approve & Upload"}
        </button>
      </div>
    </div>
  );
}