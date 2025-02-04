import React, { useCallback, useMemo, useState } from "react";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import CheckIcon from "../../../icons/CheckIcon";
import ProgressBar from "../../ProgressBar/ProgressBar";
import "./PerformanceTrackingContent.css";
import { Division } from "../../../types/Divisions";
import FilterItem from "../../FilterItem/FilterItem";
import { DIVISIONS } from "../../../consts/divisions";
import wheelDiagram from "../../../assets/1_Performance Tracking/wheel-diagram.png";
import PlusIcon from "../../../icons/PlusIcon";

interface PerformanceTrackingContentProps {
  data: any[];
}

const PerformanceTrackingContent: React.FC<PerformanceTrackingContentProps> = ({
  data,
}) => {
  // Modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const closeModel = useCallback(() => {
    setShowModal(false);
  }, []);
  const openModel = useCallback(() => {
    setShowModal(true);
  }, []);

  const modalClass = useMemo(() => {
    return showModal
      ? "performance-tracker-modal performance-tracker-modal-open"
      : "performance-tracker-modal";
  }, [showModal]);

  const [selectedDivision, setDivision] = useState<Division | null>(null);
  // Need a set to pass to FilterItem
  const selectedDivisions: Set<string> = useMemo(() => {
    if (!selectedDivision) return new Set();
    return new Set([selectedDivision as string]);
  }, [selectedDivision]);
  const toggleSelectDivision = useCallback(
    (clicked: string) => {
      const item = clicked as Division;
      if (selectedDivision === item) {
        setDivision(null);
      } else {
        setDivision(item);
      }
    },
    [selectedDivision]
  );

  // Data based on division selection
  const filteredData = useMemo(() => {
    if (!selectedDivision) return data;
    const filtered = data.filter((item) => item.division === selectedDivision);
    if (filtered.length === 0) {
      return data.filter((item) => item.division === null);
    }
    return filtered;
  }, [data, selectedDivision]);

  const clearFilters = () => {
    setDivision(null);
  };

  return (
    <>
      <div className="performance-tracker-container">
        <div className="performance-tracker-title">
          <h1>Performance Tracking</h1>
          <button className="performance-tracker-infoBtn" onClick={openModel}>
            i
          </button>
        </div>
        <p className="performance-tracker-guide">
          Use the filters to narrow your search.
        </p>
        <div className="performance-tracker-filters">
          <div className="performance-tracker-selects">
            <FilterItem
              label="Division"
              items={DIVISIONS}
              selectedItems={selectedDivisions}
              handleUpdate={toggleSelectDivision}
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
          {filteredData &&
            filteredData.map((value, index) => (
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

      <div className={modalClass}>
        <div className="performance-tracker-modal-overlay"></div>
        <div className="performance-tracker-modal-main">
          <div className="performance-tracker-modal-header">
            <button
              className="performance-tracker-modal-close"
              onClick={closeModel}
              title="Close Modal"
              aria-label="Close Modal"
            >
              <PlusIcon />
            </button>
          </div>
          <div className="performance-tracker-modal-body">
            <div className="performance-tracker-modal-text">
              <div>
                <span>
                  The County and DTPW planning documents are interconnected and
                  inform or shape other plans. This interconnected approach
                  ensures alignment with the core pillars:{" "}
                </span>
                <strong>Safe, Clean, Connected, and Efficient</strong>.
              </div>
              <div>
                <span>
                  The Action Agenda has the potential to play a critical role in
                  translating high-level priorities into short-term, measurable
                  actions. It serves as a roadmap for DTPW’s priority
                  initiatives, enabling the department to track progress and
                  remain focused on its core pillars.
                </span>
              </div>
            </div>
            <img src={wheelDiagram} alt="Wheel Diagram" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformanceTrackingContent;
