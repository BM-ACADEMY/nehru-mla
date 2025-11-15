import React, { useEffect, useState } from "react";
import API from "../../../../api";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const BlogAdmin = () => {
  const API_URL = `/blog/posts/`;
  const MEDIA_URL = import.meta.env.VITE_MEDIA_BASE_URL;

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    _id: "",
    title: "",
    subtitle: "",
    content: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* Fetch Blogs */
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get(API_URL);
      setBlogs(res.data);
    } catch {
      toast.error("Failed to load blogs");
    }
    setLoading(false);
  };

  /* Form Inputs */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* Submit Form */
  const handleSubmit = async (e) => {
  e.preventDefault();

  const fd = new FormData();
  fd.append("title", form.title);
  fd.append("subtitle", form.subtitle);
  fd.append("content", form.content);
  if (form.image) fd.append("image", form.image);

  try {
    if (isEditing) {
      await API.patch(`${API_URL}${form._id}/`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Blog updated");
    } else {
      await API.post(API_URL, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Blog created");
    }

    resetForm();
    fetchBlogs();
  } catch {
    toast.error("Error saving blog");
  }
};


  const handleEdit = (blog) => {
    setForm({
      _id: blog._id,
      title: blog.title,
      subtitle: blog.subtitle,
      content: blog.content,
      image: null,
    });

    setPreview(blog.image_url);
    setIsEditing(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Delete Logic */
  const confirmDelete = (blog) => {
    setDeleteTarget(blog);
  };

  const handleDelete = async () => {
    try {
      await API.delete(`${API_URL}${deleteTarget._id}/`);
      toast.success("Blog deleted");
      fetchBlogs();
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  const resetForm = () => {
    setForm({
      _id: "",
      title: "",
      subtitle: "",
      content: "",
      image: null,
    });
    setPreview(null);
    setIsEditing(false);
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading blogs...</p>;
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <ToastContainer autoClose={2000} transition={Slide} />

      {/* FORM CARD */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {isEditing ? "Edit Blog" : "Add New Blog"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Blog title"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#F7E27A]"
          />

          {/* Subtitle */}
          <input
            type="text"
            name="subtitle"
            placeholder="Blog subtitle"
            value={form.subtitle}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#F7E27A]"
          />

          {/* Content */}
          <textarea
            name="content"
            placeholder="Blog content"
            rows="4"
            value={form.content}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-[#F7E27A]"
          ></textarea>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-3 w-full"
            />
            {preview && (
              <img
                src={preview}
                className="mt-3 w-48 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-[#F7E27A] rounded-md text-black font-semibold hover:bg-[#e3cf5f] transition shadow-sm"
            >
              {isEditing ? "Update" : "Create"}
            </button>

            {isEditing && (
              <button
                onClick={resetForm}
                type="button"
                className="px-6 py-3 bg-gray-300 rounded-md text-black hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* BLOG LIST */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          All Blog Posts
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              <img
                src={blog.image_url || `${MEDIA_URL}/default.jpg`}
                className="w-full h-40 object-cover rounded-md mb-3"
              />

              <h3 className="text-lg font-semibold text-gray-800">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm">{blog.subtitle}</p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                {blog.content}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-4 py-2 bg-[#F7E27A] text-black rounded-md shadow-sm hover:bg-[#e3cf5f]"
                >
                  Edit
                </button>

                <button
                  onClick={() => confirmDelete(blog)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DELETE POPUP */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white border border-gray-200 rounded-lg shadow-xl p-6 w-96 text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-semibold text-red-600 mb-3">
                Delete Blog?
              </h3>

              <p className="text-gray-700 mb-4">
                Are you sure you want to delete <br />
                <span className="font-semibold">“{deleteTarget.title}”</span>?
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogAdmin;
