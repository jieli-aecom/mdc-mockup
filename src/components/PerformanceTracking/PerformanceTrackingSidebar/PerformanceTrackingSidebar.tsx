import React from "react";
import { PERFORMANCE_TRACKING_SIDEBAR_ITEMS } from "../../../consts";
import "./PerformanceTrackingSidebar.css";

interface PerformanceTrackingSidebarProps {
  tab: string;
  handleChange: (newTab: string) => void;
}

const PerformanceTrackingSidebar: React.FC<PerformanceTrackingSidebarProps> = ({
  tab,
  handleChange
}) => {
  return (
    <div className="sidebar-container">
      {PERFORMANCE_TRACKING_SIDEBAR_ITEMS.map((item, index) => (
        <div key={`sidebar-item-${item}`}>
          {index > 0 && <div className="sidebar-hr" />}
          <div
            className={`sidebar-item-container${
              item === tab ? " sidebar-item-active" : ""
            }`}
            onClick={() => handleChange(item)}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceTrackingSidebar;
