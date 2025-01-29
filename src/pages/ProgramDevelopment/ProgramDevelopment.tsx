import React from "react";

import ProgramDevelopmentContent from "../../components/ProgramDevelopment/components/ProgramDevelopmentContent/ProgramDevelopmentContent";
import { ReactComponent as ProgramDevelopmentIcon } from "../../icons/3_Program Development/Program_White.svg";

import "./ProgramDevelopment.css";
import { useGetProjects } from "../../hooks/useGetProjects";
import { createContext } from "react";
import { Project } from "../../types/Project";

export const ProjectsContext = createContext<Project[]>([]);

const ProgramDevelopment: React.FC = () => {
  const { projects } = useGetProjects();
  return (
    <ProjectsContext.Provider value={projects}>
    <div className="main-content-container">
      <div className="sidebar-container">
        <div className="program-development-icon sidebar-item-container">
          <ProgramDevelopmentIcon />
          PROGRAM DEVELOPMENT
        </div>
      </div>

      <ProgramDevelopmentContent />
    </div>
    </ProjectsContext.Provider>
  );
};

export default ProgramDevelopment;
