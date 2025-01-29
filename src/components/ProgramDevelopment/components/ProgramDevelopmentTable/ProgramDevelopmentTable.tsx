import { FC } from "react";
import { Project } from "../../../../types/Project";
import "./ProgramDevelopmentTable.css";

export interface ProgramDevelopmentTableProps {
  projects: Project[];
  selectedIds: Set<number>;
  isAllSelected: boolean;
  handleUnselectAll: () => void;
  handleSelectAll: () => void;
  handleSelect: (projectId: number) => void;
}

const ProgramDevelopmentTable: FC<ProgramDevelopmentTableProps> = ({
  projects: filteredProjects,
  selectedIds: selectedProjectIds,
  isAllSelected,
  handleUnselectAll: unselectAllFilteredProjects,
  handleSelectAll: selectAllFilteredProjects,
  handleSelect: toggleSelectProject,
}) => {
  return (
    <table className="project-development-table">
      <thead>
        <tr>
          <td width="10%">
            <div
              className={`filter-dropdown-circle${
                isAllSelected ? " filter-dropdown-circle-active" : ""
              }`}
              onClick={() => {
                if (isAllSelected) {
                  unselectAllFilteredProjects();
                } else selectAllFilteredProjects();
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
        {filteredProjects.map((project: Project) => (
          <tr key={project.Id}>
            <td width="10%" className="td-selector">
              <div
                className={`filter-dropdown-circle${
                  selectedProjectIds.has(project.Id)
                    ? " filter-dropdown-circle-active"
                    : ""
                }`}
                onClick={() => {
                  toggleSelectProject(project.Id);
                }}
              ></div>
            </td>
            <td width="30%">{project.Name}</td>
            <td width="30%" className="td-center">
              {project.ProjectType}
            </td>
            <td width="30%" className="td-center">
              {project.CompositeScore}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramDevelopmentTable;
