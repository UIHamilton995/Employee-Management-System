import React from "react";
import "./Hero.css";
import heroimg from "./hero-img.jpeg";
function Hero() {
  return (
    <div>
      <div className="hero">
        <h1>iHUB</h1>
        <p>
          Witness the birth of a revolution in your organisation's management!
          iHub, brought to you by Decagon, is your go-to solution for an
          optimized experience. Dive in now!
        </p>
      </div>

      <div>
        <img src={heroimg} alt="" />
      </div>
    </div>
  );
}

export default Hero;
