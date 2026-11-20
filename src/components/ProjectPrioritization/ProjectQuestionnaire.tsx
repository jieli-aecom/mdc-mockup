import React, { useRef, useState } from "react";
import PortfolioMap from "../PortfolioMap/PortfolioMap";
import { DemoProject, ProjectDraft, ProjectInputs, MapPoint, evaluateProject, emptyInputs, projectSubtypes, getDistricts } from "../../mockData/showcase";
import { ProjectType } from "../../types/Project";
import "./ProjectQuestionnaire.css";

interface Props {
  projects: DemoProject[];
  project?: DemoProject;
  onSubmit: (result: DemoProject) => void;
  onDraft: (result: DemoProject) => void;
  onCancel: () => void;
}

const steps = ["Project details", "Service & infrastructure", "Delivery & access"];
const quantities: { key: keyof Pick<ProjectInputs, "dailyUsers" | "routes" | "improvedStops" | "safeCrossings" | "signalPriority" | "trainingHours">; label: string; help: string }[] = [
  { key: "dailyUsers", label: "Estimated daily users", help: "People served on a typical weekday." },
  { key: "routes", label: "Routes served", help: "Transit routes serving the project area." },
  { key: "improvedStops", label: "Stops to improve", help: "Stops with shelter or boarding upgrades." },
  { key: "safeCrossings", label: "Crossings to upgrade", help: "Intersections with new safety treatments." },
  { key: "signalPriority", label: "Priority intersections", help: "Signals receiving priority or retiming." },
  { key: "trainingHours", label: "Training hours", help: "Operator, staff or community instruction." },
];

const provisions: { key: "accessible" | "zeroEmission" | "equityArea"; label: string; help: string }[] = [
  { key: "accessible", label: "Accessibility improvements", help: "Accessible boarding, pathways, vehicles or passenger information." },
  { key: "zeroEmission", label: "Zero-emission service", help: "Electric vehicles, charging or other zero-emission operations." },
  { key: "equityArea", label: "Priority service area", help: "Serves a community identified for targeted transportation investment." },
];

function newDraft(): ProjectDraft {
  return { id: globalThis.crypto?.randomUUID?.() || "p-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
    name: "", type: ProjectType.Transit, subtype: projectSubtypes[ProjectType.Transit][0], description: "", districts: [],
    geometry: [], inputs: { ...emptyInputs }, reviewStatus: "Created", deliveryStatus: "Planning", comments: [] };
}

export default function ProjectQuestionnaire({ projects, project, onSubmit, onDraft, onCancel }: Props) {
  const [draft, setDraft] = useState<ProjectDraft>(() => project ? { ...project, inputs: { ...project.inputs } } : newDraft());
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  function goToStep(index: number) {
    setStep(index);
    setError("");
    if (panel.current) panel.current.scrollTop = 0;
  }
  function changeType(type: ProjectType) {
    setDraft((current) => ({ ...current, type, subtype: projectSubtypes[type][0] }));
  }
  function changeGeometry(geometry: MapPoint[]) {
    setDraft((current) => ({ ...current, geometry, districts: getDistricts(geometry) }));
  }
  function save(submit: boolean) {
    if (!draft.name.trim() || (submit && !draft.geometry.length)) {
      goToStep(0);
      setError(!draft.name.trim() ? "Enter a project name to continue." : "Draw the project footprint on the map before submitting.");
      return;
    }
    const evaluated = evaluateProject({ ...draft, name: draft.name.trim(), reviewStatus: submit ? "Submitted" : "Created" });
    if (submit) onSubmit(evaluated);
    else onDraft(evaluated);
  }
  function handleContinue(event: React.FormEvent) {
    event.preventDefault();
    if (step === steps.length - 1) save(true);
    else goToStep(step + 1);
  }
  return <section className="pp-editor">
    <div className="pp-editor-panel">
      <div className="pp-page-heading"><div><h1>{project ? "Edit project" : "Create project"}</h1>
        <p>{project ? project.name : "Define the project scope and draw its footprint."}</p></div></div>
      <nav className="pp-steps" aria-label="Questionnaire sections">{steps.map((label, index) => <button type="button"
        key={label} className={step === index ? "is-active" : ""} aria-current={step === index ? "step" : undefined}
        onClick={() => goToStep(index)}><span>{index + 1}</span>{label}</button>)}</nav>
      <form onSubmit={handleContinue}>
        <div className="pp-form-scroll" ref={panel}>
        {error && <div className="pp-error" role="alert">{error}</div>}
        {step === 0 && <section className="pp-form-section"><h2>Project details</h2>
          <div className="pp-field-grid">
            <label className="pp-input-label">Project type<select value={draft.type} onChange={(e) => changeType(e.target.value as ProjectType)}>
              {Object.values(ProjectType).map((type) => <option key={type}>{type}</option>)}</select></label>
            <label className="pp-input-label">Project subtype<select value={draft.subtype} onChange={(e) => setDraft({ ...draft, subtype: e.target.value })}>
              {projectSubtypes[draft.type].map((subtype) => <option key={subtype}>{subtype}</option>)}</select></label>
          </div>
          <label className="pp-input-label">Project name <input value={draft.name} maxLength={120} required autoComplete="off"
            placeholder="e.g. NW 27th Avenue transit priority" onChange={(e) => setDraft({ ...draft, name: e.target.value })}/></label>
          <label className="pp-input-label">Scope of work<textarea rows={3} value={draft.description} maxLength={2000}
            placeholder="Describe the corridor, planned improvements and intended users." onChange={(e) => setDraft({ ...draft, description: e.target.value })}/></label>
          <h3>Project footprint</h3><p className="pp-help">Place the project on the map to identify the commission districts it serves.</p>
          <div className="pp-field-readout"><span>Commission districts</span><strong>{draft.districts.length ? draft.districts.join(", ") : draft.geometry.length ? "Outside mapped districts" : "Awaiting geometry"}</strong></div>
        </section>}
        {step === 1 && <section className="pp-form-section"><h2>Service &amp; infrastructure</h2>
          <p className="pp-help">Estimate conditions at completion. Enter zero where an item does not apply.</p>
          <div className="pp-field-grid">{quantities.map(({key,label,help}) => <label className="pp-input-label" key={key}>{label}
            <input type="number" min="0" max="10000000" step="1" value={draft.inputs[key]} onFocus={(e) => e.target.select()}
              onChange={(e) => setDraft({ ...draft, inputs: { ...draft.inputs, [key]: Math.min(10000000, Math.max(0, Math.floor(Number(e.target.value)))) } })}/>
            <small>{help}</small></label>)}</div>
        </section>}
        {step === 2 && <section className="pp-form-section"><h2>Delivery &amp; access</h2><p className="pp-help">Select the provisions included in this project.</p>
          <div className="pp-provisions">{provisions.map(({key,label,help}) => <label key={key}><input type="checkbox" checked={draft.inputs[key]}
              onChange={(e) => setDraft({ ...draft, inputs: { ...draft.inputs, [key]: e.target.checked } })}/>
            <span><strong>{label}</strong><small>{help}</small></span></label>)}</div>
          <h3>Submission summary</h3><div className="pp-review-box"><strong>{draft.name || "Untitled project"}</strong>
            <p>{draft.type} · {draft.subtype}</p><p>{draft.geometry.length ? `${draft.geometry.length} map ${draft.geometry.length === 1 ? "point" : "points"}` : "Footprint required"}
              {draft.districts.length > 0 && ` · Commission district${draft.districts.length > 1 ? "s" : ""} ${draft.districts.join(", ")}`}</p></div>
        </section>}
        </div>
        <div className="pp-form-actions"><button className="pp-secondary" type="button" onClick={step ? () => goToStep(step - 1) : onCancel}>{step ? "Back" : "Cancel"}</button>
          {(!project || project.reviewStatus === "Created") && <button type="button" className="pp-text-button pp-draft" onClick={() => save(false)}>Save draft</button>}
          <button className="pp-primary" type="submit">{step === steps.length - 1 ? "Submit project" : "Continue →"}</button></div>
      </form>
    </div>
    <aside className="pp-editor-map"><div className="pp-map-heading"><h2>Project footprint</h2><span>Miami-Dade County</span></div>
      <div className="pp-map-canvas"><PortfolioMap projects={projects.filter((p) => p.id !== draft.id)}
        geometry={draft.geometry} onGeometryChange={changeGeometry}/></div>
    </aside>
  </section>;
}
