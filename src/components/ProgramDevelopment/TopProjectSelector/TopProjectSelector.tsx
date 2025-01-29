import { FC } from "react";
import "./TopProjectSelector.css";
import { SelectorOptionProps, TopPercent } from "../consts/top-percents";

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
  );
};

export default TopProjectSelector;
