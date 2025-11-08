import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Actions from "../components/Actions";
import LatestVideos from "../components/LatestVideos";
import About from "../components/About";

const Home=()=> {
  return (
    <div>
      <Banner/>  
      <Hero />
      <LatestVideos/>
      <Actions/>
      <About/>
      {/* Add other homepage components here */}
    </div>
  );
}
export default Home;
