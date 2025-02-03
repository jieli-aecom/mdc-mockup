import { FC } from "react";
import "./TopProjectSelector.css";
import { SelectorOptionProps, TopPercent } from "../../../../consts/top-percents";

interface TopProjectSelectorProps {
  value: TopPercent;
  options: SelectorOptionProps[];
  onChange: (newValue: TopPercent) => void;
}

const TopProjectSelector: FC<TopProjectSelectorProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <div
      className="top-projects-selector"
      style={{ marginBottom: "25px", marginTop: "18px" }}
    >
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
          200
        </span>{" "}
        projects
      </span>
    </div>
  );
};

export default TopProjectSelector;
