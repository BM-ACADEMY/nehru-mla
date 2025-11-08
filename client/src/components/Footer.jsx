// src/components/Footer.jsx
import React from "react";
import logo from "../assets/NEYAM.png"; // ✅ Import your logo

export default function Footer() {

  const year = new Date ().getFullYear();
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        {/* Logo + About */}
        <div className="md:max-w-96">
          {/* Logo */}
          <a
            href="https://neyampuducherry.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <img src={logo} alt="Neyam Logo" className="h-10 w-auto" />
          </a>

          <p className="mt-6 text-sm">
            Working Together for a Stronger, Inclusive, and Sustainable Puducherry.
          </p>
        </div>

        {/* Links + Contact */}
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+91-98765-43210</p>
              <p>contact@neyampuducherry.com</p>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        &copy; {year}{" "}
        <a
          href="https://bmtechx.in"
          target="_blank"
          className="hover:underline font-medium"
        >
          BMTechx.in
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
}
