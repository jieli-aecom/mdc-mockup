import React, { useContext, useState } from "react";

import "./ProgramDevelopmentContent.css";
import "../../../../styles/button-styles.css";
import ProjectDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import FilterItem from "../../../FilterItem/FilterItem";
import { PROJECT_TYPES } from "../../../../consts/projects";
import { DISTRICTS } from "../../../../consts/districts";

import { programDevelopmentContext } from "../../../../pages/ProgramDevelopment/ProgramDevelopment";
import ProgramDevelopmentPage1Screen1 from "../ProgramDevelopmentPage1Screen1/ProgramDevelopmentPage1Screen1";

export interface ProgramDevelopmentPage1Props {
  handleToSecondPage: () => void;
}

export type ProgramDevelopmentPage1Screen = 1 | 2;

const ProgramDevelopmentPage1: React.FC<ProgramDevelopmentPage1Props> = ({
  handleToSecondPage,
}) => {
  const { mapGraphics } = useContext(programDevelopmentContext);

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
            items={DISTRICTS}
            handleUpdate={() => {}}
          />
        </div>
        <ProjectDevelopmentMap graphics={mapGraphics} />
        <div className="program-development-score-board">
          {stepScreen === 1 && <ProgramDevelopmentPage1Screen1 handleToScreen2={handleToScreen2} />}
        </div>
      </div>
    </div>
  );
};

export default ProgramDevelopmentPage1;
