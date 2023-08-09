import React from "react";
import "./Footer.css";
// import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
// import {faBackwardFast, faFaceFrown, faPlane} from '@fortawesome/free-solid-svg-icons'

import twitterLogo from "./Images/twitter-logo-24.png";
import instagramLogo from "./Images/instagram-alt-logo-24.png";
import facebookLogo from "./Images/facebook-circle-logo-24.png";
import twitchLogo from "./Images/twitch-logo-24.png";

function Footer() {
  return (
    <div className="body">
      <section className="payment-section">
        <div className="first">
          <div className="first-heading">
            <p className="title" style={{ color: "black"}}>Basic</p>
            <p className="price">4.99</p>
          </div>
          <div className="basic-options">
            <p style={{ color: "black"}}>✔︎ Employee Tracker</p>
            <p style={{ color: "black"}}>✔︎ Scheduling</p>
            <p style={{ color: "black"}}>✔︎ File Storage</p>
            <p style={{ color: "black"}}>✔︎ Support</p>
          </div>
          <div className="btn">
            <a href="#">Get Started</a>
          </div>
        </div>

        <div className="first">
          <div className="first-heading">
            <p className="title" style={{ color: "black"}}>Premium</p>
            <p className="price">9.99</p>
          </div>
          <div className="basic-options">
            <p style={{ color: "black"}}>✔︎ Unlimited projects</p>
            <p style={{ color: "black"}}>✔︎ Team Collaboration</p>
            <p style={{ color: "black"}}>✔︎ Task Automation</p>
            <p style={{ color: "black"}}>✔︎ Advanced Reporting</p>
          </div>
          <div className="btn">
            <a href="#">Upgrade Now</a>
          </div>
        </div>

        <div className="first">
          <div className="first-heading">
            <p className="title enterprise" style={{ color: "black"}}>Enterprise</p>
          </div>
          <div className="enterprise-options">
            <p style={{ color: "black"}}>✔︎ Custom Integration</p>
            <p style={{ color: "black"}}>✔︎ API Access</p>
            <p style={{ color: "black"}}>✔︎ Priority Support</p>
            <p style={{ color: "black"}}>✔︎ Assigned Manager</p>
          </div>
          <div>
            <p className="enterprise-price" style={{ color: "black"}}>29.99</p>
          </div>
          <div className="new-btn">
            <a href="#">Request a Demo</a>
          </div>
        </div>
      </section>

      <section className="asked-questions-section">
        <div className="asked-questions-container">
          <h2 style={{ fontSize: '4rem'}}>Frequently Asked Questions</h2>
        </div>

        <div className="questions-container">
          <div className="question-container1">
            <p className="question">What are iHub's security measures?</p>
            <p className="answer">
              iHub takes data security seriously <br /> and employs robust
              measures, <br /> including encryption, firewalls, and <br />{" "}
              limited access to user data.
            </p>
          </div>
          <div className="question-container2">
            <p className="question">Can I integrate other tools?</p>
            <p className="answer">
              Yes, iHub’s enterprise plan <br /> includes custom integrations
              and <br /> API access to help streamline your <br /> existing
              workflows.
            </p>
          </div>
          <div className="question-container">
            <p className="question">What's the cancellation policy?</p>
            <p className="answer">
              You can cancel anytime! We <br /> promise a hassle-free
              cancellation <br /> experience.
            </p>
          </div>
        </div>
      </section>

      <footer className="main-footer-container" style={{ backgroundColor: '#1859a8' }}>
        <div className="footer-container">
          <div className="footer-text">
            <p style={{color: 'black'}}>&copy; 2023 iHub by Decagon. All rights reserved.</p>
          </div>

          <div className="icons">
            <div className="icon">
              <a href="#">
                <img src={twitterLogo} alt="" />
              </a>
              {/* <FontAwesomeIcon icon={faBackwardFast} />
                <FontAwesomeIcon icon={faFaceFrown} />             */}
            </div>
            <div className="icon">
              <a href="#">
                <img src={instagramLogo} alt="" />
              </a>
            </div>
            <div className="icon">
              <a href="#">
                <img src={facebookLogo} alt="" />
              </a>
            </div>
            <div className="icon">
              <a href="#">
                <img src={twitchLogo} alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
