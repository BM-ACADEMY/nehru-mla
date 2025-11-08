import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Aboutsection from "./components/About";

import Joinsection from "./Pages/Join";
import Home from "./Pages/Home";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<Aboutsection />} />
        <Route path="/join" element={<Joinsection />} />
      </Routes>
    </Router>
  );
}
