import React, { useState } from "react";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import CheckIcon from "../../../icons/CheckIcon";
import ProgressBar from "../../ProgressBar/ProgressBar";
import "./PerformanceTrackingContent.css";

interface PerformanceTrackingContentProps {
  data: any[];
}

const PerformanceTrackingContent: React.FC<PerformanceTrackingContentProps> = ({
  data
}) => {
  const [openSelectCommissionDistrict, setOpenSelectCommissionDistrict] =
    useState(false);
  const [openSelectDivision, setOpenSelectDivision] = useState(false);
  const [selectedCommissionDistrict, setCommissionDistrict] = useState("");
  const [selectedDivision, setDivision] = useState("");

  const clearFilters = () => {
    setOpenSelectCommissionDistrict(false);
    setOpenSelectDivision(false);
    setCommissionDistrict("");
    setDivision("");
  };

  return (
    <div className="project-manage-container">
      <p className="project-manage-title">Performance Tracking</p>
      <p className="performance-tracking-guide">
        Use the filters to narrow your search.
      </p>
      <div className="performance-tracking-filters">
        <div className="performance-tracking-selects">
          <div
            className={`performance-tracking-select${
              openSelectCommissionDistrict
                ? " performance-tracking-select-active"
                : ""
            }`}
            onClick={() =>
              setOpenSelectCommissionDistrict(!openSelectCommissionDistrict)
            }
          >
            <p className="performance-tracking-select-text">
              Commission District
            </p>
          </div>
          <div
            className={`performance-tracking-select${
              openSelectDivision ? " performance-tracking-select-active" : ""
            }`}
            onClick={() => setOpenSelectDivision(!openSelectDivision)}
          >
            <p className="performance-tracking-select-text">Division</p>
          </div>
          <div
            className="performance-tracking-select-clear"
            onClick={() => clearFilters()}
          >
            CLEAR FILTERS
          </div>
        </div>
        <div className="performance-tracking-input-container">
          <input className="performance-tracking-input" placeholder="Search" />
          <div
            style={{
              height: "17px",
              width: "17px",
              backgroundColor: "black",
              marginRight: "20px"
            }}
          ></div>
        </div>
      </div>
      <div className="performance-tracking-items">
        {data &&
          data.map((value, index) => (
            <div
              key={`${value.type}-item-${index}`}
              className="performance-tracking-item"
            >
              <div className="performance-tracking-item-content">
                <div
                  className="performance-tracking-item-status"
                  style={{
                    color: value.direction === "down" ? "red" : "green"
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
                <div className="performance-tracking-item-progress">
                  <ProgressBar
                    bgcolor="white"
                    color="#00aeb4"
                    progress={value.progress}
                    height={20}
                  />
                </div>
                <p className="performance-tracking-item-progress-text">
                  {`Target: ${value.target}`}
                </p>
                <p className="performance-tracking-item-description">
                  {value.description}
                </p>
              </div>
              <div className="performance-tracking-item-bottom-hr"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PerformanceTrackingContent;
