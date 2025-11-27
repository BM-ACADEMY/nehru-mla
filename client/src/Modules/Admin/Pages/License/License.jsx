import React, { useEffect, useState } from "react";
import API from "../../../../api";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, Trash2, Download, Clock } from "lucide-react";

export default function LicenseAdmin() {
  const API_URL = `/license/license/`;

  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ---------------- FETCH LICENSE LIST ---------------- */
  const fetchLicenses = async () => {
    try {
      const res = await API.get(API_URL);
      setLicenses(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to fetch licenses");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  /* ---------------- APPROVE (OPEN PDF PAGE) ---------------- */
  const handleApprove = (license) => {
    window.location.href = `/#/admin/license/pdf/${license._id}`;
  };

  /* ---------------- DELETE LICENSE ---------------- */
  const confirmDelete = (license) => setDeleteTarget(license);

  const handleDelete = async () => {
    try {
      await API.delete(`${API_URL}${deleteTarget._id}/`);
      toast.success("License deleted");
      setDeleteTarget(null);
      fetchLicenses();
    } catch {
      toast.error("Failed to delete license");
    }
  };

  /* ---------------- UI ---------------- */
  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading license requests...
      </p>
    );

  return (
    <div className="p-6 bg-white min-h-screen relative">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        transition={Slide}
        newestOnTop
        pauseOnFocusLoss={false}
      />

      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        License Requests
      </h1>

      {licenses.length === 0 ? (
        <p className="text-gray-500">No license requests found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {licenses.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition p-5"
            >
              {/* USER PHOTO + BASIC INFO */}
              <div className="flex items-center gap-4">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt="profile"
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                    No Photo
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">{item.phone}</p>
                  <p className="text-xs text-gray-500">{item.aadhar_number}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700">
                <span className="font-medium">Address:</span> {item.address}
              </p>

              {/* STATUS */}
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`flex items-center gap-1 text-sm font-medium ${
                    item.is_approved ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {item.is_approved ? (
                    <>
                      <CheckCircle size={16} /> Approved
                    </>
                  ) : (
                    <>
                      <Clock size={16} /> Pending
                    </>
                  )}
                </span>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  {!item.is_approved && (
                    <button
                      onClick={() => handleApprove(item)}
                      className="px-3 py-1 bg-[#F7E27A] text-black rounded-md shadow-sm hover:bg-[#e3cf5f] text-sm"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => confirmDelete(item)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* DOWNLOAD + WHATSAPP IF APPROVED */}
              {item.is_approved && (
                <div className="mt-4 flex items-center gap-5">
                  {item.license_pdf && (
                    <a
                      href={item.license_pdf}
                      target="_blank"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Download size={18} className="mr-1" />
                      Download License
                    </a>
                  )}

                  <a
                    href={`https://wa.me/91${item.phone}?text=${encodeURIComponent(
                      `🎉 Hello ${item.name}! Your membership card has been approved.\n\nDownload your certificate:\n${item.license_pdf}`
                    )}`}
                    target="_blank"
                    className="inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* DELETE CONFIRMATION POPUP */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Delete License?
            </h3>

            <p className="text-gray-700 mb-4">
              Are you sure you want to delete: <br />
              <span className="font-semibold">{deleteTarget.name}</span>?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>

              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}