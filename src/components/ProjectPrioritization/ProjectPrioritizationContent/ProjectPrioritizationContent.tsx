import React, { useContext, useState } from "react";
import { CSVLink } from "react-csv";
import FilterItem from "../../FilterItem/FilterItem";
import ExportIcon from "../../../icons/ExportIcon";
import ProjectPrioritizationTable from "../ProjectPrioritizationTable/ProjectPrioritizationTable";
import "./ProjectPrioritizationContent.css";
import "../../../styles/button-styles.css";
import ProjectPrioritizationMap from "../ProjectPrioritizationMap/ProjectPrioritizationMap";
import {
  projectPrioritizationContext,
  ProjectPrioritizationTab,
} from "../../../pages/ProjectPrioritization/ProjectPrioritization";
import { Project, ProjectType } from "../../../types/Project";
import {
  benefitTableConfig,
  generalTableConfig,
  locationTableConfig,
} from "./table-configs";
import { COMMISSION_DISTRICTS } from "../../../consts/districts";
import { CommissionDistrict } from "../../../types/District";
import { PROJECT_TYPES } from "../../../consts/projects";
import { TOP_PERCENT_OPTIONS } from "../../../consts/top-percents";
import TopProjectSelector from "../../ProgramDevelopment/components/TopProjectSelector/TopProjectSelector";

interface ProjectPrioritizationContentProps {
  tab: ProjectPrioritizationTab;
}

const ProjectPrioritizationContent: React.FC<
  ProjectPrioritizationContentProps
> = ({ tab }) => {
  const {
    filteredProjects,
    numFilteredProjectsUnsliced,
    toggleSetFilterDistrict,
    toggleSetFilterType,
    topPercents,
    toggleSetTopPercent,
  } = useContext(projectPrioritizationContext);

  const [isHover, setHover] = useState(false);
  const getCurrentProjects = () => {
    if (tab === ProjectPrioritizationTab.Overall) {
      return filteredProjects.map((project: Project) => ({
        Name: project.Location,
        CompositeScore: project.CompositeScore,
        LocationScore: project.LocationScores.Location,
        BenefitScore: project.BenefitScores.Benefit,
        FundingOpportunities: "",
      }));
    } else if (tab === ProjectPrioritizationTab.Location) {
      return filteredProjects.map((project: Project) => ({
        Name: project.Location,
        LocationScore: project.LocationScores.Location,
        Safe: project.LocationScores.Safety,
        Clean: project.LocationScores.Resiliency,
        Efficient: project.LocationScores.TravelTime,
        Connected: project.LocationScores.LandUse,
      }));
    } else if (tab === ProjectPrioritizationTab.Benefit) {
      return filteredProjects.map((project: Project) => ({
        Name: project.Location,
        Benefit: project.BenefitScores.Benefit,
        Social: project.BenefitScores.Social,
        Environmental: project.BenefitScores.Environmental,
        Economic: project.BenefitScores.Economic,
      }));
    } else {
      return [];
    }
  };

  const getCurrentHeaders = () => {
    if (tab === ProjectPrioritizationTab.Overall) {
      return [
        { label: "Name", key: "Name" },
        { label: "Composite Score", key: "CompositeScore" },
        { label: "Location Score", key: "LocationScore" },
        { label: "Benefit Score", key: "BenefitScore" },
        { label: "Funding Opportunities", key: "FundingOpportunities" },
      ];
    } else if (tab === ProjectPrioritizationTab.Location) {
      return [
        { label: "Name", key: "Name" },
        { label: "Location Score", key: "LocationScore" },
        { label: "Safe", key: "Safe" },
        { label: "Clean", key: "Clean" },
        { label: "Efficient", key: "Efficient" },
        { label: "Connected", key: "Connected" },
      ];
    } else if (tab === ProjectPrioritizationTab.Benefit) {
      return [
        { label: "Name", key: "Name" },
        { label: "Benefit Score", key: "BenefitScore" },
        { label: "Social", key: "Social" },
        { label: "Environmental", key: "Environmental" },
        { label: "Economic", key: "Economic" },
      ];
    } else {
      return [];
    }
  };

  const tableConfig =
    tab === ProjectPrioritizationTab.Location
      ? locationTableConfig
      : tab === ProjectPrioritizationTab.Benefit
      ? benefitTableConfig
      : generalTableConfig;
  const minWidth =
    tab === ProjectPrioritizationTab.Location ? "1500px" : "600px";

  return (
    <div className="project-prioritization-container">
      <div className="project-prioritization-main">
        <p className="project-prioritization-title">
          {tab.length === 0 ? "Project Prioritization" : tab}
        </p>
        <div className="project-prioritization-buttons">
          <div className="filters-container">
            <FilterItem
              label="Type"
              items={PROJECT_TYPES}
              handleUpdate={(e) => toggleSetFilterType(e as ProjectType)}
            />
            <FilterItem
              label="Commission District"
              items={COMMISSION_DISTRICTS}
              handleUpdate={(e) =>
                toggleSetFilterDistrict(e as CommissionDistrict)
              }
            />
          </div>
          <div
            className="mdc-btn-export"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <ExportIcon strokeColor={isHover ? "white" : "#263C8C"} />
            <CSVLink
              data={getCurrentProjects()}
              headers={getCurrentHeaders()}
              filename="data.csv"
              style={{
                textDecoration: "none",
                color: isHover ? "white" : "#263C8C",
              }}
            >
              Export
            </CSVLink>
          </div>
        </div>
        <TopProjectSelector
          value={topPercents}
          options={TOP_PERCENT_OPTIONS}
          onChange={toggleSetTopPercent}
          totalProjects={numFilteredProjectsUnsliced}
        />

        <ProjectPrioritizationTable
          id={tab}
          config={tableConfig}
          projects={filteredProjects}
          minWidth={minWidth}
        />
      </div>

      <div className="project-prioritization-map">
        <ProjectPrioritizationMap />
      </div>
    </div>
  );
};

export default ProjectPrioritizationContent;
