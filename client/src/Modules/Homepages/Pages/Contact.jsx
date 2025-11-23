import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-red-50 py-20 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0033A0]/10 via-[#D62828]/10 to-black/10 mix-blend-multiply"></div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12">
        {/* 🩵 Title Section */}
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black bg-clip-text text-transparent drop-shadow-md text-center mb-10">
          Contact <span className="text-[#D62828]">Us</span>
        </h2>
        <div className="mx-auto w-32 h-1.5 bg-gradient-to-r from-[#0033A0] via-[#D62828] to-black rounded-full mb-12 shadow-lg"></div>

        <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 space-y-8 border border-gray-100">
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto leading-relaxed">
            Reach out to the office through the details below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

            {/* 📍 Address */}
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 mb-3 text-[#0033A0]" />
              <h3 className="font-semibold text-xl bg-gradient-to-r from-[#0033A0] to-[#D62828] bg-clip-text text-transparent">
                Office Address
              </h3>
              <p className="text-gray-600 mt-2 leading-relaxed">
                No.24, New Iyyanar Koil Street,
                <br />
                Vasugi Nagar,
                <br />
                Kosapalayam,
                <br />
                Puducherry – 605013
              </p>
            </div>

            {/* 🏛 MLA Details */}
            <div className="flex flex-col items-center">
              <h3 className="font-semibold text-xl bg-gradient-to-r from-[#0033A0] to-[#D62828] bg-clip-text text-transparent mb-3">
                MLA – Orleanpet
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Party: All India N.R. Congress
                <br />
                Name: G. Nehru (a) Kuppusamy
              </p>
            </div>

            {/* 📞 Phone */}
            <div className="flex flex-col items-center">
              <Phone className="w-12 h-12 mb-3 text-black" />
              <h3 className="font-semibold text-xl bg-gradient-to-r from-[#0033A0] to-[#D62828] bg-clip-text text-transparent">
                Contact Numbers
              </h3>
              <p className="text-[#0033A0] font-medium mt-2">
                Office: 0413 – 2220602, 2232261
              </p>
              <a
                href="tel:+919843048384"
                className="text-[#D62828] hover:text-[#0033A0] font-medium transition"
              >
                Mobile: 98430-48384
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
