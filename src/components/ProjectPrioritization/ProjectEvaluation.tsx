import React, { useEffect, useState } from "react";
import { corridorForecast, DemoProject, goalMeasures } from "../../mockData/showcase";
import { PERFORMANCE_AREAS } from "../../consts/performance-areas";
import { ProjectType } from "../../types/Project";
import safeIcon from "../../icons/0_Home/Safe.svg";
import cleanIcon from "../../icons/0_Home/Clean.svg";
import efficientIcon from "../../icons/0_Home/Efficient.svg";
import connectedIcon from "../../icons/0_Home/Connected.svg";
import ProjectPrioritizationMap from "./ProjectPrioritizationMap/ProjectPrioritizationMap";
import "./ProjectEvaluation.css";

const steps = [
  "Sample location factors along the project footprint",
  "Calculate social, environmental and economic benefits",
  "Match performance measures to the four strategic goals",
  "Screen the project scope for funding opportunities"
];
const goalIcons = { Safe: safeIcon, Clean: cleanIcon, Efficient: efficientIcon, Connected: connectedIcon };

function Breakdown({ label, score, values, children }: { label: string; score: number; values: Record<string, number>; children: React.ReactNode }) {
  return <section className="pp-score-card"><header><h3>{label}</h3><strong>{score}<small>/100</small></strong></header>
    <p>{children}</p><dl>{Object.entries(values).map(([name,value]) => <div key={name}><dt>{name}</dt>
      <dd><span className="pp-score-bar" aria-hidden="true"><i style={{width: value + "%"}}/></span><b>{value}</b></dd>
    </div>)}</dl></section>;
}

export default function ProjectEvaluation({ project, animate, onComplete, onReturn }: {
  project: DemoProject; animate: boolean; onComplete: () => void; onReturn: () => void;
}) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!animate) return;
    const timer = window.setTimeout(() => {
      if (stage + 1 === steps.length) onComplete();
      else setStage(stage + 1);
    }, 730);
    return () => window.clearTimeout(timer);
  }, [stage, animate, onComplete]);
  const i = project.inputs;
  const forecast = corridorForecast(project);
  const runningTime = forecast && `${forecast.current} min baseline · ${forecast.planned} min projected`;
  const efficiencyEvidence = `${i.signalPriority} priority intersections · ${i.routes} routes served`;
  const source = project.technical?.evidenceSource;
  const observationPeriod = project.technical?.observationPeriod;
  const evidence = {
    Safe: `${i.safeCrossings} crossing upgrades · ${i.trainingHours} training hours`,
    Clean: i.zeroEmission ? "Zero-emission operations supported" : project.type === ProjectType.Bike || project.type === ProjectType.Pedestrian ? "Active transportation improvement" : "No clean mobility provision selected",
    Efficient: runningTime ? `${efficiencyEvidence} · ${runningTime}` : efficiencyEvidence,
    Connected: `${i.improvedStops} improved stops · ${i.accessible ? "Accessibility upgrades" : "No accessibility upgrades"}`,
  };
  const footprint = <ProjectPrioritizationMap title="Project footprint" projects={[project]}
    selectedId={project.id} showProjectPopup={false} caption={project.districts.length
      ? `Commission district${project.districts.length === 1 ? "" : "s"} ${project.districts.join(", ")}`
      : project.geometry.length ? "Miami-Dade County" : "No footprint drawn"} />;
  if (animate) return <div className="pp-overview pp-evaluation-layout"><section className="pp-wide-page pp-evaluating" aria-live="polite"><div className="pp-eval-progress">
    <div className="pp-loading-ring" aria-hidden="true" /><h1>Evaluating project</h1><p>{project.name}</p>
    <progress aria-label="Evaluation progress" value={stage + 1} max={steps.length}/>
    <ol>{steps.map((text, index) => <li key={text} className={index === stage ? "active" : index < stage ? "complete" : ""}>
      <span aria-hidden="true">{index < stage ? "✓" : index + 1}</span>{text}</li>)}</ol>
  </div></section>{footprint}</div>;

  return <div className="pp-overview pp-evaluation-layout"><section className="pp-wide-page pp-review-page">
    <div className="pp-page-heading"><div><h1>Project evaluation</h1><p>{project.name} · {project.subtype}</p></div>
      <button className="pp-primary" onClick={onReturn}>Return to summary</button></div>
    <div className="pp-result-overview"><div className="pp-result-total"><b>{project.composite}</b><span>Composite score<br/><small>out of 100</small></span></div>
      <div><strong>Scoring method</strong><p>The composite gives equal weight to the location score ({project.location}) and benefit score ({project.benefit}).</p></div>
    </div>
    <h2>Strategic goal alignment</h2>
    <div className="pp-goal-cards">{PERFORMANCE_AREAS.map((goal) => <article key={goal} className={project.goals[goal] ? "aligned" : ""}>
      <div><img src={goalIcons[goal]} alt=""/><h3>{goal}</h3></div>
      <strong>{project.goals[goal] ? "Contributes" : "No contribution"}</strong>
      <p title={goalMeasures[goal]}>{evidence[goal]}</p></article>)}</div>
    <section className="pp-funding"><h2>Funding opportunities</h2><ul>{project.funding.map((fund) => <li key={fund}>{fund}</li>)}</ul></section>
    <h2>Score breakdown</h2>
    <div className="pp-score-grid">
      <Breakdown label="Location score" score={project.location} values={project.locationBreakdown}>Each factor averages nearby CTMP reference scores across the project footprint. The location score averages these factors.</Breakdown>
      <Breakdown label="Benefit score" score={project.benefit} values={project.benefitBreakdown}>
        Estimated users, service improvements and access provisions inform three equally weighted benefit categories.
        {forecast && (forecast.reduction > 0
          ? <> The submitted peak travel times imply a {(forecast.reduction * 100).toLocaleString(undefined, { maximumFractionDigits: 1 })}% reduction. This earns the same share of any efficiency points remaining after routes and signals are scored. Efficiency contributes to the economic score.</>
          : <> The projected peak travel time yields no time savings. Routes and priority intersections determine the efficiency contribution.</>)}
        {forecast && source && <> Reported source — {source}</>}
        {forecast && observationPeriod && <> Observation period — {observationPeriod}</>}
      </Breakdown>
    </div>
  </section>{footprint}</div>;
}
