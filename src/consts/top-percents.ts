export type TopPercent = 5 | 15 | 25 | 50 | 75 | 85 | 95 | 100;

export const TOP_PERCENT_LABELS: Record<TopPercent, string> = {
  5: "Top 5%",
  15: "Top 15%",
  25: "Top 25%",
  50: "Top 50%",
  75: "Top 75%",
  85: "Top 85%",
  95: "Top 95%",
  100: "Top 100%",
};

export interface SelectorOptionProps {
  value: number;
  label: string;
}

export const TOP_PERCENT_OPTIONS: SelectorOptionProps[] = [
  { value: 5, label: TOP_PERCENT_LABELS[5] },
  { value: 15, label: TOP_PERCENT_LABELS[15] },
  { value: 25, label: TOP_PERCENT_LABELS[25] },
  { value: 50, label: TOP_PERCENT_LABELS[50] },
  { value: 75, label: TOP_PERCENT_LABELS[75] },
  { value: 85, label: TOP_PERCENT_LABELS[85] },
  { value: 95, label: TOP_PERCENT_LABELS[95] },
  { value: 100, label: TOP_PERCENT_LABELS[100] },
];
