import { useState } from "react";
import { TOP_PERCENT_OPTIONS, TopPercent } from "../../../consts/top-percents";
import { DemoProject } from "../../../mockData/showcase";
import ProgramMapLayout from "./ProgramMapLayout";
import MemberProjects from "./MemberProjects";
import { districtList } from "./ProgramCatalog";

interface Props {
  projects: DemoProject[];
  projectIds: string[];
  setProjectIds: (ids: string[]) => void;
  onReview: () => void;
}

export default function ProgramBuilder({ projects, projectIds, setProjectIds, onReview }: Props) {
  const [type, setType] = useState("");
  const [district, setDistrict] = useState("");
  const [percent, setPercent] = useState<TopPercent>(100);
  const [highlight, setHighlight] = useState("");
  const filtered = projects.filter(project => (!type || project.type === type) && (!district || project.districts.includes(district)))
    .sort((a, b) => b.composite - a.composite);
  const ranked = filtered.slice(0, Math.ceil(filtered.length * percent / 100));
  const types = Array.from(new Set(projects.map(project => project.type))).sort();
  const selected = projects.filter(project => projectIds.includes(project.id));

  const visibleHighlight = ranked.some(project => project.id === highlight) ? highlight : "";
  return <ProgramMapLayout title="Project locations" projects={ranked} highlightedIds={projectIds}
    selectedId={visibleHighlight} onSelect={setHighlight}>
    <header className="pd-heading">
      <div><h1>Create New Program</h1><p>Select projects for the bundle. Open a project to review its scores, strategic goals and public feedback.</p></div>
    </header>
    <div className="pd-builder-controls">
      <label className="pd-field">Project type
        <select value={type} onChange={event => setType(event.target.value)}>
          <option value="">All types</option>{types.map(item => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className="pd-field">Commission district
        <select value={district} onChange={event => setDistrict(event.target.value)}>
          <option value="">All districts</option>{districtList(projects).map(item => <option value={item} key={item}>District {item}</option>)}
        </select>
      </label>
      <label className="pd-field">Composite rank
        <select value={percent} onChange={event => setPercent(Number(event.target.value) as TopPercent)}>
          {TOP_PERCENT_OPTIONS.map(item => <option value={item.value} key={item.value}>{item.value === 100 ? "All projects" : item.label}</option>)}
        </select>
      </label>
    </div>
    <div className="pd-bar">
      <h2>Available projects <span className="pd-count">{ranked.length}</span></h2>
      <span className="pd-muted">Highest composite score first</span>
    </div>
    <MemberProjects projects={ranked} selected={projectIds} onSelection={setProjectIds}
      expanded={visibleHighlight} onExpand={setHighlight} />
    <footer className="pd-selection-footer">
      <div><strong>{selected.length} {selected.length === 1 ? "project" : "projects"} selected</strong>
        {!!selected.length && <span> · {districtList(selected).length} commission {districtList(selected).length === 1 ? "district" : "districts"}</span>}</div>
      <button type="button" className="mdc-btn-main" disabled={!selected.length} onClick={onReview}>Review bundle</button>
    </footer>
  </ProgramMapLayout>;
}
