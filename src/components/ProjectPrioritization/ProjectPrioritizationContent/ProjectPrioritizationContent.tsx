import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { DATA_URL } from "../../../consts";
import FilterItem from "../../FilterItem/FilterItem";
import ExportIcon from "../../../icons/ExportIcon";
import ProjectPrioritizationTable from "../ProjectPrioritizationTable/ProjectPrioritizationTable";
import "./ProjectPrioritizationContent.css";
import "../../../styles/button-styles.css";
import ProjectPrioritizationMap from "../ProjectPrioritizationMap/ProjectPrioritizationMap";

interface ProjectPrioritizationContentProps {
  tab: string;
  changeProject: (newProject: any) => void;
}

const ProjectPrioritizationContent: React.FC<
  ProjectPrioritizationContentProps
> = ({ tab, changeProject }) => {
  const [isHover, setHover] = useState(false);
  const percentages = [5, 15, 25, 50, 75, 85, 95];
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
  const [hasCovers, setHasHovers] = useState();

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

  const getCurrentProjects = () => {
    if (tab === "") {
      return filteredProjects.map((project: any) => ({
        Name: project.attributes.ProjectIDJoin,
        CompositeScore: getCompositeScore(project.attributes),
        LocationScore: getLocationScore(project.attributes),
        BenefitScore: getBenefitScore(project.attributes),
        FundingOpportunities: "",
      }));
    } else if (tab === "Location") {
      return filteredProjects.map((project: any) => ({
        Name: project.attributes.ProjectIDJoin,
        LocationScore: getLocationScore(project.attributes),
        Safe: project.attributes.Safety,
        Clean: project.attributes.Resiliency,
        Efficient: project.attributes.TravelTime,
        Connected: project.attributes.LandUse,
      }));
    } else if (tab === "Benefit") {
      return filteredProjects.map((project: any) => ({
        Name: project.attributes.ProjectIDJoin,
        Benefit: getBenefitScore(project.attributes),
        Social: project.attributes.PopDensity,
        Environmental: project.attributes.Existing,
        Economic: project.attributes.EmployDensity,
        Transportation: project.attributes.Metrobus,
      }));
    } else {
      return filteredProjects.map((project: any) => ({
        Name: project.attributes.ProjectIDJoin,
        FundingOpportunities: "",
        TotalProjectCost: "",
        ProjectType: project.attributes.ProjectType,
      }));
    }
  };

  const getCurrentHeaders = () => {
    if (tab === "") {
      return [
        { label: "Name", key: "Name" },
        { label: "Composite Score", key: "CompositeScore" },
        { label: "Location Score", key: "LocationScore" },
        { label: "Benefit Score", key: "BenefitScore" },
        { label: "Funding Opportunities", key: "FundingOpportunities" },
      ];
    } else if (tab === "Location") {
      return [
        { label: "Name", key: "Name" },
        { label: "Location Score", key: "LocationScore" },
        { label: "Safe", key: "Safe" },
        { label: "Clean", key: "Clean" },
        { label: "Efficient", key: "Efficient" },
        { label: "Connected", key: "Connected" },
      ];
    } else if (tab === "Benefit") {
      return [
        { label: "Name", key: "Name" },
        { label: "Benefit Score", key: "BenefitScore" },
        { label: "Social", key: "Social" },
        { label: "Environmental", key: "Environmental" },
        { label: "Economic", key: "Economic" },
        { label: "Transportation", key: "Transportation" },
      ];
    } else {
      return [
        { label: "Name", key: "Name" },
        { label: "Funding Opportunities", key: "FundingOpportunities" },
        { label: "Total Project Cost", key: "TotalProjectCost" },
        { label: "Project Type", key: "ProjectType" },
      ];
    }
  };

  const filterProjects = (p: number) => {
    setFilteredProjects(
      projects
        .sort(
          (a: any, b: any) =>
            getCompositeScore(b.attributes) - getCompositeScore(a.attributes)
        )
        .slice(0, Math.ceil((p * projects.length) / 100))
    );
  };

  return (
    <div className="project-prioritization-container">
      <div className="project-prioritization-main">
        <p className="project-manage-title">
          {tab.length === 0 ? "Project Prioritization" : tab}
        </p>
        <div className="project-prioritization-buttons">
          <div className="filters-container">
            <FilterItem
              label="Rank"
              items={percentages.map((p) => `Top ${p}%`)}
              handleUpdate={(p: string) =>
                filterProjects(parseInt(p.split(" ")[1]))
              }
            />
            <FilterItem label="Type" items={types} handleUpdate={() => {}} />
            <FilterItem
              label="Commission District"
              items={districts}
              handleUpdate={() => {}}
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
        <ProjectPrioritizationTable
          id={tab}
          projects={filteredProjects}
          selectProject={changeProject}
        />
      </div>

      <div className="project-prioritization-map">
        <ProjectPrioritizationMap />
      </div>
    </div>
  );
};

export default ProjectPrioritizationContent;
