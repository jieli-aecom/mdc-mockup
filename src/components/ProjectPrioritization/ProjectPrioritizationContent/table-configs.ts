import type { DemoProject } from "../../../mockData/showcase";

export const summaryTabs = ["Summary", "Location", "Benefit", "Funding"] as const;
export type SummaryTab = typeof summaryTabs[number];

export interface ProjectColumn {
  label: string;
  value: (project: DemoProject) => number | string;
}

export function columnsFor(tab: SummaryTab, projects: DemoProject[]): ProjectColumn[] {
  if (tab === "Location" || tab === "Benefit") {
    const location = tab === "Location";
    const breakdown = location ? "locationBreakdown" : "benefitBreakdown";
    const labels = projects[0] ? Object.keys(projects[0][breakdown]) : [];
    return [
      { label: tab + " score", value: (p) => location ? p.location : p.benefit },
      ...labels.map((label) => ({ label, value: (p: DemoProject) => p[breakdown][label] ?? "—" })),
    ];
  }
  if (tab === "Funding") return [{ label: "Potential funding opportunities", value: (p) => p.funding.join(" • ") || "No match" }];
  return [
    { label: "Status", value: (p) => p.reviewStatus },
    { label: "Composite", value: (p) => p.composite },
    { label: "Location", value: (p) => p.location },
    { label: "Benefit", value: (p) => p.benefit },
    { label: "Comments", value: (p) => p.comments.length },
  ];
}
