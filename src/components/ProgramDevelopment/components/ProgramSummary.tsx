import { useRef, useState } from "react";
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
  editing?: boolean;
  notice?: string;
  onName?: (name: string) => void;
  onSubmit?: (name: string) => void;
  onBack: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
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

export default function ProgramSummary({
  members, program, draftName = "", editing = false, notice, onName, onSubmit, onBack, onCancel, onEdit, onDelete,
}: Props) {
  const [highlight, setHighlight] = useState("");
  const deleteDialog = useRef<HTMLDialogElement>(null);
  const deleteButton = useRef<HTMLButtonElement>(null);
  const cancelDelete = useRef<HTMLButtonElement>(null);
  const districts = districtList(members);

  function requestDelete() {
    deleteDialog.current?.showModal();
    cancelDelete.current?.focus();
  }

  return <ProgramMapLayout title="Member project locations" projects={members} selectedId={highlight} onSelect={setHighlight}>
    <div className="pd-summary-nav">
      <button className="pd-back" type="button" onClick={onBack}><BackIcon color="currentColor" />{program ? "Back to programs" : "Edit selection"}</button>
      {program && <div className="pd-bundle-actions">
        {onEdit && <button className="mdc-btn-main" type="button" onClick={onEdit}>Edit bundle</button>}
        {onDelete && <button className="mdc-btn-export pd-delete-button" type="button" aria-haspopup="dialog"
          ref={deleteButton} onClick={requestDelete}>Delete bundle</button>}
      </div>}
      {editing && onCancel && <button className="mdc-btn-export" type="button" onClick={onCancel}>Cancel</button>}
    </div>
    {program && onDelete && <dialog className="pd-delete-dialog" ref={deleteDialog} role="alertdialog"
      aria-modal="true" aria-labelledby="pd-delete-title" aria-describedby="pd-delete-description"
      onClose={() => deleteButton.current?.focus()}>
      <h2 id="pd-delete-title">Delete bundle?</h2>
      <p id="pd-delete-description"><strong>{program.name}</strong> will be removed from the program list. Its member projects stay available for other bundles.</p>
      <div className="pd-bundle-actions">
        <button className="mdc-btn-export" type="button" ref={cancelDelete} onClick={() => deleteDialog.current?.close()}>Cancel</button>
        <button className="mdc-btn-main pd-confirm-delete" type="button" onClick={() => {
          deleteDialog.current?.close();
          onDelete();
        }}>Delete bundle</button>
      </div>
    </dialog>}
    <header className="pd-heading">
      <div><h1>{program ? program.name : editing ? "Review bundle changes" : "Review program bundle"}</h1>
        <p>{program ? "Track delivery and performance for the projects in this program." : "Confirm the selected projects and their contributions to county goals."}</p></div>
      {program ? <Status value={program.status} /> : <button className="mdc-btn-main" type="submit" form="pd-review-form"
        disabled={!draftName.trim() || !members.length}>{editing ? "Save changes" : "Submit program"}</button>}
    </header>
    {notice && <p className="pd-notice" role="status">{notice}</p>}
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
