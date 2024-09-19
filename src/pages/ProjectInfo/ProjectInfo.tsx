import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "../../icons/ArrowDown";
import "./ProjectInfo.css";
import ProjectSelector from "../../components/ProjectInfo/ProjectSelector/ProjectSelector";

const projectData: any = {
  name: "Downtown Miami (Micromobility)",
  number: "PW0001165",
  type: "Arterial/Collector Road",
  status: "Under construction",
  description:
    "Resurfacing (N/S Miami Avenue, NE/SE 1 Avenue, NW/NE 6 Street, NW/NE 5 Street). Prior Years' Funding as follows: $1,700,000 for CST.",
  performanceScores: [
    { label: "SAFE", value: 95, color: "#3fbf3f" },
    { label: "CLEAN", value: 75, color: "#39bfcf" },
    { label: "EFFICIENT", value: 65, color: "#65c78b" },
    { label: "CONNECTED", value: 85, color: "#b9e769" },
    { label: "SOCIAL", value: 76, color: "#ec4c56" },
    { label: "ECONOMY", value: 85, color: "#ed8e46" }
  ],
  details: {
    safe: {
      vehicularCrashes: 385,
      bikePedCrashes: 25,
      decreaseInBikeCrash: 75,
      atGradeRailCrossings: 2
    },
    clean: {
      sidewalkNetwork: 1.4,
      bikeNetwork: 1.2,
      decreaseInPollutants: 14,
      decreaseInHeatExposure: 14
    },
    efficient: {
      decreaseInTraffic: 14,
      decreaseInTravelTime: 16,
      decreaseInTruckVolume: 10,
      increaseInTravelLanes: 0
    },
    connected: {
      accessToTransit: 14,
      accessToParks: 16,
      overlapWithSmartCorridors: 14,
      populationTransitDependent: 25
    }
  }
};

const ProjectInfo: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("SAFE");

  const renderSectionDetails = () => {
    const details = projectData.details[activeSection.toLowerCase()];
    return (
      <div className="details-section">
        {Object.keys(details).map((key, index) => (
          <div key={index} className="details-item">
            <p>{key.replace(/([A-Z])/g, " $1").toLowerCase()}</p>
            <p>{details[key]}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="project-information">
      <div className="project-info-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px"
          }}
        >
          <ArrowDown />
          <p
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              lineHeight: "44px",
              color: "#4F4F4F",
              margin: "0"
            }}
          >
            Project Information
          </p>
        </div>
        <button
          className="create-project-button"
          onClick={() => {
            navigate("/create-project");
          }}
        >
          Create Project
        </button>
      </div>
      <ProjectSelector />
      <div className="project-content">
        <div className="project-content-main">
          <div className="project-summary">
            <h2>{projectData.name}</h2>
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <div className="project-summary-header">
                <p>Project Number</p>
                <p>Project Type</p>
                <p>Project Status</p>
                <p>Description</p>
              </div>
              <div
                className="project-summary-header"
                style={{ fontWeight: "bold", width: "540px" }}
              >
                <p>{projectData.number}</p>
                <p>{projectData.type}</p>
                <p>{projectData.status}</p>
                <p>{projectData.description}</p>
              </div>
            </div>
            <hr />
          </div>
          <p style={{ fontSize: "24px", lineHeight: "29px", color: "#4F4F4F" }}>
            Performance Scores
          </p>
          <div className="performance-scores">
            {projectData.performanceScores.map((score: any, index: any) => (
              <div
                key={index}
                className={`score-box ${score.label.toLowerCase()}`}
                style={{ borderColor: score.color }}
                onClick={() => setActiveSection(score.label)}
              >
                <p className="score-label">{score.label}</p>
                <p className="score-value" style={{ color: score.color }}>
                  {score.value}
                </p>
              </div>
            ))}
          </div>
          <div className="score-details">
            <h3>{activeSection}</h3>
            {renderSectionDetails()}
          </div>
        </div>
        <div className="map-placeholder">Map Placeholder</div>
      </div>
    </div>
  );
};

export default ProjectInfo;
