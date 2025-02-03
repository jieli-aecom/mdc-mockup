import React, { useState, createContext } from "react";
import SideBar from "../../components/SideBar/SideBar";
import ProjectPrioritizationContent from "../../components/ProjectPrioritization/ProjectPrioritizationContent/ProjectPrioritizationContent";
import "./ProjectPrioritization.css";
import {
  initialContext,
  ProjectPrioritizationContext,
} from "../../components/ProjectPrioritization/hooks/useProjectPriotizationContext";

export const projectPrioritizationContext =
  createContext<ProjectPrioritizationContext>(initialContext);

const ProjectPrioritization: React.FC = () => {
  const [currentTab, setTab] = useState("PROJECT PRIORITIZATION");
  const [currentItem, setItem] = useState("");
  const [setProject] = useState<any>(null);

  return (
    <projectPrioritizationContext.Provider value={initialContext}>
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
    </projectPrioritizationContext.Provider>
  );
};

export default ProjectPrioritization;
