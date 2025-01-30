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
import ProgramDevelopmentPage2 from "../../components/ProgramDevelopment/components/ProgramDevelopmentPage2/ProgramDevelopmentPage2";

export const programDevelopmentContext =
  createContext<ProgramDevelopmentContext>(initialContext);

export type ProgramDevelopmentPage = 1 | 2;

const ProgramDevelopment: React.FC = () => {
  const context = useProgramDevelopmentContext();

  const [page, setPage] = useState<ProgramDevelopmentPage>(1);

  const handleToSecondPage = () => {
    setPage(2);
  };

  return (
    <programDevelopmentContext.Provider value={context}>
      <div className="main-content-container">
        <div className="sidebar-container">
          <div className="program-development-icon sidebar-item-container">
            <ProgramDevelopmentIcon />
            PROGRAM DEVELOPMENT
          </div>
        </div>
        {page === 1 && (
          <ProgramDevelopmentPage1 handleToSecondPage={handleToSecondPage} />
        )}
        {page === 2 && (
          <ProgramDevelopmentPage2 handleToPage1={() => setPage(1)} />
        )}
      </div>
    </programDevelopmentContext.Provider>
  );
};

export default ProgramDevelopment;
