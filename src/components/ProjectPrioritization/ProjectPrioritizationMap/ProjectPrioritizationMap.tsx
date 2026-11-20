import React from "react";
import PortfolioMap from "../../PortfolioMap/PortfolioMap";
import { DemoProject } from "../../../mockData/showcase";
import "./ProjectPrioritizationMap.css";

interface Props {
  projects: DemoProject[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  title?: string;
  caption?: string;
  showProjectPopup?: boolean;
}

export default function ProjectPrioritizationMap({
  projects, selectedId, onSelect, title = "Project map", caption = "Miami-Dade County", showProjectPopup = true,
}: Props) {
  return (
    <aside className="pp-portfolio-map" aria-label={title}>
      <div className="pp-map-heading"><h2>{title}</h2><span>{caption}</span></div>
      <div className="pp-map-canvas"><PortfolioMap projects={projects} selectedId={selectedId}
        onSelect={onSelect} fitToFeatures showProjectPopup={showProjectPopup} /></div>
    </aside>
  );
}
