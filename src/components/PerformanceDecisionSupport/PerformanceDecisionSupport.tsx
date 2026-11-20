import React from "react";
import { useNavigate } from "react-router-dom";
import headerImage from "../../assets/0_Home/image_headr.png";
import "./PerformanceDecisionSupport.css";

const PerformanceDecisionSupport: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="home-headerimg-wrapper">
      <img
        className="home-headerimg-image"
        src={headerImage}
        alt="header"
      />
      <div className="home-headerimg-header">
        <h1 className="home-hearimg-title">
          Performance & Decision Support Platform
        </h1>
        <button
          className="mdc-home-btn"
          onClick={() => navigate("/project-prioritization")}
        >
          Get Started
        </button>
      </div>
    </div>
    <div className="home-headerborder"></div>
    </>

  );
};

export default PerformanceDecisionSupport;
