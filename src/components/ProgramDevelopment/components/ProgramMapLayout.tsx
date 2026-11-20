import type { ReactNode } from "react";
import { DemoProject } from "../../../mockData/showcase";
import PortfolioMap from "../../PortfolioMap/PortfolioMap";

interface Props {
  children: ReactNode;
  projects: DemoProject[];
  selectedId: string;
  onSelect: (id: string) => void;
  highlightedIds?: string[];
  title: string;
  scopeName?: string;
  onClearScope?: () => void;
}

export default function ProgramMapLayout({
  children, projects, selectedId, onSelect, highlightedIds, title, scopeName, onClearScope,
}: Props) {
  const selected = projects.find(project => project.id === selectedId);
  const count = projects.filter(project => project.geometry.length).length;
  return <div className="pd-map-layout">
    <div className="pd-report"><div className="pd-page">{children}</div></div>
    <aside className="pd-location-pane" aria-label={title}>
      <header className="pd-map-heading">
        <h2>{title}</h2>
        <span>{count} {count === 1 ? "project" : "projects"}</span>
      </header>
      {scopeName && <div className="pd-map-scope">
        <strong>{scopeName}</strong>
        <button type="button" onClick={onClearScope}>Show all</button>
      </div>}
      <div className="pd-map">
        <PortfolioMap projects={projects} fitToFeatures showProjectPopup={false}
          highlightedIds={highlightedIds} selectedId={selected?.id ?? ""} onSelect={onSelect} />
      </div>
      {selected && <div className="pd-map-selection">
        <strong>{selected.name}</strong>
        <span>{selected.type}{!!selected.districts.length && " · " + (selected.districts.length === 1 ? "District " : "Districts ") + selected.districts.join(", ")}</span>
      </div>}
    </aside>
  </div>;
}
