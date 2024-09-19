import React from "react";

import ProgramDevelopmentContent from "../../components/ProgramDevelopment/ProgramDevelopmentContent/ProgramDevelopmentContent";
import { ReactComponent as ProgramDevelopmentIcon } from "../../icons/3_Program Development/Program_White.svg";

import "./ProgramDevelopment.css";

const ProgramDevelopment: React.FC = () => {
  return (
    <div className="main-content-container">
      <div className="sidebar-container">
        <div className="program-development-icon sidebar-item-container">
          <ProgramDevelopmentIcon />
          PROGRAM DEVELOPMENT
        </div>
      </div>

      <ProgramDevelopmentContent />
    </div>
  );
};

export default ProgramDevelopment;
