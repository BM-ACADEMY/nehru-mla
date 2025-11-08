import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Actions from "../components/Actions";
import LatestVideos from "../components/LatestVideos";
import About from "../components/About";
import Footer from "../components/Footer";
import Achievement from "../components/Achievement";
import Profile from "../components/Profile";

const Home=()=> {
  return (
    <div>
      <Banner/> 
      <Profile/>
      <Achievement/>
      <Hero/>
      <LatestVideos/>
      <Actions/>
      <About/>
      <Footer/>
      {/* Add other homepage components here */}
    </div>
  );
}
export default Home;
