import React, { useState } from "react";

import { ReactComponent as ProgramDevelopmentIcon } from "../../icons/3_Program Development/Program_White.svg";

import "./ProgramDevelopment.css";
import { createContext } from "react";
import ProgramDevelopmentPage1 from "../../components/ProgramDevelopment/components/ProgramDevelopmentPage1/ProgramDevelopmentPage1";
import {
  initialContext,
  ProgramDevelopmentContext,
  useProgramDevelopmentContext,
} from "../../components/ProgramDevelopment/hooks/useProgramDevelopmentContext";

export const programDevelopmentContext =
  createContext<ProgramDevelopmentContext>(initialContext);

export type ProgramDevelopmentPage = 1 | 2;

const ProgramDevelopment: React.FC = () => {
  const context = useProgramDevelopmentContext();

  const [page, setPage] = useState<ProgramDevelopmentPage>(1);

  const handleToSecondPage = () => {
    setPage(2);
  }

  return (
    <programDevelopmentContext.Provider value={context}>
      {page === 1 && (
        <div className="main-content-container">
          <div className="sidebar-container">
            <div className="program-development-icon sidebar-item-container">
              <ProgramDevelopmentIcon />
              PROGRAM DEVELOPMENT
            </div>
          </div>

          <ProgramDevelopmentPage1 handleToSecondPage={handleToSecondPage} />
        </div>
      )}
    </programDevelopmentContext.Provider>
  );
};

export default ProgramDevelopment;
