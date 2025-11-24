import React, { useState } from "react"; // Removed useEffect as it is no longer needed for CSS
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
// Import the CSS directly from the npm package
import "react-toastify/dist/ReactToastify.css"; 

import { 
  User, 
  Phone, 
  Mail, 
  FileText, 
  MessageSquare, 
  Send, 
  AlertCircle,
  Loader2
} from "lucide-react";

// InputField Component
const InputField = ({ 
  label, 
  name, 
  type = "text", 
  icon: Icon, 
  required = false, 
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  isFocused
}) => (
  <div className="relative group">
    <label 
      className={`block text-xs font-bold uppercase tracking-wider mb-1.5 transition-colors duration-300 ${
        isFocused ? "text-[#0033A0]" : "text-gray-500"
      }`}
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className={`relative flex items-center bg-gray-50 rounded-xl border-2 transition-all duration-300 ${
      isFocused 
        ? "border-[#0033A0] shadow-md bg-white"
        : "border-transparent hover:border-gray-200"
    }`}>
      <div className={`pl-4 transition-colors ${isFocused ? "text-[#0033A0]" : "text-gray-400 group-focus-within:text-[#0033A0]"}`}>
        <Icon size={18} />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full bg-transparent border-none text-gray-800 text-sm font-medium px-3 py-3.5 focus:ring-0 placeholder-gray-400 outline-none"
        placeholder={placeholder}
        required={required}
      />
    </div>
  </div>
);

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // REMOVED: The useEffect hook that was manually adding the CDN link has been deleted.

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/complaints/complaints/`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (name) => setFocusedField(name);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      toast.warn(
        <div className="flex items-center gap-2">
          <AlertCircle size={18} />
          <span>Please fill in all required fields.</span>
        </div>
      );
      return;
    }

    setLoading(true);

    try {
      await axios.post(API_URL, formData);
      toast.success("Complaint submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to connect to server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} transition={Slide} hideProgressBar={true} toastClassName="rounded-xl shadow-xl font-medium" />
      
      {/* Main Card Container */}
      <div className="relative z-10 bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Info / Branding */}
        <div className="md:w-2/5 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold tracking-[0.2em] text-[#FCD200] mb-2 uppercase">Customer Care</h3>
            <h1 className="text-4xl font-extrabold leading-tight mb-6">
              We're here <br/> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D40000] to-[#FCD200]">listen.</span>
            </h1>
            <p className="text-gray-300 leading-relaxed text-sm">
              Your feedback helps us improve. Whether it's a suggestion, a concern, or a formal complaint, we take every message seriously.
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-4">
             <div className="flex items-center gap-4 text-sm text-gray-300">
               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FCD200]">
                 <Phone size={18} />
               </div>
               <div>
                 <p className="font-semibold text-white">Call Us</p>
                 <p>+91 9843048384</p>
               </div>
             </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-3/5 p-8 md:p-12 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Submit a Complaint</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField 
                label="Full Name" 
                name="name" 
                icon={User} 
                required 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                isFocused={focusedField === "name"}
              />
              <InputField 
                label="Phone Number" 
                name="phone" 
                type="tel" 
                icon={Phone} 
                required 
                placeholder="0712 345 678" 
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
                isFocused={focusedField === "phone"}
              />
            </div>

            <InputField 
              label="Email Address" 
              name="email" 
              type="email" 
              icon={Mail} 
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              isFocused={focusedField === "email"}
            />

            <InputField 
              label="Subject" 
              name="subject" 
              icon={FileText} 
              placeholder="Reason for complaint"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => handleFocus("subject")}
              onBlur={handleBlur}
              isFocused={focusedField === "subject"}
            />

            <div className="relative group">
              <label 
                className={`block text-xs font-bold uppercase tracking-wider mb-1.5 transition-colors duration-300 ${
                  focusedField === 'message' ? "text-[#0033A0]" : "text-gray-500"
                }`}
              >
                Message <span className="text-red-500">*</span>
              </label>
              <div className={`relative flex items-start bg-gray-50 rounded-xl border-2 transition-all duration-300 ${
                focusedField === 'message' 
                  ? "border-[#0033A0] shadow-md bg-white"
                  : "border-transparent hover:border-gray-200"
              }`}>
                <div className={`pl-4 pt-3.5 transition-colors ${focusedField === 'message' ? "text-[#0033A0]" : "text-gray-400 group-focus-within:text-[#0033A0]"}`}>
                  <MessageSquare size={18} />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="4"
                  className="w-full bg-transparent border-none text-gray-800 text-sm font-medium px-3 py-3 focus:ring-0 placeholder-gray-400 resize-none outline-none"
                  placeholder="Please describe the issue in detail..."
                  required
                ></textarea>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D40000] to-[#b30000] text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Complaint
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Complaint;