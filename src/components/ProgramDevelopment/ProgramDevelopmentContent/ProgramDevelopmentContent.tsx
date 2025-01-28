import React, { useEffect, useState } from "react";
import { DATA_URL } from "../../../consts";
import SaveIcon from "../../../icons/SaveIcon";
import LoadIcon from "../../../icons/LoadIcon";

import "./ProgramDevelopmentContent.css";
import ProjectPrioritizationMap from "../../ProjectPrioritization/ProjectPrioritizationMap/ProjectPrioritizationMap";
import TopProjectSelector from "../TopProjectSelector/TopProjectSelector";
import FilterItem from "../../FilterItem/FilterItem";

const TOP_PERCENT_OPTIONS = [
  { value: "5%", label: "Top 5%" },
  { value: "15%", label: "Top 15%" },
  { value: "25%", label: "Top 25%" },
  { value: "50%", label: "Top 50%" },
  { value: "75%", label: "Top 75%" },
  { value: "85%", label: "Top 85%" },
  { value: "95%", label: "Top 95%" },
];

const PROJECT_LIST = [
  {
    id: 1,
    name: "Project Name",
    type: "Bike & Pedestrian",
    score: 87,
  },
  {
    id: 2,
    name: "Project Name",
    type: "Arterial & Collector",
    score: 71,
  },
  {
    id: 3,
    name: "Project Name",
    type: "Transit",
    score: 67,
  },
  {
    id: 4,
    name: "Project Name",
    type: "Transit",
    score: 66,
  },
  {
    id: 5,
    name: "Project Name",
    type: "Bike & Pedestrian",
    score: 58,
  },
  {
    id: 6,
    name: "Project Name",
    type: "Transit",
    score: 56,
  },
  {
    id: 7,
    name: "Project Name",
    type: "Congestion",
    score: 54,
  },
  {
    id: 8,
    name: "Project Name",
    type: "Arterial & Collector",
    score: 54,
  },
  {
    id: 9,
    name: "Project Name",
    type: "Assets",
    score: 49,
  },
  {
    id: 10,
    name: "Project Name",
    type: "Transit",
    score: 48,
  },
  {
    id: 11,
    name: "Project Name",
    type: "Assets",
    score: 46,
  },
  {
    id: 12,
    name: "Project Name",
    type: "Bike & Pedestrian",
    score: 43,
  },
  {
    id: 13,
    name: "Project Name",
    type: "Bike & Pedestrian",
    score: 41,
  },
  {
    id: 14,
    name: "Project Name",
    type: "Bike & Pedestrian",
    score: 39,
  },
];

const ProgramDevelopmentContent: React.FC = ({}) => {
  const [hover, setHover] = useState("");
  const types = [
    "Arterial & Collector",
    "Assets",
    "Bike & Pedestrian",
    "Congestion",
    "Freight",
    "Transit",
    "Other",
  ];
  const districts = [
    "District 1",
    "District 2",
    "District 3",
    "District 4",
    "District 5",
    "District 6",
  ];
  const [mapData, setMapData] = useState<any>(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [topPercents, setTopPercents] = useState("5%");
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DATA_URL);
        const data = await response.json();
        setMapData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mapData) setProjects(mapData.features);
  }, [mapData]);

  useEffect(() => {
    if (projects) {
      setFilteredProjects(projects);
    }
  }, [projects]);

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left: 60,
            top: 20,
            zIndex: 50,
            gap: "20px",
          }}
        >
          <FilterItem label="Type" items={types} handleUpdate={() => {}} />
          <FilterItem
            label="Commission District"
            items={districts}
            handleUpdate={() => {}}
          />
        </div>
        <ProjectPrioritizationMap project={null} />
        <div className="program-development-score-board">
          <div className="score-board-title">
            Step 1. Select top scored projects
          </div>
          <div
            className="top-projects-selector"
            style={{ marginBottom: "25px", marginTop: "18px" }}
          >
            <TopProjectSelector
              value={topPercents}
              options={TOP_PERCENT_OPTIONS}
              onChange={(newValue) => setTopPercents(newValue)}
            />
            <span style={{ fontWeight: 600 }}>
              of{" "}
              <span style={{ color: "#4D9FD7", textDecoration: "underline" }}>
                200
              </span>{" "}
              projects
            </span>
          </div>
          <div className="score-board-title">
            <span>Step 2. Select projects</span>
            {selectedProjects.length && <span>{selectedProjects.length}</span>}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "60px",
            }}
          >
            <table className="project-development-table">
              <thead>
                <tr>
                  <td width="10%">
                    <div
                      className={`filter-dropdown-circle${
                        selectedProjects.length === PROJECT_LIST.length
                          ? " filter-dropdown-circle-active"
                          : ""
                      }`}
                      onClick={() => {
                        if (selectedProjects.length === PROJECT_LIST.length) {
                          setSelectedProjects([]);
                        } else
                          setSelectedProjects(PROJECT_LIST.map(({ id }) => id));
                      }}
                    ></div>
                  </td>
                  <td width="30%">Name</td>
                  <td width="30%" className="td-center">
                    Project Type
                  </td>
                  <td width="30%" className="td-center">
                    Composite Score
                  </td>
                </tr>
              </thead>
              <tbody className="project-development-table-body">
                {PROJECT_LIST.map(({ id, name, type, score }) => (
                  <tr key={id}>
                    <td width="10%" className="td-selector">
                      <div
                        className={`filter-dropdown-circle${
                          selectedProjects.includes(id)
                            ? " filter-dropdown-circle-active"
                            : ""
                        }`}
                        onClick={() => {
                          if (selectedProjects.includes(id)) {
                            setSelectedProjects(
                              selectedProjects.filter(
                                (selectedId) => selectedId !== id
                              )
                            );
                          } else setSelectedProjects([...selectedProjects, id]);
                        }}
                      ></div>
                    </td>
                    <td width="30%">{name}</td>
                    <td width="30%" className="td-center">
                      {type}
                    </td>
                    <td width="30%" className="td-center">
                      {score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  className="project-prioritization-export"
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
                  className="project-prioritization-export"
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
