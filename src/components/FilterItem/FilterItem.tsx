import React, { useEffect, useState } from "react";
import FilterIcon from "../../icons/FilterIcon";

import "./FilterItem.css";

interface FilterItemProps {
  label: string;
  items: string[];
  handleUpdate: (p: number) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  label,
  items,
  handleUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, selectItem] = useState("");

  useEffect(() => {
    if (selectedItem.startsWith("Top ")) {
      const p = Number(selectedItem.slice(4, selectedItem.length - 1));
      handleUpdate(p);
    }
  }, [selectedItem, handleUpdate]);

  return (
    <div>
      <div
        className={`filter-item-container${open ? " filter-item-active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <FilterIcon strokeColor={open ? "#ffffff" : "#263d8c"} />
        <div>{label}</div>
      </div>
      {open && (
        <div className="filter-dropdown-container">
          {items.map((item, index) => (
            <div
              key={`filter-dropdown-item-${label}-${index}`}
              className="filter-dropdown-item"
            >
              <div
                className={`filter-dropdown-circle${
                  selectedItem === item ? " filter-dropdown-circle-active" : ""
                }`}
                onClick={() => selectItem(item)}
              ></div>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItem;
