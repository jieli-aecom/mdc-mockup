import React, { useState } from "react";

import "./ProgramDevelopmentPage1.css";
import "../../../../styles/button-styles.css";
import ProjectDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import FilterItem from "../../../FilterItem/FilterItem";
import { PROJECT_TYPES } from "../../../../consts/projects";
import { COMMISSION_DISTRICTS } from "../../../../consts/districts";

import ProgramDevelopmentPage1Screen1 from "../ProgramDevelopmentPage1Screen1/ProgramDevelopmentPage1Screen1";
import ProgramDevelopmentPage1Screen2 from "../ProgramDevelopmentPage1Screen2/ProgramDevelopmentPage1Screen2";

export interface ProgramDevelopmentPage1Props {
  handleToSecondPage: () => void;
}

export type ProgramDevelopmentPage1Screen = 1 | 2;

const ProgramDevelopmentPage1: React.FC<ProgramDevelopmentPage1Props> = ({
  handleToSecondPage,
}) => {

  const [stepScreen, setStepScreen] =
    useState<ProgramDevelopmentPage1Screen>(1);

  const handleToScreen2 = () => {
    setStepScreen(2);
  };

  return (
    <div className="project-manage-container program-development-content-container">
      <p className="project-manage-title">Program Development</p>
      <div className="page-comment">
        Select multiple projects to evaluate their impacts
      </div>
      <div
        className="program-development-content"
        style={{ position: "relative" }}
      >
        <div className="program-development-filter">
          <FilterItem
            label="Type"
            items={PROJECT_TYPES}
            handleUpdate={() => {}}
          />
          <FilterItem
            label="Commission District"
            items={COMMISSION_DISTRICTS}
            handleUpdate={() => {}}
          />
        </div>
        <ProjectDevelopmentMap />
        <div className="program-development-score-board">
          {stepScreen === 1 && (
            <ProgramDevelopmentPage1Screen1 handleToScreen2={handleToScreen2} />
          )}
          {stepScreen === 2 && (
            <ProgramDevelopmentPage1Screen2
              handleToScreen1={() => setStepScreen(1)}
              handleToPage2={handleToSecondPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDevelopmentPage1;
