import React, { useState } from "react";
import PerformanceTrackingSidebar from "../../components/PerformanceTracking/PerformanceTrackingSidebar/PerformanceTrackingSidebar";
import PerformanceTrackingContent from "../../components/PerformanceTracking/PerformanceTrackingContent/PerformanceTrackingContent";
import "./PerformanceTracking.css";
import { PERFORMANCE_TRACKING_DATA } from "../../mockData";

const PerformanceTracking: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("SAFE");
  const data = PERFORMANCE_TRACKING_DATA;

  return (
    <div className="main-content-container">
      <PerformanceTrackingSidebar
        tab={currentTab}
        handleChange={(newTab: string) => setCurrentTab(newTab)}
      />
      <PerformanceTrackingContent
        data={data.filter((item) => item.type === currentTab)}
      />
    </div>
  );
};

export default PerformanceTracking;
