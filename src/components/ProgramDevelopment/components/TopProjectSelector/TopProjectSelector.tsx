import { FC } from "react";
import "./TopProjectSelector.css";
import {
  SelectorOptionProps,
  TopPercent,
} from "../../../../consts/top-percents";

interface TopProjectSelectorProps {
  value: TopPercent;
  options: SelectorOptionProps[];
  totalProjects?: number;
  onChange: (newValue: TopPercent) => void;
}

const TopProjectSelector: FC<TopProjectSelectorProps> = ({
  value,
  options,
  totalProjects = 200,
  onChange,
}) => {
  return (
    <div className="top-projects-selector">
      <select
        className="top-project-selector-container"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) as TopPercent)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span style={{ fontWeight: 600 }}>
        of{" "}
        <span style={{ color: "#4D9FD7", textDecoration: "underline" }}>
          {totalProjects}
        </span>{" "}
        projects
      </span>
    </div>
  );
};

export default TopProjectSelector;
