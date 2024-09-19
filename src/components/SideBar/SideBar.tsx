import React, { useState } from "react";
import { ReactComponent as CreateGray } from "../../icons/2_Project_Prioritization/Create_Gray.svg";
import { ReactComponent as CreateWhite } from "../../icons/2_Project_Prioritization/Create_White.svg";
import { ReactComponent as PrioritizationGray } from "../../icons/2_Project_Prioritization/Prioritization_Gray.svg";
import { ReactComponent as PrioritizationWhite } from "../../icons/2_Project_Prioritization/Prioritization_White.svg";
import "./SideBar.css";

interface SideBarProps {
  tab: string;
  handleChange: (newTab: string) => void;
  item: string;
  handleItem: (newItem: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  tab,
  handleChange,
  item,
  handleItem,
}) => {
  const projectPrioritizationTabs = ["Location", "Benefit", "Funding"];

  return (
    <div className="sidebar-container">
      <div
        className={`sidebar-item-container${
          tab === "PROJECT PRIORITIZATION"
            ? " sidebar-prioritization-item-active"
            : ""
        }`}
        onClick={() => {
          handleChange("PROJECT PRIORITIZATION");
          handleItem("");
        }}
      >
        {tab === "PROJECT PRIORITIZATION" ? (
          <PrioritizationWhite />
        ) : (
          <PrioritizationGray />
        )}
        PROJECT PRIORITIZATION
      </div>
      {tab === "PROJECT PRIORITIZATION" && (
        <div className="sidebar-project-prioritization-tabs">
          {projectPrioritizationTabs.map((value) => (
            <div
              key={`sidebar-project-prioritization-item-${value}`}
              className={`sidebar-project-prioritization-tab${
                item === value ? " sidebar-tab-active" : ""
              }`}
              onClick={() => handleItem(value)}
            >
              {value}
            </div>
          ))}
        </div>
      )}
      <div>
        <div className="sidebar-hr" />
        <div
          className={`sidebar-item-container${
            tab === "CREATE PROJECT"
              ? " sidebar-prioritization-item-active"
              : ""
          }`}
          onClick={() => {
            handleChange("CREATE PROJECT");
            handleItem("");
          }}
        >
          {tab === "CREATE PROJECT" ? <CreateWhite /> : <CreateGray />}
          CREATE PROJECT
        </div>
      </div>
    </div>
  );
};

export default SideBar;
