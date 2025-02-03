import React, { useCallback, useContext, useState } from "react";
import SaveIcon from "../../../../../icons/SaveIcon";
import LoadIcon from "../../../../../icons/LoadIcon";

import "./ProgramDevelopmentPage1Screen1.css";
import "../../../../../styles/button-styles.css";
import TopProjectSelector from "../../TopProjectSelector/TopProjectSelector";
import { TOP_PERCENT_OPTIONS } from "../../../../../consts/top-percents";
import ProgramDevelopmentTable from "../../ProgramDevelopmentTable/ProgramDevelopmentTable";

import { programDevelopmentContext } from "../../../../../pages/ProgramDevelopment/ProgramDevelopment";

export type ProgramDevelopmentPage1Screen = 1 | 2;

export type ProgramDevelopmentPage1Screen1Props = {
  handleToScreen2: () => void;
};

const ProgramDevelopmentPage1Screen1: React.FC<
  ProgramDevelopmentPage1Screen1Props
> = ({ handleToScreen2 }) => {
  const {
    topPercents,
    toggleSetTopPercent,
    filteredProjects,
    selectedProjectIds,
    isAllSelected,
    toggleSelectProject,
    selectAllFilteredProjects,
    unselectAllFilteredProjects,
  } = useContext(programDevelopmentContext);

  const [hover, setHover] = useState("");

  const noSelection = selectedProjectIds.size === 0;

  const toScreen2 = useCallback(() => {
    if (!noSelection) handleToScreen2();
  }, [handleToScreen2, noSelection]);

  return (
    <>
      <div className="score-board-title">
        Step 1. Select top scored projects
      </div>
      <TopProjectSelector
        value={topPercents}
        options={TOP_PERCENT_OPTIONS}
        onChange={toggleSetTopPercent}
      />
      <div className="score-board-title">
        <span>Step 2. Select projects</span>
        {selectedProjectIds.size && <span>{selectedProjectIds.size}</span>}
      </div>
      <div className="program-development-select">
        <ProgramDevelopmentTable
          projects={filteredProjects}
          selectedIds={selectedProjectIds}
          isAllSelected={isAllSelected}
          handleUnselectAll={unselectAllFilteredProjects}
          handleSelectAll={selectAllFilteredProjects}
          handleSelect={toggleSelectProject}
        />
      </div>
      <div className="program-development-actions">
        <div className="program-development-actions-io">
          <button
            className="mdc-btn-export"
            onMouseEnter={() => setHover("save-button")}
            onMouseLeave={() => setHover("")}
          >
            <SaveIcon
              strokeColor={hover === "save-button" ? "white" : "#263C8C"}
            />
            <div
              style={{
                textDecoration: "none",
                color: hover === "save-button" ? "white" : "#263C8C",
              }}
            >
              Save
            </div>
          </button>
          <button
            className="mdc-btn-export"
            onMouseEnter={() => setHover("load-button")}
            onMouseLeave={() => setHover("")}
          >
            <LoadIcon
              strokeColor={hover === "load-button" ? "white" : "#263C8C"}
            />
            <div
              style={{
                textDecoration: "none",
                color: hover === "load-button" ? "white" : "#263C8C",
              }}
            >
              Load
            </div>
          </button>
        </div>
        <button
          className={noSelection ? "mdc-btn-main mdc-btn-main-disabled": "mdc-btn-main"}
          onMouseEnter={() => setHover("view-aggregation-output-button")}
          onMouseLeave={() => setHover("")}
          onClick={toScreen2}
        >
          <div>View Aggregation Output</div>
        </button>
      </div>
    </>
  );
};

export default ProgramDevelopmentPage1Screen1;
