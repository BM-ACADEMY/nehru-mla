import React, { useEffect, useState } from "react";
import API from "../../../../api";
import { toast, ToastContainer } from "react-toastify";
import { HiTrash } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = `/complaints/complaints/`;

  /* Fetch Complaints */
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await API.get(API_URL);

      setComplaints(response.data);
      setError("");
    } catch {
      toast.error("Failed to load complaints");
      setError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* Delete Complaint */
  const handleDelete = async (id) => {
    try {
      await API.delete(`${API_URL}${id}/`);
      setComplaints((prev) => prev.filter((item) => item.id !== id));
      toast.success("Complaint deleted");
    } catch {
      toast.error("Failed to delete complaint");
    }
  };

  /* Confirm Delete Toast */
  const confirmDelete = (id) => {
    toast.info(
      <div>
        <p className="font-medium mb-2">
          ⚠️ Are you sure you want to delete this complaint?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss();
              handleDelete(id);
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-md"
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <ToastContainer autoClose={2500} />

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Complaints Management
      </h2>

      {/* Loader */}
      {loading && (
        <p className="text-gray-500">Loading complaints...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {/* Empty */}
      {!loading && complaints.length === 0 && (
        <p className="text-gray-500">No complaints found.</p>
      )}

      {/* Complaints Table */}
      {!loading && complaints.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                  Message
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700">
                  Date
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c, index) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-800">{c.name || "N/A"}</td>
                  <td className="px-4 py-3 text-gray-700">{c.phone || "N/A"}</td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                    {c.message}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    {new Date(c.created_at).toLocaleString()}
                  </td>

                  {/* Action Buttons */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => confirmDelete(c.id)}
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      <HiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Complaints;
