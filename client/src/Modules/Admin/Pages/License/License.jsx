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

  /* Fetch Licenses */
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

  /* Approve License */
  const handleApprove = async (id) => {
    try {
      const res = await API.post(`${API_URL}${id}/approve/`);
      toast.success("License approved");

      fetchLicenses();

      if (res.data?.whatsapp_link) {
        toast.info(
          <a
            href={res.data.whatsapp_link}
            target="_blank"
            className="text-white underline"
          >
            Share on WhatsApp
          </a>,
          { autoClose: 7000 }
        );
      }
    } catch {
      toast.error("Failed to approve");
    }
  };

  /* Delete License */
  const confirmDelete = (license) => {
    setDeleteTarget(license);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`${API_URL}${deleteTarget._id}/`);
      toast.success("License deleted");
      setDeleteTarget(null);
      fetchLicenses();
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading license requests...
      </p>
    );

  return (
    <div className="p-6 bg-white min-h-screen">
      <ToastContainer autoClose={2000} transition={Slide} />

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
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-5"
            >
              {/* PHOTO + INFO */}
              <div className="flex items-center gap-4">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt="photo"
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

              {/* STATUS + ACTIONS */}
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

                <div className="flex gap-2">
                  {!item.is_approved && (
                    <button
                      onClick={() => handleApprove(item._id)}
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

              {/* PDF Download */}
              {item.is_approved && item.license_pdf && (
                <a
                  href={item.license_pdf}
                  target="_blank"
                  className="mt-3 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Download size={16} className="mr-1" /> Download License
                </a>
              )}

              {/* WhatsApp Share */}
              {item.is_approved && (
                <a
                  href={`https://api.whatsapp.com/send?phone=91${item.phone}&text=${encodeURIComponent(
                    `🎉 Hello ${item.name}! Your membership card has been approved.\n\nDownload here:\n${window.location.origin}/#/license-download`
                  )}`}
                  target="_blank"
                  className="mt-2 inline-flex items-center text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  <svg
                    fill="currentColor"
                    width="18"
                    viewBox="0 0 24 24"
                    className="mr-1"
                  >
                    <path d="M12 0C5.4 0 0 5.2 0 11.6c0 2.1.6 4.2 1.7 6L0 24l6.4-1.7c1.8.9 3.8 1.4 5.6 1.4 6.6 0 12-5.2 12-11.6S18.6 0 12 0zm0 21.3c-1.7 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.6-.2-.4c-1-1.5-1.5-3.2-1.5-5 0-5 4.2-9.1 9.4-9.1s9.4 4.1 9.4 9.1c0 5.1-4.2 9.1-9.4 9.1zm5.2-6c-.3-.1-1.7-.9-2-.9-.3 0-.4.1-.6.4-.2.3-.7.9-.9 1-.2.1-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.4-1-.8-1.7-1.8-1.9-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.2-.2.2-.3.3-.5.1-.2.1-.3 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6 0 1.5 1.1 3 1.2 3.2.1.2 2.1 3.3 5.2 4.5.7.3 1.2.4 1.6.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.1-.4-.3-.7-.4z" />
                  </svg>
                  WhatsApp
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* DELETE POPUP */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-96 text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-3">
              Delete License?
            </h3>

            <p className="text-gray-700 mb-4">
              Are you sure you want to delete <br />
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
