import { FC } from "react";
import "./TopProjectSelector.css";

interface SelectorOptionProps {
  value: string;
  label: string;
}

interface TopProjectSelectorProps {
  value: string;
  options: SelectorOptionProps[];
  onChange: (newValue: string) => void;
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
      onChange={(e) => onChange(e.target.value)}
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
