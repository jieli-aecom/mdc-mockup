import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "../../icons/ArrowDown";
import ProjectSelector from "../../components/ProjectInfo/ProjectSelector/ProjectSelector";
import PortfolioMap from "../../components/PortfolioMap/PortfolioMap";
import { projectRecords, scoreColors, ScoreName } from "./projectRecords";
import "./ProjectInfo.css";

const projectLocations = projectRecords.map(record => ({
  id: record.name,
  point: record.geometry[Math.floor(record.geometry.length / 2)],
  label: "View " + record.name,
  color: "#456db5",
}));

const ProjectInfo: React.FC = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState(projectRecords[0]);
  const [activeSection, setActiveSection] = useState<ScoreName>("SAFE");
  const details = project.details?.[activeSection];

  function selectProject(name: string) {
    const record = projectRecords.find(item => item.name === name);
    if (!record) return;
    setProject(record);
    setActiveSection("SAFE");
  }

  return (
    <div className="project-information">
      <div className="project-info-header">
        <h1><ArrowDown />Project Information</h1>
        <button className="create-project-button" onClick={() => navigate("/project-prioritization?view=Create+Project")}>
          Create Project
        </button>
      </div>
      <ProjectSelector projects={projectRecords} selectedProject={project.name} onSelect={selectProject} />
      <div className="project-content">
        <div className="project-content-main">
          <div className="project-summary">
            <h2>{project.name}</h2>
            <hr />
            <dl className="project-summary-header">
              {project.number && <><dt>Project Number</dt><dd>{project.number}</dd></>}
              <dt>Project Type</dt><dd>{project.type}</dd>
              {project.status && <><dt>Project Status</dt><dd>{project.status}</dd></>}
              <dt>Description</dt><dd>{project.description}</dd>
            </dl>
            <hr />
          </div>
          <h2 className="project-scores-title">Performance Scores</h2>
          {project.scores ? (
            <div className="performance-scores">
              {Object.entries(project.scores).map(([key, value]) => {
                const label = key as ScoreName;
                const color = scoreColors[label];
                const content = <><span className="score-label">{label}</span><span className="score-value" style={{color}}>{value}</span></>;
                return project.details?.[label] ? (
                  <button key={label} className="score-box" style={{borderColor: color}} aria-pressed={activeSection === label}
                    type="button" onClick={() => setActiveSection(label)}>{content}</button>
                ) : <div key={label} className="score-box" style={{borderColor: color}}>{content}</div>;
              })}
            </div>
          ) : <p>Project scores are pending.</p>}
          {details && (
            <section className="score-details" aria-label={activeSection + " measures"}>
              <h3>{activeSection}</h3>
              <div className="details-section">
                {Object.entries(details).map(([label, value]) => (
                  <div className="details-item" key={label}><p>{label}</p><strong>{value}</strong></div>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className="project-info-map" aria-label="Project location">
          <div className="project-info-map-heading"><h2>Project map</h2>
            <span>{project.illustrative ? "Illustrative location" : "Project footprint"}</span></div>
          <div className="project-info-map-body">
            <PortfolioMap key={project.name} projects={[]} geometry={project.geometry}
              markers={projectLocations.filter(marker => marker.id !== project.name)} onMarkerSelect={selectProject}
              ariaLabel={project.name + " location"} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectInfo;
