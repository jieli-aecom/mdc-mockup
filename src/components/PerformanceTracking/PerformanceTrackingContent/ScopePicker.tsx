import React, { DragEvent, useEffect, useRef, useState } from "react";
import type { DemoProject } from "../../../mockData/showcase";

export interface TrackingSource {
  key: string;
  kind: "Program" | "Project";
  name: string;
  detail: string;
  projectIds: string[];
}

interface ScopePickerProps {
  sources: TrackingSource[];
  selectedKeys: string[];
  includedProjects: DemoProject[];
  changeSelection: (key: string, include: boolean) => void;
}

const dragFormat = "application/x-dtpw-tracking-source";

export default function ScopePicker({ sources, selectedKeys, includedProjects, changeSelection }: ScopePickerProps) {
  const [kind, setKind] = useState<TrackingSource["kind"]>("Program");
  const [drag, setDrag] = useState<TrackingSource | null>(null);
  const selected = selectedKeys.flatMap(key => sources.filter(source => source.key === key));
  const available = sources.filter(source => source.kind === kind && !selectedKeys.includes(source.key));
  const selectedList = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (selectedList.current) selectedList.current.scrollTop = 0;
  }, [selectedKeys]);

  function allowDrop(event: DragEvent, include: boolean) {
    if (drag && selectedKeys.includes(drag.key) !== include) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    }
  }

  function drop(event: DragEvent, include: boolean) {
    event.preventDefault();
    const key = event.dataTransfer.getData(dragFormat);
    if (sources.some(source => source.key === key)) changeSelection(key, include);
    setDrag(null);
  }

  function renderSource(source: TrackingSource, included: boolean) {
    const action = included ? `Remove ${source.name} from view` : `Add ${source.name} to view`;
    const fromProgram = !included && source.kind === "Project" && includedProjects.some(project => project.id === source.projectIds[0]);
    return (
      <li
        className="tracking-source"
        key={source.key}
        draggable
        onDragStart={event => {
          event.dataTransfer.setData(dragFormat, source.key);
          event.dataTransfer.effectAllowed = "move";
          setDrag(source);
        }}
        onDragEnd={() => setDrag(null)}
      >
        <span className="tracking-grip" aria-hidden="true" />
        <div className="tracking-source-text">
          <strong title={source.name}>{source.name}</strong>
          <small>{source.kind} · {source.detail}{fromProgram && " · In selected program"}</small>
        </div>
        <button aria-label={action} title={action} onClick={() => changeSelection(source.key, !included)}>
          {included ? "−" : "+"}
        </button>
      </li>
    );
  }

  const draggingIncluded = drag && selectedKeys.includes(drag.key);
  return (
    <div className="tracking-scope">
      <section
        className={`tracking-source-panel${draggingIncluded ? " tracking-drop-ready" : ""}`}
        aria-label="Available to add"
        onDragOver={event => allowDrop(event, false)}
        onDrop={event => drop(event, false)}
      >
        <div className="tracking-panel-heading">
          <h2>Available to add</h2>
          <select aria-label="Browse available programs or projects" value={kind} onChange={e => setKind(e.target.value as TrackingSource["kind"])}>
            <option value="Program">Programs</option>
            <option value="Project">Projects</option>
          </select>
        </div>
        <ul className="tracking-source-list">{available.map(source => renderSource(source, false))}</ul>
        {!available.length && <p className="tracking-panel-empty">All {kind.toLowerCase()}s are included.</p>}
      </section>
      <section
        className={`tracking-source-panel tracking-included${drag && !draggingIncluded ? " tracking-drop-ready" : ""}`}
        aria-label="Included in this view"
        onDragOver={event => allowDrop(event, true)}
        onDrop={event => drop(event, true)}
      >
        <div className="tracking-panel-heading">
          <h2>Included in this view</h2>
          <span className="tracking-project-count">{includedProjects.length} {includedProjects.length === 1 ? "project" : "projects"}</span>
        </div>
        <ul className="tracking-source-list" ref={selectedList}>{selected.map(source => renderSource(source, true))}</ul>
        {!selected.length && <p className="tracking-panel-empty">Drop a program or project here to start tracking.</p>}
      </section>
    </div>
  );
}
