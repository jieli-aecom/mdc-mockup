import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import ProjectPrioritizationContent from "../../components/ProjectPrioritization/ProjectPrioritizationContent/ProjectPrioritizationContent";
import "./ProjectPrioritization.css";

const ProjectPrioritization: React.FC = () => {
  const [currentTab, setTab] = useState("PROJECT PRIORITIZATION");
  const [currentItem, setItem] = useState("");
  const [setProject] = useState<any>(null);

  return (
    <div className="main-content-container">
      <SideBar
        tab={currentTab}
        handleChange={(newTab) => setTab(newTab)}
        item={currentItem}
        handleItem={(newItem) => setItem(newItem)}
      />
      <ProjectPrioritizationContent
        tab={currentItem}
        changeProject={(newProject: any) => setProject(newProject)}
      />
    </div>
  );
};

export default ProjectPrioritization;
