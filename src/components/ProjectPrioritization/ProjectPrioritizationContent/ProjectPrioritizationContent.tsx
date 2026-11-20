import React, { useEffect, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { DemoProject } from "../../../mockData/showcase";
import { ProjectType } from "../../../types/Project";
import { TOP_PERCENT_OPTIONS } from "../../../consts/top-percents";
import ProjectPrioritizationTable from "../ProjectPrioritizationTable/ProjectPrioritizationTable";
import ProjectPrioritizationMap from "../ProjectPrioritizationMap/ProjectPrioritizationMap";
import { columnsFor, SummaryTab } from "./table-configs";
import "./ProjectPrioritizationContent.css";

interface Props {
  tab: SummaryTab;
  projects: DemoProject[];
  initialProjectId: string;
  onCreate: () => void;
  onEdit: (id: string) => void;
  onEngagement: (id: string) => void;
  onEvaluation: (id: string) => void;
}

function PortfolioFilter({ label, options, values, onChange }: {
  label: string; options: string[]; values: string[]; onChange: (values: string[]) => void;
}) {
  return <details className="pp-filter"><summary>{label}{values.length > 0 && <b>{values.length}</b>}</summary>
    <div className="pp-filter-menu">{options.map((option) => <label key={option}>
      <input type="checkbox" checked={values.includes(option)} onChange={(event) => onChange(event.target.checked ? [...values, option] : values.filter((item) => item !== option))} />
      {option}</label>)}</div>
  </details>;
}

export default function ProjectPrioritizationContent({ tab, projects, initialProjectId, onCreate, onEdit, onEngagement, onEvaluation }: Props) {
  const [types, setTypes] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [top, setTop] = useState(100);
  const [selectedId, setSelectedId] = useState(initialProjectId);
  useEffect(() => { setSelectedId(initialProjectId); }, [initialProjectId]);
  const filtered = projects.filter((p) =>
    (!types.length || types.includes(p.type)) && (!statuses.length || statuses.includes(p.reviewStatus)) &&
    (!districts.length || p.districts.some((district) => districts.includes(district)))
  ).sort((a, b) => b.composite - a.composite);
  const ranked = filtered.slice(0, Math.ceil(filtered.length * top / 100));
  const selected = ranked.find((project) => project.id === selectedId);
  const columns = useMemo(() => columnsFor(tab, projects), [tab, projects]);
  const districtOptions = Array.from(new Set(projects.flatMap((p) => p.districts))).sort((a,b) => Number(a) - Number(b));
  const exportData = ranked.map((p) => [p.name, p.type, p.districts.join(", "), ...columns.map((col) => col.value(p))]);
  const subtitle = {
    Summary: "Review project scores, submissions and community feedback.",
    Location: "Compare the geographic factors behind each location score.",
    Benefit: "Compare the social, environmental and economic benefits of each project.",
    Funding: "Explore funding opportunities matched to project scope and eligibility."
  }[tab];

  return <section className="pp-overview">
    <div className="pp-overview-main">
      <div className="pp-page-heading"><div><h1>{tab}</h1><p>{subtitle}</p></div>
        <button type="button" className="pp-primary" onClick={onCreate}>Create Project</button></div>
      {tab === "Summary" && <div className="pp-metrics">
        <div><strong>{projects.length}</strong><span>Projects</span></div>
        <div><strong>{projects.filter((p) => p.reviewStatus === "Submitted").length}</strong><span>Submitted for review</span></div>
        <div><strong>{projects.reduce((count, p) => count + p.comments.length, 0)}</strong><span>Project comments</span></div>
      </div>}
      <div className="pp-toolbar">
        <PortfolioFilter label="Type" options={Object.values(ProjectType)} values={types} onChange={setTypes}/>
        <PortfolioFilter label="Commission district" options={districtOptions} values={districts} onChange={setDistricts}/>
        <PortfolioFilter label="Status" options={["Created","Submitted","Approved"]} values={statuses} onChange={setStatuses}/>
        <CSVLink className="pp-export" filename={`project-${tab.toLowerCase()}.csv`} data={exportData}
          headers={["Project", "Type", "Commission districts", ...columns.map((col) => col.label)]}>Export</CSVLink>
      </div>
      <div className="pp-ranking"><select aria-label="Top percentage of ranked projects" value={top} onChange={(e) => setTop(Number(e.target.value))}>
        {TOP_PERCENT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select><span>of <b>{filtered.length}</b> projects</span></div>
      {ranked.length ? <ProjectPrioritizationTable tab={tab} columns={columns} projects={ranked}
        selectedId={selected?.id || ""} onSelect={setSelectedId} onEdit={onEdit} onEngagement={onEngagement} onEvaluation={onEvaluation} /> :
        <div className="pp-empty"><h3>No matching projects</h3><p>Adjust the portfolio filters to see projects.</p>
          <button className="pp-secondary" onClick={() => { setTypes([]); setDistricts([]); setStatuses([]); }}>Clear filters</button></div>}
    </div>
    <ProjectPrioritizationMap projects={ranked} selectedId={selected?.id || ""} onSelect={setSelectedId}/>
  </section>;
}
