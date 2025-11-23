// LicenseCardPdf.jsx
import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "../../../api";
import { toast } from "react-toastify";

// ⭐ IMPORT LOGO
import logo from "../../../assets/banner/nehru_logo.png";

export default function LicenseCardPdf({ license = {} }) {
  const cardRef = useRef();
  const [loading, setLoading] = useState(false);

  /* ----------------------- SANITIZE ----------------------- */
  const sanitize = (str) =>
    !str || typeof str !== "string"
      ? "Member"
      : str.replace(/[^a-zA-Z0-9 _-]/g, "").replace(/\s+/g, "_");

  const safeName = sanitize(license.name);

  /* ----------------------- DOWNLOAD PDF ----------------------- */
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

  /* ----------------------- APPROVE + UPLOAD ----------------------- */
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
      toast.error("Upload failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  /* ----------------------- FALLBACK VALUES ----------------------- */
  const photo = license.photo || "/static/default_photo.jpg";

  const name = license.name || "Member";
  const aadhar = license.aadhar_number || "xxxx-xxxx-xxxx";
  const phone = license.phone || "9xxxxxxxxx";
  const address = license.address || "Address";

  /* ----------------------- CARD DESIGN ----------------------- */
  return (
    <div className="p-8">
      <div
        ref={cardRef}
        style={{
          width: 650,
          height: 420,
          background: "#ffffff",
          borderRadius: 16,
          border: "5px solid #0033A0",
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
            paddingLeft: 18,
            background:
              "linear-gradient(90deg, #D40000 30%, #FFFFFF 30% 60%, #FCD200 60%)",
            borderBottom: "4px solid #0033A0",
          }}
        >
          <div
            style={{
              width: 75,
              height: 75,
              borderRadius: "50%",
              background: "#fff",
              border: "3px solid #0033A0",
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
                fontWeight: 900,
                color: "#0033A0",
              }}
            >
              NAMATHU MAKKAL KAZHAGAM
            </h1>
            <p
              style={{
                margin: 0,
                marginTop: 4,
                fontSize: 14,
                fontWeight: 600,
                color: "#0033A0",
              }}
            >
              Official Membership Identification Card
            </p>
          </div>
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
          {/* LEFT SIDE */}
          <div>
            <div
              style={{
                width: 160,
                height: 185,
                borderRadius: 12,
                overflow: "hidden",
                border: "4px solid #D40000",
              }}
            >
              <img
                src={photo}
                crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                marginTop: 15,
                background: "#F7F9FC",
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #CBD4E1",
                width: 160,
              }}
            >
              <p style={{ margin: 4, fontSize: 14 }}>
                <strong style={{ color: "#0033A0" }}>Name:</strong> {name}
              </p>
              <p style={{ margin: 4, fontSize: 14 }}>
                <strong style={{ color: "#0033A0" }}>Aadhar:</strong> {aadhar}
              </p>
              <p style={{ margin: 4, fontSize: 14 }}>
                <strong style={{ color: "#0033A0" }}>Phone:</strong> {phone}
              </p>
              <p style={{ margin: 4, fontSize: 14 }}>
                <strong style={{ color: "#0033A0" }}>Address:</strong> {address}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "#0033A0",
                border: "6px solid #FCD200",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: 36,
              }}
            >
              NMK
            </div>

            <div style={{ marginTop: 12, textAlign: "center" }}>
              <div
                style={{
                  width: 160,
                  borderBottom: "3px solid #0033A0",
                  margin: "0 auto",
                }}
              />
              <p style={{ fontSize: 12, marginTop: 4, color: "#0033A0" }}>
                Authorized Signature
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "#0033A0",
            fontWeight: 500,
          }}
        >
          Official Document • Verify at NMK.IN • Do Not Duplicate
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadPdf}
          className="px-5 py-2 bg-blue-600 text-white rounded-md"
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
