import React from "react";
import { ReactComponent as CreateGray } from "../../icons/2_Project_Prioritization/Create_Gray.svg";
import { ReactComponent as CreateWhite } from "../../icons/2_Project_Prioritization/Create_White.svg";
import { ReactComponent as PrioritizationGray } from "../../icons/2_Project_Prioritization/Prioritization_Gray.svg";
import { ReactComponent as PrioritizationWhite } from "../../icons/2_Project_Prioritization/Prioritization_White.svg";
import { summaryTabs, SummaryTab } from "../ProjectPrioritization/ProjectPrioritizationContent/table-configs";
import "./SideBar.css";

interface SideBarProps {
  active: string;
  onOpen: (view: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ active, onOpen }) => {
  const overview = summaryTabs.includes(active as SummaryTab);
  return (
    <nav className="sidebar-container pp-nav" aria-label="Project prioritization">
      <button type="button" className={`sidebar-item-container ${overview ? "sidebar-prioritization-item-active" : ""}`} onClick={() => onOpen("Summary")}>
        {overview ? <PrioritizationWhite /> : <PrioritizationGray />}
        PROJECT PRIORITIZATION
      </button>
      {overview && <div className="sidebar-project-prioritization-tabs">
        {summaryTabs.map((tab) => (
          <button type="button" key={tab} aria-current={active === tab ? "page" : undefined}
            className={`sidebar-project-prioritization-tab ${active === tab ? "sidebar-tab-active" : ""}`}
            onClick={() => onOpen(tab)}>{tab}</button>
        ))}
      </div>}
      <div className="sidebar-hr" />
      <button type="button" aria-current={active === "Create Project" ? "page" : undefined}
        className={`sidebar-item-container ${active === "Create Project" ? "sidebar-prioritization-item-active" : ""}`}
        onClick={() => onOpen("Create Project")}>
        {active === "Create Project" ? <CreateWhite /> : <CreateGray />}CREATE PROJECT
      </button>
      <button type="button" aria-current={active === "Public Engagement" ? "page" : undefined}
        className={`sidebar-item-container ${active === "Public Engagement" ? "sidebar-prioritization-item-active" : ""}`}
        onClick={() => onOpen("Public Engagement")}>
        <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 14a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/><path d="M7 8h9M7 12h6"/>
        </svg>PUBLIC ENGAGEMENT
      </button>
    </nav>
  );
};

export default SideBar;
