import React, { useState } from "react";
import "./ProjectSelector.css";

interface Project {
  id: number;
  name: string;
}

const projects: Project[] = [
  { id: 1, name: "Downtown Miami (Micromobility)" },
  { id: 2, name: "SouthCom Pedestrian Bridge" },
  { id: 3, name: "Underline" },
  { id: 4, name: "Ludlam Bikepath" },
  { id: 5, name: "Mast Arm Upgrades" }
];

const ProjectSelector: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div className="project-selector-container">
      <label htmlFor="project-select" className="project-label">
        Select a project to view details
      </label>
      <select
        id="project-select"
        value={selectedProject}
        onChange={handleSelectChange}
        className="project-dropdown"
      >
        <option value="" disabled>
          Select a Project Name
        </option>
        {projects.map((project) => (
          <option key={project.id} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
