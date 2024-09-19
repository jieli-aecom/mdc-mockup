import React from "react";
import "./ProjectAggregationMain.css";

const ProjectAggregationMain: React.FC = () => {
  return (
    <div className="project-aggregation-main-container">
      <h2>Project Aggregation</h2>
      <p className="project-aggregation-main-text">
        Select multiple projects to evaluate their impacts.
      </p>
      <div className="project-aggregation-main-map"></div>
    </div>
  );
};

export default ProjectAggregationMain;
