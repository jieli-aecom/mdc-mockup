import React, { useState } from "react";
import SaveIcon from "../../../../icons/SaveIcon";
import LoadIcon from "../../../../icons/LoadIcon";

import "./ProgramDevelopmentContent.css";
import "../../../../styles/button-styles.css";
import TopProjectSelector from "../TopProjectSelector/TopProjectSelector";
import ProjectDevelopmentMap from "../ProgramDevelopmentMap/ProgramDevelopmentMap";
import FilterItem from "../../../FilterItem/FilterItem";
import { PROJECT_TYPES } from "../../../../consts/projects";
import { DISTRICTS } from "../../../../consts/districts";
import { useProjectManager } from "../../hooks/useProjectManager";
import { TOP_PERCENT_OPTIONS } from "../../consts/top-percents";
import ProgramDevelopmentTable from "../ProgramDevelopmentTable/ProgramDevelopmentTable";

const ProgramDevelopmentContent: React.FC = () => {
  const {
    topPercents,
    toggleSetTopPercent,
    filteredProjects,
    selectedProjectIds,
    isAllSelected,
    toggleSelectProject,
    selectAllFilteredProjects,
    unselectAllFilteredProjects,
    mapGraphics,
  } = useProjectManager();

  const [hover, setHover] = useState("");

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "60px",
            }}
          >
            <ProgramDevelopmentTable
              projects={filteredProjects}
              selectedIds={selectedProjectIds}
              isAllSelected={isAllSelected}
              handleUnselectAll={unselectAllFilteredProjects}
              handleSelectAll={selectAllFilteredProjects}
              handleSelect={toggleSelectProject}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
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
                </div>
                <div
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
                </div>
              </div>
              <button
                className="program-aggregation-output"
                onMouseEnter={() => setHover("view-aggregation-output-button")}
                onMouseLeave={() => setHover("")}
              >
                <div
                  style={{
                    textDecoration: "none",
                    color:
                      hover === "view-aggregation-output-button"
                        ? "#263C8C"
                        : "white",
                  }}
                >
                  View Aggregation Output
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDevelopmentContent;
