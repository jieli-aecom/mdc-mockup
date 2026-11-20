import React, { useRef, useState } from "react";
import { deliveryStatuses, useShowcase } from "../../../mockData/showcase";
import type { DeliveryStatus, DemoProject } from "../../../mockData/showcase";
import { PerformanceArea } from "../../../types/PerformanceArea";
import { ProjectType } from "../../../types/Project";
import ScopePicker, { TrackingSource } from "./ScopePicker";
import FilterIcon from "../../../icons/FilterIcon";
import PortfolioMap from "../../PortfolioMap/PortfolioMap";

interface Measure {
  label: string;
  count: (project: DemoProject) => number;
}

// Each value is a sum of questionnaire responses for unique projects aligned with the goal.
const measures: Record<PerformanceArea, Measure[]> = {
  Safe: [
    { label: "Crossing improvements", count: p => p.inputs.safeCrossings },
    { label: "Staff training hours", count: p => p.inputs.trainingHours },
  ],
  Clean: [
    { label: "Zero-emission projects", count: p => Number(p.inputs.zeroEmission) },
    { label: "Walking and cycling projects", count: p => Number(p.type === ProjectType.Bike || p.type === ProjectType.Pedestrian) },
  ],
  Connected: [
    { label: "Transit stop improvements", count: p => p.inputs.improvedStops },
    { label: "Projects improving accessibility", count: p => Number(p.inputs.accessible) },
  ],
  Efficient: [
    { label: "Signal priority locations", count: p => p.inputs.signalPriority },
    { label: "Routes served across projects", count: p => p.inputs.routes },
  ],
};

function Indicator({ label, total, completed }: { label: string; total: number; completed: number }) {
  const share = total ? Math.round(completed * 100 / total) : 0;
  return (
    <article className="tracking-indicator">
      <h3>{label}</h3>
      <strong>{total.toLocaleString("en-US")}</strong>
      <div className="tracking-completion-bar" aria-hidden="true"><span style={{ width: `${share}%` }} /></div>
      <small>{completed.toLocaleString("en-US")} in completed projects</small>
    </article>
  );
}

export default function TrackingPortfolio({ goal }: { goal: PerformanceArea }) {
  const { programs, projects } = useShowcase();
  const sources: TrackingSource[] = [
    ...programs.map(program => ({
      key: `program/${program.id}`,
      kind: "Program" as const,
      name: program.name,
      detail: `${program.projectIds.length} ${program.projectIds.length === 1 ? "project" : "projects"} · ${program.status}`,
      projectIds: program.projectIds,
    })),
    ...projects.map(project => ({
      key: `project/${project.id}`,
      kind: "Project" as const,
      name: project.name,
      detail: project.deliveryStatus,
      projectIds: [project.id],
    })),
  ];
  const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
    const program = programs.find(item => item.status === "Approved" && item.projectIds.length)
      || programs.find(item => item.projectIds.length);
    const outsideProgram = projects.filter(item => !program?.projectIds.includes(item.id));
    const project = outsideProgram.find(item => item.deliveryStatus === "Completed") || outsideProgram[0];
    return [
      ...(program ? [`program/${program.id}`] : []),
      ...(project ? [`project/${project.id}`] : []),
    ];
  });
  const [statuses, setStatuses] = useState<DeliveryStatus[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const projectList = useRef<HTMLDetailsElement>(null);
  const includedIds = new Set(sources.filter(source => selectedKeys.includes(source.key)).flatMap(source => source.projectIds));
  const included = projects.filter(project => includedIds.has(project.id));
  const matching = included.filter(project => !statuses.length || statuses.includes(project.deliveryStatus));
  const mapped = matching.filter(project => project.geometry.length > 0);
  const selectedId = mapped.some(project => project.id === selectedProjectId) ? selectedProjectId : "";
  const aligned = matching.filter(project => project.goals[goal] > 0);
  const completed = aligned.filter(project => project.deliveryStatus === "Completed");

  function changeSelection(key: string, include: boolean) {
    setSelectedKeys(current => {
      if (include) return current.includes(key) ? current : [key, ...current];
      return current.filter(item => item !== key);
    });
  }

  function toggleStatus(status: DeliveryStatus) {
    setStatuses(current => {
      if (current.includes(status)) return current.filter(item => item !== status);
      const next = [...current, status];
      return next.length === deliveryStatuses.length ? [] : next;
    });
  }

  return (
    <div className="tracking-workspace">
      <div className="tracking-controls">
        <p className="performance-tracker-guide">Drag programs or projects into your view, or use the add buttons.</p>
        <ScopePicker sources={sources} selectedKeys={selectedKeys} includedProjects={included} changeSelection={changeSelection} />
        <div className="tracking-statuses" role="group" aria-label="Filter by delivery status">
          <strong><FilterIcon aria-hidden="true" /> Delivery status</strong>
          <button aria-pressed={!statuses.length} onClick={() => setStatuses([])}>All statuses</button>
          {deliveryStatuses.map(status => (
            <button key={status} aria-pressed={statuses.includes(status)} onClick={() => toggleStatus(status)}>{status}</button>
          ))}
        </div>
        {matching.length > 0 && (
          <details className="tracking-members" ref={projectList}>
            <summary>Projects in view ({matching.length})</summary>
            <ul>{matching.map(project => (
              <li key={project.id} className={project.id === selectedId ? "tracking-member-active" : undefined}>
                {project.geometry.length ? (
                  <button type="button" aria-pressed={project.id === selectedId}
                    onClick={() => setSelectedProjectId(project.id)}>{project.name}</button>
                ) : <span>{project.name} · Footprint pending</span>}
                <span>{project.deliveryStatus}</span>
              </li>
            ))}</ul>
          </details>
        )}
        <section className="tracking-results" aria-label={`${goal} portfolio indicators`} aria-live="polite">
          <div className="tracking-results-heading">
            <h2>{goal} indicators</h2>
            <p>{matching.length} of {included.length} included projects in view</p>
          </div>
          {aligned.length > 0 ? (
            <>
              <p className="tracking-note">Totals reflect the full project scope. The bars show the share in completed projects.</p>
              <div className="tracking-indicators">
                <Indicator label="Aligned projects" total={aligned.length} completed={completed.length} />
                {measures[goal].map(measure => (
                  <Indicator
                    key={measure.label}
                    label={measure.label}
                    total={aligned.reduce((sum, project) => sum + measure.count(project), 0)}
                    completed={completed.reduce((sum, project) => sum + measure.count(project), 0)}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="tracking-no-results">
              {!included.length ? "Add a program or project to see its performance indicators."
                : !matching.length ? "No included projects match the selected delivery status."
                : `No projects in this view align with the ${goal} goal.`}
            </p>
          )}
        </section>
      </div>
      <aside className="tracking-map" aria-label="Tracked project map">
        <div className="tracking-map-title">
          <h2>Project map</h2>
          <span>{mapped.length} {mapped.length === 1 ? "project" : "projects"} mapped</span>
        </div>
        <div className="tracking-map-body">
          <PortfolioMap projects={mapped} fitToFeatures selectedId={selectedId}
            onSelect={id => {
              setSelectedProjectId(id);
              if (id && projectList.current) projectList.current.open = true;
            }} />
        </div>
      </aside>
    </div>
  );
}
