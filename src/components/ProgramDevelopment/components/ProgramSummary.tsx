import { useState } from "react";
import { PERFORMANCE_AREAS } from "../../../consts/performance-areas";
import { DemoProgram, DemoProject } from "../../../mockData/showcase";
import { ProjectType } from "../../../types/Project";
import SafeIcon from "../../../assets/0_Home/Safe.svg";
import CleanIcon from "../../../assets/0_Home/Clean.svg";
import EfficientIcon from "../../../assets/0_Home/Efficient.svg";
import ConnectedIcon from "../../../assets/0_Home/Connected.svg";
import ProgramMapLayout from "./ProgramMapLayout";
import BackIcon from "../../../icons/BackIcon";
import MemberProjects from "./MemberProjects";
import { districtList, Status } from "./ProgramCatalog";

interface Props {
  members: DemoProject[];
  program?: DemoProgram;
  draftName?: string;
  onName?: (name: string) => void;
  onSubmit?: (name: string) => void;
  onBack: () => void;
}

const icons = { Safe: SafeIcon, Clean: CleanIcon, Efficient: EfficientIcon, Connected: ConnectedIcon };

function mean(projects: DemoProject[]) {
  return projects.length ? Number((projects.reduce((total, project) => total + project.composite, 0) / projects.length).toFixed(1)) : "—";
}

function PolicyAlignment({ members }: { members: DemoProject[] }) {
  const sumInputs = (key: "safeCrossings" | "trainingHours" | "signalPriority" | "improvedStops") =>
    members.reduce((sum, project) => sum + project.inputs[key], 0);
  const count = (n: number, unit: string) => n + " " + unit + (n === 1 ? "" : "s");
  const measures = {
    Safe: count(sumInputs("safeCrossings"), "crossing upgrade") + " · " + count(sumInputs("trainingHours"), "training hour"),
    Clean: count(members.filter(p => p.inputs.zeroEmission).length, "zero-emission project") + " · " +
      count(members.filter(p => p.type === ProjectType.Bike || p.type === ProjectType.Pedestrian).length, "active travel project"),
    Efficient: count(sumInputs("signalPriority"), "priority intersection") + " · " +
      count(members.filter(p => p.inputs.routes > 0).length, "route improvement project"),
    Connected: count(sumInputs("improvedStops"), "improved stop") + " · " +
      count(members.filter(p => p.inputs.accessible).length, "accessibility project"),
  };
  return <section className="pd-section">
    <h2>Policy alignment</h2>
    <div className="pd-policy-grid">
      {PERFORMANCE_AREAS.map(area => {
        const aligned = members.filter(project => project.goals[area] > 0);
        const points = aligned.reduce((total, project) => total + project.goals[area], 0);
        return <div className={"pd-policy pd-policy-" + area.toLowerCase()} key={area}>
          <div className="pd-goal-heading"><img src={icons[area]} alt="" /><h3>{area}</h3></div>
          <div className="pd-goal-value"><strong>{aligned.length}</strong> of {members.length} {members.length === 1 ? "project" : "projects"} aligned</div>
          <div className="pd-goal-track"><span style={{ width: (members.length ? 100 * aligned.length / members.length : 0) + "%" }} /></div>
          <div className="pd-goal-total">{points} total alignment points</div>
          <div className="pd-goal-measures">{measures[area]}</div>
        </div>;
      })}
    </div>
  </section>;
}

function Distribution({ members, byDistrict }: { members: DemoProject[]; byDistrict?: boolean }) {
  const groups = byDistrict ? districtList(members) : Array.from(new Set(members.map(project => project.type))).sort();
  const title = byDistrict ? "Commission districts" : "Project types";
  return <details className="pd-detail">
    <summary>{title}</summary>
    <table className="pd-table">
      <thead><tr><th>{byDistrict ? "District" : "Project type"}</th><th>Projects</th><th>Average composite score</th></tr></thead>
      <tbody>{groups.map(group => {
        const rows = members.filter(project => byDistrict ? project.districts.includes(group) : project.type === group);
        return <tr key={group}><td>{group}</td><td>{rows.length}</td><td>{mean(rows)}</td></tr>;
      })}</tbody>
    </table>
  </details>;
}

export default function ProgramSummary({ members, program, draftName = "", onName, onSubmit, onBack }: Props) {
  const [highlight, setHighlight] = useState("");
  const districts = districtList(members);
  return <ProgramMapLayout title="Member project locations" projects={members} selectedId={highlight} onSelect={setHighlight}>
    <button className="pd-back" type="button" onClick={onBack}><BackIcon color="currentColor" />{program ? "Back to programs" : "Edit selection"}</button>
    <header className="pd-heading">
      <div><h1>{program ? program.name : "Review program bundle"}</h1>
        <p>{program ? "Track delivery and performance for the projects in this program." : "Confirm the selected projects and their contributions to county goals."}</p></div>
      {program ? <Status value={program.status} /> : <button className="mdc-btn-main" type="submit" form="pd-review-form"
        disabled={!draftName.trim() || !members.length}>Submit program</button>}
    </header>
    {!program && <form className="pd-review-form" id="pd-review-form" onSubmit={event => {
      event.preventDefault();
      if (draftName.trim() && members.length) onSubmit?.(draftName);
    }}>
      <label className="pd-field">Program name
        <input autoComplete="off" required maxLength={100} value={draftName} onChange={event => onName?.(event.target.value)} />
      </label>
    </form>}
    <dl className="pd-stats">
      <div><dt>Member projects</dt><dd>{members.length}</dd></div>
      <div><dt>Commission districts</dt><dd>{districts.join(", ") || "—"}</dd></div>
      <div><dt>Average composite score</dt><dd>{mean(members)}<small> / 100</small></dd></div>
    </dl>
    <div className="pd-bar"><h2>{program ? "Project delivery" : "Member projects"}</h2></div>
    <MemberProjects projects={members} tracking={!!program} expanded={highlight} onExpand={setHighlight} />
    <PolicyAlignment members={members} />
    <div className="pd-distribution"><Distribution members={members} /><Distribution members={members} byDistrict /></div>
  </ProgramMapLayout>;
}
