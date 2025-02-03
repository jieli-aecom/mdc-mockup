import React, { useState, createContext } from "react";
import SideBar from "../../components/SideBar/SideBar";
import ProjectPrioritizationContent from "../../components/ProjectPrioritization/ProjectPrioritizationContent/ProjectPrioritizationContent";
import "./ProjectPrioritization.css";
import {
  initialContext,
  ProjectPrioritizationContext,
  useProjectPriotizationContext,
} from "../../components/ProjectPrioritization/hooks/useProjectPriotizationContext";

export const projectPrioritizationContext =
  createContext<ProjectPrioritizationContext>(initialContext);

export enum ProjectPrioritizationTab {
  Overall = "Overall",
  Location = "Location",
  Benefit = "Benefit",
  Funding = "Funding",
}

const ProjectPrioritization: React.FC = () => {
  const [currentTab, setTab] = useState("PROJECT PRIORITIZATION");
  const [currentItem, setItem] = useState<ProjectPrioritizationTab>(ProjectPrioritizationTab.Overall);

  const context = useProjectPriotizationContext()

  return (
    <projectPrioritizationContext.Provider value={context}>
      <div className="main-content-container">
        <SideBar
          tab={currentTab}
          handleChange={(newTab) => setTab(newTab)}
          item={currentItem}
          handleItem={(newItem) => setItem(newItem)}
        />
        <ProjectPrioritizationContent
          tab={currentItem}
        />
      </div>
    </projectPrioritizationContext.Provider>
  );
};

export default ProjectPrioritization;
