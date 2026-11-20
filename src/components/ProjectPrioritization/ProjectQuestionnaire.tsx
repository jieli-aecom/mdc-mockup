import React, { useRef, useState } from "react";
import PortfolioMap from "../PortfolioMap/PortfolioMap";
import {
  DemoProject, ProjectDraft, ProjectInputs, TechnicalIntake, MapPoint, emptyInputs,
  evaluateProject, getDistricts, projectSubtypes, resolveTechnicalIntake, usesCorridorTravelTime,
} from "../../mockData/showcase";
import { ProjectType } from "../../types/Project";
import "./ProjectQuestionnaire.css";

interface Props {
  projects: DemoProject[];
  project?: DemoProject;
  onSubmit: (result: DemoProject) => void;
  onDraft: (result: DemoProject) => void;
  onCancel: () => void;
}

const sections = [
  { id: "definition", title: "Project definition" },
  { id: "baseline", title: "Demand & performance" },
  { id: "design", title: "Design & operations" },
  { id: "access", title: "Safety, access & emissions" },
  { id: "delivery", title: "Cost & delivery readiness" },
  { id: "monitoring", title: "Monitoring & verification" },
] as const;

type SectionId = typeof sections[number]["id"];
type KeysOfValue<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];
type Metric = KeysOfValue<TechnicalIntake, number | null>;
type Narrative = KeysOfValue<TechnicalIntake, string>;
type Quantity = KeysOfValue<ProjectInputs, number>;
type Provision = KeysOfValue<ProjectInputs, boolean>;

function newDraft(): ProjectDraft {
  return {
    id: globalThis.crypto?.randomUUID?.() || "p-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
    name: "", type: ProjectType.Transit, subtype: projectSubtypes[ProjectType.Transit][0], description: "", districts: [],
    geometry: [], inputs: { ...emptyInputs }, reviewStatus: "Created", deliveryStatus: "Planning", comments: [],
  };
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return <fieldset className="pp-intake-group"><legend>{title}</legend>{children}</fieldset>;
}

const modeDesignQuestions: Record<ProjectType, string> = {
  Transit: "Which treatments will be installed, and where?",
  Bike: "What separation, buffer widths and intersection treatments are proposed?",
  Pedestrian: "Which sidewalk gaps, crossing distances or curb ramps will change?",
  Roadway: "Which movements, signal phases or lane configurations will change?",
  Freight: "Which loading zones, turning movements or delivery windows will change?",
};

const transitDesignQuestions: Record<string, string> = {
  "Bus priority corridor": "What triggers signal priority, and how much green time can a bus request?",
  "Bus stop improvements": "Which boarding pads, shelters and pedestrian approaches need reconstruction?",
  "Fleet electrification": "What vehicle range, charger capacity and spare fleet assumptions support the duty cycle?",
  "Operator training": "Which operating maneuvers and incident scenarios will operators practice?",
  "Service policy pilot": "Which service rule will change, and which trips qualify for the pilot?",
};

export default function ProjectQuestionnaire({ projects, project, onSubmit, onDraft, onCancel }: Props) {
  const [draft, setDraft] = useState(() => {
    const initial = project ?? newDraft();
    return { ...initial, technical: resolveTechnicalIntake(initial) };
  });
  const [activeSection, setActiveSection] = useState<SectionId>("definition");
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const jumpOffset = useRef<number | null>(null);
  const projectName = useRef<HTMLInputElement>(null);
  const headings = useRef<Partial<Record<SectionId, HTMLElement | null>>>({});
  const isTransit = draft.type === ProjectType.Transit;
  const isTraining = isTransit && draft.subtype === "Operator training";
  const isPolicy = isTransit && draft.subtype === "Service policy pilot";
  const isFleet = isTransit && draft.subtype === "Fleet electrification";
  const showTravel = usesCorridorTravelTime(draft.type, draft.subtype);
  const showServiceLevels = isTransit && (showTravel || isPolicy);
  const designQuestion = (isTransit && transitDesignQuestions[draft.subtype]) || modeDesignQuestions[draft.type];

  function jumpTo(id: SectionId) {
    const scroller = panel.current;
    const heading = headings.current[id];
    if (scroller && heading) {
      scroller.scrollTop += heading.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 2;
      jumpOffset.current = scroller.scrollTop;
    }
    setActiveSection(id);
  }

  function syncSection() {
    const scroller = panel.current;
    if (!scroller || !scroller.clientHeight) return;
    // Near the bottom, multiple sections can share the same clamped jump position.
    if (jumpOffset.current !== null && Math.abs(scroller.scrollTop - jumpOffset.current) < 1) return;
    jumpOffset.current = null;
    if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) {
      setActiveSection("monitoring");
      return;
    }
    const top = scroller.getBoundingClientRect().top + 6;
    let current: SectionId = "definition";
    for (const { id } of sections) {
      const heading = headings.current[id];
      if (heading && heading.getBoundingClientRect().top <= top) current = id;
    }
    setActiveSection(current);
  }

  function section(id: SectionId, children: React.ReactNode) {
    const index = sections.findIndex((item) => item.id === id);
    return <section className="pp-intake-section" aria-labelledby={`intake-${id}`}
      ref={(node) => { headings.current[id] = node; }}>
      <header className="pp-intake-section-head">
        <span className="pp-section-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <h2 id={`intake-${id}`}>{sections[index].title}</h2>
      </header>
      {children}
    </section>;
  }

  function updateTechnical<K extends keyof TechnicalIntake>(key: K, value: TechnicalIntake[K]) {
    setDraft((current) => ({ ...current, technical: { ...current.technical, [key]: value } }));
  }

  function measurement(key: Metric, label: string, options: { max?: number; step?: number; min?: number } = {}) {
    return <label className="pp-input-label">{label}<input type="number" min={options.min ?? 0} max={options.max}
      step={options.step ?? "any"} value={draft.technical[key] ?? ""} onChange={(event) => {
        const value = event.currentTarget.valueAsNumber;
        updateTechnical(key, Number.isFinite(value) ? value : null);
      }} /></label>;
  }

  function narrative(key: Narrative, label: string, placeholder: string, singleLine = false) {
    const props = { value: draft.technical[key], placeholder, maxLength: singleLine ? 240 : 2000,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateTechnical(key, event.target.value) };
    return <label className="pp-input-label">{label}
      {singleLine ? <input {...props} /> : <textarea rows={2} {...props} />}
    </label>;
  }

  function quantity(key: Quantity, label: string) {
    return <label className="pp-input-label">{label}<input type="number" min={0} max={10000000} step={1}
      value={draft.inputs[key]} onFocus={(event) => event.target.select()} onChange={(event) => {
        const value = event.target.valueAsNumber;
        setDraft((current) => ({ ...current, inputs: { ...current.inputs, [key]: Number.isFinite(value) ? value : 0 } }));
      }} /></label>;
  }

  function provision(key: Provision, label: string, detail: string) {
    return <label><input type="checkbox" checked={draft.inputs[key]} onChange={(event) => {
      const checked = event.target.checked;
      setDraft((current) => ({ ...current, inputs: { ...current.inputs, [key]: checked } }));
    }} /><span><strong>{label}</strong><small>{detail}</small></span></label>;
  }

  function changeGeometry(geometry: MapPoint[]) {
    setDraft((current) => ({ ...current, geometry, districts: getDistricts(geometry) }));
    if (geometry.length) setError("");
  }

  function save(submit: boolean) {
    if (!draft.name.trim()) {
      jumpTo("definition");
      projectName.current?.focus();
      setError("Enter a project name before saving.");
      return;
    }
    if (submit && !draft.geometry.length) {
      setError("Draw the project footprint on the map before submitting.");
      return;
    }
    const evaluated = evaluateProject({ ...draft, name: draft.name.trim(), reviewStatus: submit ? "Submitted" : "Created" });
    if (submit) onSubmit(evaluated);
    else onDraft(evaluated);
  }

  return <section className="pp-editor">
    <div className="pp-editor-panel">
      <header className="pp-intake-intro">
        <h1>{project ? "Edit project" : "Create project"}</h1>
        <p>{project?.name || "Project questionnaire"} · {sections.length} sections</p>
      </header>
      <div className="pp-intake-jump">
        <label>Jump to section<select value={activeSection} onChange={(event) => jumpTo(event.target.value as SectionId)}>
          {sections.map(({ id, title }, index) => <option key={id} value={id}>{index + 1}. {title}</option>)}
        </select></label>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); save(true); }}>
        <div className="pp-form-scroll" ref={panel} onScroll={syncSection} role="region" aria-label="Project questionnaire" tabIndex={0}>
          {section("definition", <div className="pp-intake-group">
            <div className="pp-field-grid">
              <label className="pp-input-label">Project type<select value={draft.type} onChange={(event) => {
                const type = event.target.value as ProjectType;
                setDraft((current) => ({ ...current, type, subtype: projectSubtypes[type][0] }));
              }}>{Object.values(ProjectType).map((type) => <option key={type}>{type}</option>)}</select></label>
              <label className="pp-input-label">Project subtype<select value={draft.subtype} onChange={(event) => setDraft({ ...draft, subtype: event.target.value })}>
                {projectSubtypes[draft.type].map((subtype) => <option key={subtype}>{subtype}</option>)}</select></label>
            </div>
            <label className="pp-input-label">Project name<input ref={projectName} value={draft.name} maxLength={120} required
              autoComplete="off" placeholder="e.g. NW 27th Avenue transit priority" onChange={(event) => {
                setDraft({ ...draft, name: event.target.value });
                if (error && event.target.value.trim()) setError("");
              }} /></label>
          </div>)}

          {section("baseline", <>
            {showTravel && <Group title="Peak-period corridor running time">
              <p>Use the same corridor limits, direction and peak hour for both estimates.</p>
              <div className="pp-field-grid">
                {measurement("currentTravelMinutes", "Current running time (min)", { min: 0.01 })}
                {measurement("plannedTravelMinutes", "Projected running time (min)", { min: 0.01 })}
              </div>
            </Group>}
            <Group title={isTraining ? "Operators and service coverage" : "Weekday demand and network reach"}>
              <div className="pp-field-grid">
                {quantity("dailyUsers", "Estimated daily users")}
                {quantity("routes", "Routes served")}
              </div>
              {isTraining && measurement("trainingParticipants", "Operators to be trained", { step: 1 })}
            </Group>
            {showServiceLevels && <Group title="Frequency and reliability">
              <div className="pp-field-grid">
                {measurement("existingHeadway", "Current peak headway (min)", { min: 0.01 })}
                {measurement("plannedHeadway", "Proposed peak headway (min)", { min: 0.01 })}
                {measurement("existingOnTime", "Current on-time trips (%)", { max: 100 })}
                {measurement("plannedOnTime", "Target on-time trips (%)", { max: 100 })}
              </div>
            </Group>}
            <Group title="Measurement basis">
              {narrative("evidenceSource", "What data supports the baseline?", isTransit ? "e.g. Vehicle location records, passenger counts or an operator incident log" : "e.g. Corridor counts, a travel-time survey or a road safety audit", true)}
              {narrative("observationPeriod", "When and under what conditions were observations collected?", "Identify the dates, days of the week and time window.", true)}
            </Group>
          </>)}

          {section("design", <>
            <Group title={isTraining || isPolicy ? "Service area and scope" : "Project limits and scope"}>
              {narrative("corridorLimits", isTraining || isFleet ? "Which facilities and routes are in scope?" : "What are the limits of the project or pilot?", "Identify termini, facilities or segments on the map.", true)}
              <label className="pp-input-label">Scope of work<textarea rows={2} value={draft.description} maxLength={2000}
                placeholder="Describe the intervention and the users it is intended to serve."
                onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label>
            </Group>
            <Group title={isTraining ? "Training design" : isPolicy ? "Pilot design" : isFleet ? "Fleet and charging design" : "Treatment design"}>
              {narrative("treatment", designQuestion, "Specify the design assumptions and operating limits.")}
              {isTraining && quantity("trainingHours", "Total operator and staff training hours")}
            </Group>
            <Group title={isTraining || isPolicy ? "Associated infrastructure" : "Infrastructure quantities"}>
              <div className="pp-field-grid">
                {quantity("signalPriority", "Priority intersections")}
                {quantity("improvedStops", "Stops to improve")}
              </div>
            </Group>
            <Group title="Operating plan">
              {narrative("operationsPlan", isTraining ? "How will training be scheduled across shifts and reinforced in service?" : isPolicy ? "Who will administer exceptions and monitor pilot compliance?" : "How will the treatment operate during peak service and disruptions?", "Identify the responsible team, operating hours and fallback procedure.")}
            </Group>
          </>)}

          {section("access", <>
            <Group title="Safety exposure and countermeasures">
              {narrative("safetyBasis", "Which crash patterns, conflicts or incident records justify the treatment?", "Identify the observation period, affected road users and proposed countermeasures.")}
              <div className="pp-field-grid">
                {quantity("safeCrossings", "Crossings to upgrade")}
                {!isTraining && quantity("trainingHours", "Total operator and staff training hours")}
              </div>
            </Group>
            <Group title="Access, equity and fleet provisions">
              <div className="pp-provisions">
                {provision("accessible", "Accessibility improvements", "Step-free boarding, accessible paths, vehicles or information.")}
                {provision("equityArea", "Priority service area", "Serves a community identified for targeted transportation investment.")}
                {provision("zeroEmission", "Zero-emission service", "Supports electric vehicles, charging or zero-emission operations.")}
              </div>
              {narrative("accessibleDesign", "Which barriers will be removed and how will access be verified?", "Identify the boarding locations, circulation paths or service procedures to review.")}
            </Group>
          </>)}

          {section("delivery", <>
            <Group title="Estimate and design maturity">
              <div className="pp-field-grid">
                <label className="pp-input-label">Implementation stage<select value={draft.technical.implementationStage}
                  onChange={(event) => updateTechnical("implementationStage", event.target.value)}>
                  <option value="">Select a stage</option>
                  {["Concept development", "Feasibility study", "Preliminary design", "Final design", "Ready for delivery"].map((stage) => <option key={stage}>{stage}</option>)}
                </select></label>
                {measurement("costEstimate", "Estimated project cost ($)", { step: 1 })}
              </div>
            </Group>
            <Group title="Dependencies and approvals">
              {narrative("deliveryRisks", "Which approvals, procurement items or partner commitments control the schedule?", "Identify outstanding agreements, utilities, permits or operating resources.")}
            </Group>
          </>)}

          {section("monitoring", <Group title="Performance verification">
            {narrative("outcomeMeasure", "Which measure and target will determine whether the project succeeded?", isTraining ? "e.g. Preventable incidents per 100,000 vehicle miles" : "Identify the indicator, unit and threshold for success.")}
            {narrative("validationPlan", "Who will collect follow-up data, when, and against which baseline?", "Specify a comparison period, data owner and reporting interval.")}
          </Group>)}
        </div>
        {error && <div className="pp-error" role="alert">{error}</div>}
        <div className="pp-form-actions">
          <button className="pp-secondary" type="button" onClick={onCancel}>Cancel</button>
          {(!project || project.reviewStatus === "Created") && <button className="pp-text-button pp-draft" type="button"
            onClick={(event) => { if (event.currentTarget.form?.reportValidity()) save(false); }}>Save draft</button>}
          <button className="pp-primary" type="submit">Submit project</button>
        </div>
      </form>
    </div>
    <aside className="pp-editor-map">
      <div className="pp-map-heading"><h2>Project footprint</h2><span>Miami-Dade County</span></div>
      <div className="pp-map-canvas"><PortfolioMap projects={projects.filter((item) => item.id !== draft.id)}
        geometry={draft.geometry} onGeometryChange={changeGeometry} /></div>
      <div className="pp-editor-districts"><span>Commission districts</span>
        <strong>{draft.districts.length ? draft.districts.join(", ") : draft.geometry.length ? "Outside mapped districts" : "Awaiting geometry"}</strong></div>
    </aside>
  </section>;
}
