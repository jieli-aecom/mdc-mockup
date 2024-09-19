import React from "react";
import SortUpIcon from "../../../icons/SortUpIcon";
import "./ProjectPrioritizationTable.css";
import SortDownIcon from "../../../icons/SortDownIcon";

interface ProjectPrioritizationTableProps {
  id: string;
  projects: any[];
  selectProject: (newProject: any) => void;
}

const ProjectPrioritizationTable: React.FC<ProjectPrioritizationTableProps> = ({
  id,
  projects,
  selectProject
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
      {id === "" && (
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
              <th>
                <div className="table-sort-box">
                  <p>Funding Opportunities</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 ? "white" : "#ebebeb" }}
              >
                <td onClick={() => selectProject(project)}>
                  {project.attributes.ProjectIDJoin}
                </td>
                <td
                  className={`composite-score ${getScoreClass(
                    getCompositeScore(project.attributes)
                  )}`}
                >
                  {getCompositeScore(project.attributes)}
                </td>
                <td>{getLocationScore(project.attributes)}</td>
                <td>{getBenefitScore(project.attributes)}</td>
                <td>{project.fundingOpportunities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {id === "Location" && (
        <table className="project-table">
          <thead>
            <tr>
              <th>Name</th>
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
                  <p>Safe</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Clean</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Efficient</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Connected</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 ? "white" : "#ebebeb" }}
              >
                <td onClick={() => selectProject(project)}>
                  {project.attributes.ProjectIDJoin}
                </td>
                <td
                  className={`composite-score ${getScoreClass(
                    getLocationScore(project.attributes)
                  )}`}
                >
                  {getLocationScore(project.attributes)}
                </td>
                <td>{project.attributes.Safety}</td>
                <td>{project.attributes.Resiliency}</td>
                <td>{project.attributes.TravelTime}</td>
                <td>{project.attributes.LandUse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {id === "Benefit" && (
        <table className="project-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                <div className="table-sort-box">
                  <p>Benefit Score</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Social</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Environmental</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Economic</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Transportation</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 ? "white" : "#ebebeb" }}
              >
                <td onClick={() => selectProject(project)}>
                  {project.attributes.ProjectIDJoin}
                </td>
                <td
                  className={`composite-score ${getScoreClass(
                    getBenefitScore(project.attributes)
                  )}`}
                >
                  {getBenefitScore(project.attributes)}
                </td>
                <td>{project.attributes.PopDensity}</td>
                <td>{project.attributes.Existing}</td>
                <td>{project.attributes.EmployDensity}</td>
                <td>{project.attributes.Metrobus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {id === "Funding" && (
        <table className="project-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                <div className="table-sort-box">
                  <p>Funding Opportunities</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Total Project Cost</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
              <th>
                <div className="table-sort-box">
                  <p>Project Type</p>
                  <div className="table-sorts">
                    <SortUpIcon />
                    <SortDownIcon />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: any, index) => (
              <tr
                key={index}
                style={{ backgroundColor: index % 2 ? "white" : "#ebebeb" }}
              >
                <td onClick={() => selectProject(project)}>
                  {project.attributes.ProjectIDJoin}
                </td>
                <td
                // className={`composite-score ${getScoreClass(
                //   getCompositeScore(project.attributes)
                // )}`}
                >
                  {/* {getBenefitScore(project.attributes)} */}
                </td>
                <td></td>
                <td>{project.attributes.ProjectType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectPrioritizationTable;
