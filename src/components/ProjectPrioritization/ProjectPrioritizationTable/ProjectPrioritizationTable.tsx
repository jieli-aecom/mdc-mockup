import React, { useEffect, useRef, useState } from "react";
import { DemoProject } from "../../../mockData/showcase";
import { ProjectColumn, SummaryTab } from "../ProjectPrioritizationContent/table-configs";
import "./ProjectPrioritizationTable.css";

interface Props {
  tab: SummaryTab;
  columns: ProjectColumn[];
  projects: DemoProject[];
  selectedId: string;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onEngagement: (id: string) => void;
  onEvaluation: (id: string) => void;
}

export default function ProjectPrioritizationTable({ tab, columns, projects, selectedId, onSelect, onEdit, onEngagement, onEvaluation }: Props) {
  const [sort, setSort] = useState({ label: "Composite", ascending: false });
  const selectedRow = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    selectedRow.current?.scrollIntoView?.({block: "nearest", inline: "nearest"});
  }, [selectedId]);
  useEffect(() => { setSort({ label: tab === "Summary" ? "Composite" : tab + " score", ascending: false }); }, [tab]);
  const headerColumns: ProjectColumn[] = [{ label: "Project", value: (p) => p.name }, ...columns];
  const sortedColumn = headerColumns.find((column) => column.label === sort.label);
  const sorted = sortedColumn ? [...projects].sort((a, b) => {
    const first = sortedColumn.value(a);
    const second = sortedColumn.value(b);
    const difference = typeof first === "number" && typeof second === "number" ? first - second : String(first).localeCompare(String(second));
    return sort.ascending ? difference : -difference;
  }) : projects;

  return (
    <div className="pp-table-scroll">
      <table className={`pp-table pp-table-${tab.toLowerCase()}`}>
        <thead><tr>{headerColumns.map((column) => (
          <th scope="col" key={column.label} aria-sort={sort.label !== column.label ? undefined : sort.ascending ? "ascending" : "descending"}>
            <button type="button" onClick={() => setSort({ label: column.label, ascending: sort.label === column.label ? !sort.ascending : typeof column.value(projects[0]) !== "number" })}>
              {column.label}<span aria-hidden="true">{column.label === sort.label ? sort.ascending ? "↑" : "↓" : ""}</span>
            </button>
          </th>
        ))}</tr></thead>
        <tbody>{sorted.map((p) => (
          <tr key={p.id} ref={selectedId === p.id ? selectedRow : undefined} className={selectedId === p.id ? "pp-row-selected" : ""}>
            <th scope="row"><button type="button" className="pp-project-link" onClick={() => onSelect(p.id)} aria-pressed={selectedId === p.id}>{p.name}</button>
              <small>{p.type}{p.districts.length > 0 && ` · District${p.districts.length === 1 ? "" : "s"} ${p.districts.join(", ")}`}</small>
              {selectedId === p.id && <button type="button" className="pp-text-button pp-row-evaluation"
                onClick={() => onEvaluation(p.id)}>View evaluation →</button>}</th>
            {columns.map((col) => <td key={col.label} className={col.label === "Composite" || col.label.endsWith(" score") ? "pp-score-cell" : undefined}>
              {col.label === "Status" ? <><span className={`pp-status pp-status-${p.reviewStatus.toLowerCase()}`}>{p.reviewStatus}</span>
                {p.reviewStatus !== "Approved" && <button type="button" className="pp-text-button pp-edit" aria-label={`Edit ${p.name}`} onClick={() => onEdit(p.id)}>Edit</button>}</>
                : col.label === "Comments" ? <button type="button" className="pp-comment-link" aria-label={`View ${p.comments.length} comments on ${p.name}`} onClick={() => onEngagement(p.id)}>{p.comments.length}</button>
                : col.value(p)}
            </td>)}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
