import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./ProjectInfoInput.css";

const ProjectInfoInput: React.FC = () => {
  const [projectName, setProjectName] = useState("");

  return (
    <div className="project-info-input-container">
      <div className="project-info-input-top">
        <p>0 of 50 answered</p>
        <ProgressBar bgcolor="#ebebeb" color="black" progress={0} height={24} />
      </div>
      <button className="project-info-btn">Save for Later</button>
      <h2>Project Information</h2>
      <p>Project Name *</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
      <p>Type of Project *</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
      <p>Lead Division</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
      <p>Project Limits</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
      <p>Description</p>
      <textarea
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
      <hr />
      <h2>Preliminary Cost Estimate</h2>
      <p>Planning Cost</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
      <p>Design Cost</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
      <p>Construction Cost</p>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="project-info-text"
      />
    </div>
  );
};

export default ProjectInfoInput;
