import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Logo
import logo from "../../../assets/banner/nehru_logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/accounts/login/",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("admin_access_token", res.data.access);
      localStorage.setItem("admin_refresh_token", res.data.refresh);

      navigate("/admin/gallery");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white border border-gray-200 rounded-xl shadow-lg 
                      p-8 w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src={logo}
            alt="Admin Logo"
            className="w-24 h-24 rounded-full border border-gray-300 shadow-sm"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-300 rounded-md p-2 mb-4 text-center">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 
                        focus:ring-2 focus:ring-[#F7E27A] focus:border-[#F7E27A]
                        outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 
                        focus:ring-2 focus:ring-[#F7E27A] focus:border-[#F7E27A]
                        outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#F7E27A] text-black rounded-md font-semibold
                       hover:bg-[#e3cf5f] shadow-sm transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
