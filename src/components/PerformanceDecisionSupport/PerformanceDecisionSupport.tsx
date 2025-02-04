import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ImageIcon } from "../../icons/ImageIcon.svg";
import headerImage from "../../assets/0_Home/image_headr.png";
import "./PerformanceDecisionSupport.css";

const PerformanceDecisionSupport: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="performance-decision-support-container">
      <img src={headerImage} alt="header" className="performance-decision-image" />
      <h1 className="performance-decision-title">
        Performance & Decision Support Platform
      </h1>
      <button
        className="performance-decision-get-started-btn"
        onClick={() => navigate("/create-project")}
      >
        Get Started
      </button>
    </div>
  );
};

export default PerformanceDecisionSupport;
