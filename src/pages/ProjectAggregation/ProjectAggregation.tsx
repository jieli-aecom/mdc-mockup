import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import ProjectAggregationMain from "../../components/ProjectAggregationMain/ProjectAggregationMain";
import SelectProjects from "../../components/SelectProjects/SelectProjects";
import "./ProjectAggregation.css";

const ProjectAggregation: React.FC = () => {
  return (
    <div className="project-aggregation-container">
      {/* <SideBar /> */}
      <ProjectAggregationMain />
      <SelectProjects />
    </div>
  );
};

export default ProjectAggregation;
