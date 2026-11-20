import { Fragment, useEffect, useRef } from "react";
import { PERFORMANCE_AREAS } from "../../../consts/performance-areas";
import { DemoProject } from "../../../mockData/showcase";
import { Status } from "./ProgramCatalog";

interface Props {
  projects: DemoProject[];
  selected?: string[];
  onSelection?: (ids: string[]) => void;
  tracking?: boolean;
  expanded: string;
  onExpand: (id: string) => void;
}

export default function MemberProjects({ projects, selected, onSelection, tracking, expanded, onExpand }: Props) {
  const activeRow = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    activeRow.current?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  }, [expanded]);
  const selecting = !!onSelection;
  const allSelected = !!projects.length && projects.every(project => selected?.includes(project.id));
  const columns = 4 + Number(selecting) + Number(!!tracking);

  function toggleProject(id: string) {
    if (!selected || !onSelection) return;
    onSelection(selected.includes(id) ? selected.filter(item => item !== id) : [...selected, id]);
  }
  function toggleVisible() {
    if (!selected || !onSelection) return;
    const visibleIds = projects.map(project => project.id);
    onSelection(allSelected ? selected.filter(id => !visibleIds.includes(id)) : Array.from(new Set([...selected, ...visibleIds])));
  }

  return <div className="pd-table-scroll">
    <table className="pd-table pd-members">
      <thead><tr>
        {selecting && <th className="pd-check"><input type="checkbox" aria-label="Select all visible projects" checked={allSelected} onChange={toggleVisible} /></th>}
        <th>Project name</th><th>Commission districts</th><th>Composite score</th><th>Goal alignment</th>{tracking && <th>Delivery status</th>}
      </tr></thead>
      <tbody>
        {projects.map(project => {
          const isOpen = expanded === project.id;
          const goals = PERFORMANCE_AREAS.filter(area => project.goals[area] > 0);
          return <Fragment key={project.id}>
            <tr ref={isOpen ? activeRow : undefined} className={isOpen ? "pd-located-row" : selected?.includes(project.id) ? "pd-selected-row" : undefined}>
              {selecting && <td className="pd-check"><input type="checkbox" aria-label={"Select " + project.name}
                checked={selected?.includes(project.id) || false} onChange={() => toggleProject(project.id)} /></td>}
              <td>
                <button type="button" className="pd-project-toggle" aria-expanded={isOpen}
                  onClick={() => onExpand(isOpen ? "" : project.id)}>
                  <span className={"pd-chevron" + (isOpen ? " pd-chevron-open" : "")} aria-hidden="true" />
                  {project.name}
                </button>
                <small className="pd-subline pd-indented">{project.type}</small>
              </td>
              <td>{project.districts.join(", ") || "—"}</td>
              <td><strong className="pd-score">{Math.round(project.composite)}</strong>
                {!selecting && <small className="pd-subline">Location {Math.round(project.location)} · Benefit {Math.round(project.benefit)}</small>}</td>
              <td><div className="pd-goals">{goals.map(area => <span key={area}>{area}</span>)}{!goals.length && "—"}</div></td>
              {tracking && <td><Status value={project.deliveryStatus} /></td>}
            </tr>
            {isOpen && <tr className="pd-expanded"><td colSpan={columns}>
              <div className="pd-expanded-grid">
                <div><h3>Project scores</h3>
                  <dl className="pd-score-list">
                    <div><dt>Composite</dt><dd>{Math.round(project.composite)}</dd></div>
                    <div><dt>Location</dt><dd>{Math.round(project.location)}</dd></div>
                    <div><dt>Benefit</dt><dd>{Math.round(project.benefit)}</dd></div>
                  </dl>
                </div>
                <div><h3>Strategic goal alignment</h3>
                  <dl className="pd-score-list">{PERFORMANCE_AREAS.map(area => <div key={area}><dt>{area}</dt><dd>{project.goals[area]}</dd></div>)}</dl>
                </div>
                <div><h3>Public engagement <span className="pd-count">{project.comments.length}</span></h3>
                  {project.comments.length ? <div className="pd-comments">{project.comments.map((comment, i) => <blockquote key={i}>
                    <p>{comment.text}</p><cite>{[comment.author, comment.location].filter(Boolean).join(" · ")}</cite>
                  </blockquote>)}</div> : <p className="pd-muted">No public comments recorded.</p>}
                </div>
              </div>
            </td></tr>}
          </Fragment>;
        })}
      </tbody>
    </table>
    {!projects.length && <p className="pd-empty">No projects match these filters.</p>}
  </div>;
}
