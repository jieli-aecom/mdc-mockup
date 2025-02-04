import React from "react";
import "./PerformanceTrackingSidebar.css";
import { PerformanceArea } from "../../../types/PerformanceArea";
import { PERFORMANCE_AREAS } from "../../../consts/performance-areas";
import { grayIcons, whiteIcons } from "./icons";

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
      {PERFORMANCE_AREAS.map((item, index) => {
        const active = item === tab;
        const icon = active ? whiteIcons[item] : grayIcons[item];
        return (
          <div key={`sidebar-item-${item}`}>
            {index > 0 && <div className="sidebar-hr" />}
            <div
              className={`sidebar-item-container${
                active ? " sidebar-item-active" : ""
              }`}
              onClick={() => handleChange(item as PerformanceArea)}
            >
              <img src={icon} alt="icon" />
              {(item as string).toUpperCase()}
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default PerformanceTrackingSidebar;
