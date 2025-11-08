import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Aboutsection from "./components/About";

import Joinsection from "./Pages/Join";
import Home from "./Pages/Home";
import JoinForm from "./Pages/JoinForm";
import PledgeCard from "./Pages/Pledge";
import { Scrolltotop } from "./ScrollToTop";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Scrolltotop/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<Aboutsection />} />
        {/* <Route path="/join" element={<Joinsection />} /> */}
        <Route path="/join-form" element={<JoinForm/>}/>
        <Route path="/PledgeCard" element={<PledgeCard/>}/>
        <Route path="/join-us" element={<JoinForm />} />
      </Routes>
    </Router>
  );
}
