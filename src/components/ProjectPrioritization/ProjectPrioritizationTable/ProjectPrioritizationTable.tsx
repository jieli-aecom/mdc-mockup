import React, { useEffect, useMemo, useState } from "react";
import "./ProjectPrioritizationTable.css";
import { Project } from "../../../types/Project";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import { DARK_ORANGE, MID_GRAY } from "../../../consts/colors";

export type TableColumnConfiguration = {
  label: string;
  value: (project: Project) => string | number;
  display: (project: Project) => string;
  color?: (project: Project) => string;
  align?: "left" | "center" | "right";
  width: string;
};

export type TableConfiguration = TableColumnConfiguration[];

interface ProjectPrioritizationTableProps {
  id: string;
  projects: Project[];
  config: TableConfiguration;
  minWidth?: string;
  selectProject?: (newProject: any) => void;
}

const ProjectPrioritizationTable: React.FC<ProjectPrioritizationTableProps> = ({
  projects,
  config,
  minWidth = "100px",
  selectProject = () => {},
}) => {
  const [sortByIndex, setSortByIndex] = useState<number>(1);
  const [sortAscending, setSortAscending] = useState<boolean>(false);

  useEffect(() => {
    setSortByIndex(1);
    setSortAscending(false);
  }, [config])

  const sortedProjects = useMemo(() => {
    const sorted = [...projects];
    sorted.sort((a, b) => {
      const valueA: string | number = config[sortByIndex].value(a);
      const valueB: string | number = config[sortByIndex].value(b);

      if (typeof valueA === "string" || typeof valueB === "string") {
        if (sortAscending) {
          return String(valueA).localeCompare(String(valueB));
        } else {
          return String(valueB).localeCompare(String(valueA));
        }
      } else {
        if (sortAscending) {
          return Number(valueA) - Number(valueB);
        } else {
          return Number(valueB) - Number(valueA);
        }
      }
    });
    return sorted;
  }, [projects, config, sortByIndex, sortAscending]);

  return (
    <div className="project-prioritization-table-container">
      <table className="project-table" style={{minWidth: minWidth}}>
        <thead>
          <tr>
            {config.map((col: TableColumnConfiguration, index) => {
              const sortUpClick = () => {
                setSortByIndex(index);
                setSortAscending(true);
              }

              const sortDownClick = () => {
                setSortByIndex(index);
                setSortAscending(false);
              }

              const sortUpColor = sortByIndex === index && sortAscending ? DARK_ORANGE : MID_GRAY;
              const sortDownColor = sortByIndex === index && !sortAscending ? DARK_ORANGE : MID_GRAY;

              const sortUpLabel = "Sort by " + col.label + " ascending";
              const sortDownLabel = "Sort by " + col.label + " descending";

              return (
                <th key={index} style={{ width: col.width, textAlign: "left" }}>
                  <div className="table-sort-box">
                    <p>{col.label}</p>
                    <div className="table-sorts">
                      <button onClick={sortUpClick} title={sortUpLabel} aria-label={sortUpLabel}>
                        <ArrowUp color={sortUpColor} />
                      </button>
                      <button onClick={sortDownClick} title={sortDownLabel} aria-label={sortDownLabel}>
                        <ArrowDown color={sortDownColor} />
                      </button>
                    </div>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedProjects.map((project: Project, index) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 ? "white" : "#ebebeb" }}
            >
              {config.map((col: TableColumnConfiguration, index) => (
                <td
                  key={index}
                  style={{ width: col.width, textAlign: col.align }}
                  onClick={() => {}}
                >
                  {col.display(project)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectPrioritizationTable;
