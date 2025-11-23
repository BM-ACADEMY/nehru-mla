import React, { useState, useEffect, useRef } from "react";
import API from "../../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const dropRef = useRef(null);
  const API_URL = `/banner/banners/`;

  /* Fetch banners */
  const fetchBanners = async () => {
    try {
      const res = await API.get(API_URL);
      setBanners(res.data);
    } catch {
      toast.error("Failed to fetch banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  /* Drag & Drop */
  useEffect(() => {
    const div = dropRef.current;

    const handleDrop = (e) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    };

    const handleDragOver = (e) => e.preventDefault();

    div.addEventListener("drop", handleDrop);
    div.addEventListener("dragover", handleDragOver);

    return () => {
      div.removeEventListener("drop", handleDrop);
      div.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  /* Upload Banner */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warn("Please select an image");
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await API.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) =>
          setProgress(Math.round((e.loaded * 100) / e.total)),
      });

      setFile(null);
      setPreview(null);
      fetchBanners();
      toast.success("Banner uploaded successfully");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* Delete Confirmation Popup */
  const confirmDelete = (banner) => {
    toast.info(
      <div>
        <p className="font-medium mb-2">Delete this banner?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss();
              handleDelete(banner._id);
            }}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  /* Perform Delete */
  const handleDelete = async (id) => {
    try {
      await API.delete(`/banner/${id}/`);

      setBanners((prev) => prev.filter((b) => b._id !== id));

      toast.success("Banner deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  /* UI */
  return (
    <div className="p-8 bg-white min-h-screen">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Banner Management
      </h1>

      {/* Upload Card */}
      <form
        onSubmit={handleUpload}
        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Add New Banner
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Drag/Drop Box */}
          <div
            ref={dropRef}
            className="border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-md p-4 w-full md:w-64 text-center cursor-pointer transition"
          >
            <input
              type="file"
              accept="image/*"
              id="bannerInput"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files[0];
                setFile(f);
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
            />
            <label htmlFor="bannerInput" className="cursor-pointer text-gray-600">
              {file ? "Change Image" : "Select or Drag Here"}
            </label>
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#F7E27A] text-black rounded-md font-medium shadow-sm hover:bg-[#e3cf5f] transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-gray-200 h-2 rounded mt-4 overflow-hidden">
            <div
              className="bg-[#F7E27A] h-2"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              className="w-64 h-48 object-cover rounded-md border"
              alt="preview"
            />
          </div>
        )}
      </form>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={banner.image_url}
              alt="Banner"
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4 flex justify-end">
              <button
                onClick={() => confirmDelete(banner)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAdmin;
