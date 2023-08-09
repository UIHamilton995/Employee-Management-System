import React from "react";
import "./Features.css";
import blend from "./blend.jpeg";
import conference from "./conference.jpeg";

const Features = () => {
  return (
    <div>
      <div className="Flex">
        <div className="feature-text">
          <h2>Elevate Your Management with Cutting-Edge Online Tools</h2>
          <p className="pee" style={{color: 'black'}}>iHub creates a seamless workflow for your organisation with state-of-the-art features and technology, ensuring maximum efficiency for managing your employees.</p>
        </div>
        <div>
          <img className="ping" src={blend} alt="" />
        </div>
      </div>

      <div className="Flex margin">
        <div>
          <img className="ping" src={conference} alt="" />
        </div>
        <div className="feature-text">
          <h2>Embrace the Future: Upgrade to iHub Today!</h2>
          <p className="pee" style={{color: 'black'}}>Don't wait; your modernized organisation awaits you. iHub guarantees your success with tools tailored to your exact needs. Transform your business with the power of iHub.</p>
        </div>
      </div>
    </div>
  )
}

export default Features