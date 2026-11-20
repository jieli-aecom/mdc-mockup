import React from "react";
import "./ProjectSelector.css";

interface Props {
  projects: { name: string }[];
  selectedProject: string;
  onSelect: (name: string) => void;
}

const ProjectSelector: React.FC<Props> = ({projects, selectedProject, onSelect}) => {
  return (
    <div className="project-selector-container">
      <label htmlFor="project-select" className="project-label">
        Select a project to view details
      </label>
      <select
        id="project-select"
        value={selectedProject}
        onChange={event => onSelect(event.target.value)}
        className="project-dropdown"
      >
        {projects.map((project) => (
          <option key={project.name} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
