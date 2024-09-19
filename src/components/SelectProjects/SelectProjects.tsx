import React, { useState } from "react";
import ArrowDown from "../../icons/ArrowDown";
import ArrowUp from "../../icons/ArrowUp";
import "./SelectProjects.css";

const SelectProjects: React.FC = () => {
  const [isDown, setDown] = useState(true);
  const projects = Array(12).fill({ name: "Project", type: "Project Type" });

  return (
    <div className="select-projects-container">
      <div
        className="select-projects-dropdown"
        onClick={() => setDown(!isDown)}
      >
        <div
          className={`select-projects-circle${
            isDown ? "" : " select-projects-active"
          }`}
        ></div>
        {isDown ? <ArrowDown /> : <ArrowUp />}
        <p className="select-projects-text">Select Projects</p>
      </div>{" "}
      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project-item" key={index}>
            <div
              className={`project-item-circle${
                isDown ? "" : " project-item-active"
              }`}
            ></div>
            <label htmlFor={`project-${index}`} className="project-label">
              {project.name}
            </label>
            <span className="project-type">{project.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectProjects;
