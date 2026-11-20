import React, { useRef, useState } from "react";
import { DIVISIONS } from "../../../consts/divisions";
import { Division } from "../../../types/Divisions";
import { PerformanceArea } from "../../../types/PerformanceArea";
import { PerformanceTrackingItem } from "../../../types/PerformanceTrackingItem";
import wheelDiagram from "../../../assets/1_Performance Tracking/wheel-diagram.png";
import ProgressBar from "../../ProgressBar/ProgressBar";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import CheckIcon from "../../../icons/CheckIcon";
import TrackingPortfolio from "./TrackingPortfolio";
import "./PerformanceTrackingContent.css";

interface PerformanceTrackingContentProps {
  goal: PerformanceArea;
  data: PerformanceTrackingItem[];
}

export default function PerformanceTrackingContent({ goal, data }: PerformanceTrackingContentProps) {
  const [division, setDivision] = useState<Division | "">("");
  const infoDialog = useRef<HTMLDialogElement>(null);
  const divisionData = division ? data.filter(item => item.division === division) : data;
  const shown = divisionData.length ? divisionData : data.filter(item => !item.division);

  return (
    <div className="performance-tracker-container">
      <div className="performance-tracker-title">
        <h1>Performance Tracking</h1>
        <button
          className="performance-tracker-infoBtn"
          aria-label="About the strategic goals"
          title="About the strategic goals"
          onClick={() => infoDialog.current?.showModal()}
        >i</button>
      </div>
      <TrackingPortfolio goal={goal} />
      <details className="tracking-division">
        <summary>Department and division indicators</summary>
        <div className="tracking-division-controls">
          <label>Division
            <select value={division} onChange={event => setDivision(event.target.value as Division | "")}>
              <option value="">All divisions</option>
              {DIVISIONS.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          {division && <button onClick={() => setDivision("")}>Clear filter</button>}
        </div>
        {division && !divisionData.length && <p className="tracking-note">Showing department indicators. This division has no separate {goal.toLowerCase()} indicators.</p>}
        <div className="tracking-division-indicators">
          {shown.map(item => (
            <article className="tracking-division-indicator" key={item.description}>
              <span className="tracking-division-name">{item.division || "Department-wide"}</span>
              <div className="tracking-division-value" data-direction={item.direction}>
                {item.direction === "up" ? <ArrowUp /> : item.direction === "down" ? <ArrowDown /> : <CheckIcon />}
                <strong>{item.value}</strong>
              </div>
              <p>{item.description}</p>
              <div className="tracking-division-target">
                <ProgressBar bgcolor="#dce4e7" color="#00aeb4" progress={item.progress} height={5} />
                <small>Target {item.target}</small>
              </div>
            </article>
          ))}
        </div>
      </details>
      <dialog className="tracking-goal-dialog" ref={infoDialog} aria-labelledby="tracking-about-title">
        <div>
          <h2 id="tracking-about-title">DTPW strategic goals</h2>
          <button aria-label="Close strategic goals" onClick={() => infoDialog.current?.close()}>×</button>
        </div>
        <p>The County and DTPW planning documents guide the department’s four strategic goals. The Action Agenda translates those goals into measurable initiatives.</p>
        <img src={wheelDiagram} alt="Diagram showing how the County and DTPW plans align" />
      </dialog>
    </div>
  );
}
