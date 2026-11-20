import { useEffect, useRef, useState } from "react";
import { DemoProgram, DemoProject } from "../../../mockData/showcase";
import ProgramMapLayout from "./ProgramMapLayout";

interface Props {
  programs: DemoProgram[];
  projects: DemoProject[];
  notice: string;
  onOpen: (id: string) => void;
  onCreate: () => void;
}

export function districtList(projects: DemoProject[]) {
  return Array.from(new Set(projects.flatMap(project => project.districts)))
    .sort((a, b) => Number(a) - Number(b));
}

export function Status({ value }: { value: string }) {
  return <span className={"pd-status pd-status-" + value.toLowerCase().replace(/ /g, "-")}>{value}</span>;
}

export default function ProgramCatalog({ programs, projects, notice, onOpen, onCreate }: Props) {
  const [status, setStatus] = useState("");
  const [scopeId, setScopeId] = useState("");
  const [projectId, setProjectId] = useState("");
  const visible = programs.filter(program => !status || program.status === status);
  const scopedProgram = visible.find(program => program.id === scopeId);
  const mapPrograms = scopedProgram ? [scopedProgram] : visible;
  const memberIds = new Set(mapPrograms.flatMap(program => program.projectIds));
  const mapProjects = projects.filter(project => memberIds.has(project.id));
  const locatedProject = mapProjects.find(project => project.id === projectId);
  const firstMatch = visible.find(program => program.projectIds.includes(projectId));
  const firstMatchRow = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (projectId) firstMatchRow.current?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  }, [projectId]);

  function changeScope(id: string) {
    setScopeId(id);
    setProjectId("");
  }

  return <ProgramMapLayout title="Program map" projects={mapProjects} selectedId={projectId} onSelect={setProjectId}
    scopeName={scopedProgram?.name} onClearScope={() => changeScope("")}>
    <header className="pd-heading">
      <div><h1>Programs</h1><p>Review project bundles and track their delivery across commission districts.</p></div>
      <button type="button" className="mdc-btn-main" onClick={onCreate}>Create New Program</button>
    </header>
    {notice && <p role="status" className="pd-notice">{notice}</p>}
    <div className="pd-bar">
      <h2>Program list <span className="pd-count">{visible.length}</span></h2>
      <label className="pd-inline-field">Review status
        <select value={status} onChange={event => { setStatus(event.target.value); changeScope(""); }}>
          <option value="">All statuses</option>
          {["Created", "Submitted", "Approved", "Completed"].map(value => <option key={value}>{value}</option>)}
        </select>
      </label>
    </div>
    <div className="pd-table-scroll">
      <table className="pd-table pd-catalog">
        <thead><tr><th>Program name</th><th>Tags</th><th>Commission districts</th><th>Review status</th></tr></thead>
        <tbody>
          {visible.map(program => {
            const members = projects.filter(project => program.projectIds.includes(project.id));
            const isScoped = scopedProgram?.id === program.id;
            const containsLocated = !!locatedProject && program.projectIds.includes(locatedProject.id);
            return <tr key={program.id} ref={firstMatch?.id === program.id ? firstMatchRow : undefined}
              className={isScoped || containsLocated ? "pd-located-row" : undefined}>
              <td><button className="pd-item-link" type="button" onClick={() => onOpen(program.id)}>{program.name}</button>
                <button type="button" className="pd-locate" aria-pressed={isScoped}
                  aria-label={`Map ${members.length} ${members.length === 1 ? "project" : "projects"} in ${program.name}`}
                  onClick={() => changeScope(isScoped ? "" : program.id)}>
                  Map {members.length} {members.length === 1 ? "project" : "projects"}
                </button>
                {containsLocated && <small className="pd-match">Includes {locatedProject.name}</small>}
              </td>
              <td><div className="pd-tags">{program.tags.map(tag => <span key={tag}>{tag}</span>)}</div></td>
              <td>{districtList(members).join(", ") || "—"}</td>
              <td><Status value={program.status} /></td>
            </tr>;
          })}
        </tbody>
      </table>
      {!visible.length && <p className="pd-empty">No programs match this status.</p>}
    </div>
  </ProgramMapLayout>;
}
