import React, { useState } from "react";
import PerformanceTrackingSidebar from "../../components/PerformanceTracking/PerformanceTrackingSidebar/PerformanceTrackingSidebar";
import PerformanceTrackingContent from "../../components/PerformanceTracking/PerformanceTrackingContent/PerformanceTrackingContent";
import "./PerformanceTracking.css";
import { PERFORMANCE_TRACKING_DATA } from "../../mockData/performance-tracking";
import { PerformanceArea } from "../../types/PerformanceArea";

const PerformanceTracking: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<PerformanceArea>(PerformanceArea.Safe);
  return (
    <div className="main-content-container performance-tracking-page">
      <PerformanceTrackingSidebar
        tab={currentTab}
        handleChange={setCurrentTab}
      />
      <PerformanceTrackingContent
        goal={currentTab}
        data={PERFORMANCE_TRACKING_DATA.filter((item) => item.type === currentTab)}
      />
    </div>
  );
};

export default PerformanceTracking;
