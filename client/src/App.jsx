import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Aboutsection from "./components/About";


import Home from "./pages/Home";
import JoinSection from "./pages/Join"

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<Aboutsection />} />
        <Route path="/join" element={<JoinSection />} />
      </Routes>
    </Router>
  );
}
