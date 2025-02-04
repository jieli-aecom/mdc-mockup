import React from "react";
import "./PerformanceTrackingSidebar.css";
import { PerformanceArea } from "../../../types/PerformanceArea";
import { PERFORMANCE_AREAS } from "../../../consts/performance-areas";

interface PerformanceTrackingSidebarProps {
  tab: PerformanceArea;
  handleChange: (newTab: PerformanceArea) => void;
}

const PerformanceTrackingSidebar: React.FC<PerformanceTrackingSidebarProps> = ({
  tab,
  handleChange
}) => {
  return (
    <div className="sidebar-container">
      {PERFORMANCE_AREAS.map((item, index) => (
        <div key={`sidebar-item-${item}`}>
          {index > 0 && <div className="sidebar-hr" />}
          <div
            className={`sidebar-item-container${
              item === tab ? " sidebar-item-active" : ""
            }`}
            onClick={() => handleChange(item as PerformanceArea)}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceTrackingSidebar;
