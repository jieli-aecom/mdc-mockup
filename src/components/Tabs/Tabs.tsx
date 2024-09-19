import React, { useState } from "react";
import "./Tabs.css";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("performance-tracking");

  return (
    <div className="tabs-container">
      <div className="tabs-nav">
        <div
          className={`tab ${
            activeTab === "performance-tracking" ? "active" : ""
          }`}
          onClick={() => setActiveTab("performance-tracking")}
        >
          Performance Tracking
        </div>
        <div
          className={`tab ${
            activeTab === "project-prioritization" ? "active" : ""
          }`}
          onClick={() => setActiveTab("project-prioritization")}
        >
          Project Prioritization
        </div>
        <div
          className={`tab ${activeTab === "resources" ? "active" : ""}`}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "performance-tracking" && (
          <div className="tab-item">
            <img
              src="performance-tracking-image.png"
              alt="Performance Tracking"
              className="tab-image"
            />
            <div className="tab-text">
              <h2>Performance Tracking</h2>
              <p>Displays performance for key performance indicators</p>
            </div>
          </div>
        )}

        {activeTab === "project-prioritization" && (
          <div className="tab-item">
            <img
              src="project-prioritization-image.png"
              alt="Project Prioritization"
              className="tab-image"
            />
            <div className="tab-text">
              <h2>Project Prioritization</h2>
              <p>
                Assesses individual projects and compares projects to each
                other.
              </p>
              <p>
                Evaluates the aggregated impact of multiple projects to
                visualize alignment in equity and policy.
              </p>
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="tab-item">
            <img
              src="resources-image.png"
              alt="Resources"
              className="tab-image"
            />
            <div className="tab-text">
              <h2>Resources</h2>
              <p>
                Provides access to relevant datasets and technical documents
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
