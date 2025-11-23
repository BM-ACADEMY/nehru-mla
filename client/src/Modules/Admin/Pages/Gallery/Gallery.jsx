import React, { useState, useEffect, useRef } from "react";
import API from "../../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const dropRef = useRef(null);
  const API_URL = `/gallery/images/`;

  /* Fetch Images */
  const fetchImages = async () => {
    try {
      const res = await API.get(API_URL);
      setImages(res.data);
    } catch {
      toast.error("Failed to fetch images");
    }
  };

  useEffect(() => {
    fetchImages();
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

  /* Upload */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      toast.warn("Please enter title and select an image");
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      await API.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) =>
          setProgress(Math.round((e.loaded * 100) / e.total)),
      });

      setTitle("");
      setFile(null);
      setPreview(null);
      fetchImages();
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* Delete Confirmation */
  const confirmDelete = (id) => {
    toast.info(
      <div>
        <p className="font-medium mb-2">Delete this image?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              toast.dismiss();
              handleDelete(id);
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
      await API.delete(`${API_URL}${id}/`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <ToastContainer />

      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        Gallery Management
      </h1>

      {/* UPLOAD CARD */}
      <form
        onSubmit={handleUpload}
        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Add New Image
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Image Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-3 rounded-md flex-1 focus:ring-2 focus:ring-[#F7E27A] outline-none"
          />

          {/* Drag Drop Box */}
          <div
            ref={dropRef}
            className="border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-md p-4 w-full md:w-64 text-center cursor-pointer transition"
          >
            <input
              type="file"
              accept="image/*"
              id="imgInput"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files[0];
                setFile(f);
                setPreview(f ? URL.createObjectURL(f) : null);
              }}
            />
            <label htmlFor="imgInput" className="cursor-pointer text-gray-600">
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

        {/* Progress */}
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

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <GalleryCard
            key={img._id}
            img={img}
            onDelete={confirmDelete}
            API_URL={API_URL}
            onUpdated={fetchImages}
          />
        ))}
      </div>
    </div>
  );
};

/* -------------------------------- GALLERY CARD ------------------------------- */
const GalleryCard = ({ img, onDelete, onUpdated, API_URL }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(img.title);
  const [preview, setPreview] = useState(img.image_url);
  const [file, setFile] = useState(null);

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("title", title);
    if (file) form.append("image", file);

    try {
      await API.patch(`${API_URL}${img._id}/`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditing(false);
      onUpdated();
      toast.success("Image updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
      <img
        src={preview}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      <div className="p-4">
        {editing ? (
          <>
            <input
              type="text"
              value={title}
              className="border p-2 rounded w-full mb-2"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="file"
              className="border p-2 rounded w-full"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                setFile(f);
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />

            <div className="flex justify-end mt-3 gap-2">
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-[#F7E27A] rounded text-black"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-800">{img.title}</h2>

            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-1 bg-[#F7E27A] rounded text-black"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(img._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
