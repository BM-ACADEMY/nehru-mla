import React from "react";
import Logo1 from "../assets/logopdf.png";
import "../App.css";

const PledgeCard = ({
  name = "md arsath",
  date = "29/08/2025",
  phone = "+91-98765-43210",
  link = "http://localhost:5173/join-form",
  userPhoto = null,
}) => {
  return (
    <div className="pledge-card">
      {/* ========= TOP SECTION ========= */}
      <div className="pledge-header">
        <img src={Logo1} alt="Main Logo" className="votechori-logo" />
        {userPhoto && <img src={userPhoto} alt="User" className="user-photo" />}
      </div>

      {/* Date */}
      <div className="pledge-date">
        Date: <span className="underline">{date}</span>
      </div>

      {/* Trust Title */}
      <div className="trust-info">
        <h1 className="trust-title">மனித நேய மக்கள் சேவை இயக்கம்</h1>
        <h2 className="trust-subtitle">புதுச்சேரி</h2>
        <p className="trust-reg">(Reg. No: 558/2004)</p>
      </div>

      <hr className="divider" />

      {/* Campaign Statement */}
      <div className="pledge-statement">
        <p>
          I, <span className="name">{name}</span>, solemnly stand with{" "}
          <span className="highlight">Puducherry</span> for its rightful{" "}
          <strong>State Recognition</strong>.
        </p>
      </div>

      <hr className="divider" />

      {/* ========= SIGNATURES ========= */}
      <div className="pledge-signatures">
        <div>
          <div className="signature"></div>
          <p className="role-label">PRESIDENT</p>
        </div>
        <div>
          <div className="signature"></div>
          <p className="role-label">SECRETARY</p>
        </div>
      </div>
    </div>
  );
};

export default PledgeCard;
