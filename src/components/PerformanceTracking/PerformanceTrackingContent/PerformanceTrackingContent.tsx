import React, { useState } from "react";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import CheckIcon from "../../../icons/CheckIcon";
import ProgressBar from "../../ProgressBar/ProgressBar";
import "./PerformanceTrackingContent.css";
import { Division } from "../../../types/Divisions";
import FilterItem from "../../FilterItem/FilterItem";
import { DIVISIONS } from "../../../consts/divisions";

interface PerformanceTrackingContentProps {
  data: any[];
}

const PerformanceTrackingContent: React.FC<PerformanceTrackingContentProps> = ({
  data,
}) => {
  const [selectedDivision, setDivision] = useState<Division | null>(null);

  const clearFilters = () => {
    setDivision(null);
  };

  return (
    <div className="performance-tracker-container">
      <p className="performance-tracker-title">Performance Tracking</p>
      <p className="performance-tracker-guide">
        Use the filters to narrow your search.
      </p>
      <div className="performance-tracker-filters">
        <div className="performance-tracker-selects">

          <FilterItem
            label="Division"
            items={DIVISIONS}
            selectedItems={
              selectedDivision ? new Set([selectedDivision]) : undefined
            }
            handleUpdate={(item) => setDivision(item as Division)}
          />

          <button
            className="performance-tracker-clear"
            onClick={() => clearFilters()}
          >
            Clear Filters
          </button>
        </div>

        {/* Search: DISABLED for now */}
        {/* <div className="performance-tracker-input-container">
          <input className="performance-tracker-input" placeholder="Search" />
          <div
            style={{
              height: "17px",
              width: "17px",
              backgroundColor: "black",
              marginRight: "20px",
            }}
          ></div>
        </div> */}

      </div>
      <div className="performance-tracker-items">
        {data &&
          data.map((value, index) => (
            <div
              key={`${value.type}-item-${index}`}
              className="performance-tracker-item"
            >
              <div className="performance-tracker-item-content">
                <div
                  className="performance-tracker-item-status"
                  style={{
                    color: value.direction === "down" ? "red" : "green",
                  }}
                >
                  {value.direction === "up" ? (
                    <ArrowUp />
                  ) : value.direction === "down" ? (
                    <ArrowDown />
                  ) : (
                    <CheckIcon />
                  )}
                  {value.value}
                </div>
                <div className="performance-tracker-item-progress">
                  <ProgressBar
                    bgcolor="white"
                    color="#00aeb4"
                    progress={value.progress}
                    height={20}
                  />
                </div>
                <p className="performance-tracker-item-progress-text">
                  {`Target: ${value.target}`}
                </p>
                <p className="performance-tracker-item-description">
                  {value.description}
                </p>
              </div>
              <div className="performance-tracker-item-bottom-hr"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PerformanceTrackingContent;
