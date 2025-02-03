import React from "react";
import SortUpIcon from "../../../icons/SortUpIcon";
import "./ProjectPrioritizationTable.css";
import SortDownIcon from "../../../icons/SortDownIcon";
import { Project } from "../../../types/Project";

interface ProjectPrioritizationTableProps {
  id: string;
  projects: Project[];
  selectProject?: (newProject: any) => void;
}

const ProjectPrioritizationTable: React.FC<ProjectPrioritizationTableProps> = ({
  id,
  projects,
  selectProject = () => {},
}) => {
  const getLocationScore = (data: any) => {
    return Math.round(
      (data.Safety + data.Resiliency + data.TravelTime + data.LandUse) / 4
    );
  };

  const getBenefitScore = (data: any) => {
    return Math.round(
      (data.PopDensity + data.Existing + data.EmployDensity + data.Metrobus) / 4
    );
  };

  const getCompositeScore = (data: any) => {
    return Math.round((getLocationScore(data) + getBenefitScore(data)) / 2);
  };

  const getScoreClass = (value: number) => {
    if (value >= 60) return "high-score";
    else if (value >= 30) return "medium-score";
    else return "low-score";
  };

  return (
    <div className="project-prioritization-table-container">
      <table className="project-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>
              <div className="table-sort-box">
                <p>Composite Score</p>
                <div className="table-sorts">
                  <SortUpIcon />
                  <SortDownIcon />
                </div>
              </div>
            </th>
            <th>
              <div className="table-sort-box">
                <p>Location Score</p>
                <div className="table-sorts">
                  <SortUpIcon />
                  <SortDownIcon />
                </div>
              </div>
            </th>
            <th>
              <div className="table-sort-box">
                <p>Benefit Score</p>
                <div className="table-sorts">
                  <SortUpIcon />
                  <SortDownIcon />
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: Project, index) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 ? "white" : "#ebebeb" }}
            >
              <td style={{ width: "30%" }} onClick={() => {}}>
                {project.Location}
              </td>
              <td
                className={`composite-score ${getScoreClass(
                  project.CompositeScore
                )}`}
              >
                {project.CompositeScore}
              </td>
              <td>{project.LocationScores.Location}</td>
              <td>{project.BenefitScores.Benefit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectPrioritizationTable;
