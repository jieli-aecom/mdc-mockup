import React, { useState } from "react";
import FilterIcon from "../../icons/FilterIcon";

import "./FilterItem.css";
import { DEEP_BLUE, WHITE } from "../../consts/colors";

interface FilterItemProps {
  label: string;
  items: string[];
  selectedItems?: Set<string>;
  handleUpdate: ((item: string) => void)
}

const FilterItem: React.FC<FilterItemProps> = ({
  label,
  items,
  selectedItems,
  handleUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItemsAuto, setSelectedItemsAuto] = useState<Set<string>>(new Set());

  const handleToggleItemAuto = (item: string) => {
    if (selectedItemsAuto.has(item)) {
      selectedItemsAuto.delete(item);
    } else {
      selectedItemsAuto.add(item);
    }
    setSelectedItemsAuto(new Set(selectedItemsAuto));
  }

  return (
    <div>
      <div
        className={`filter-item-container${open ? " filter-item-active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <FilterIcon strokeColor={open ? WHITE : DEEP_BLUE} />
        <div>{label}</div>
      </div>
      {open && (
        <div className="filter-dropdown-container">
          {items.map((item, index) => {
            const selected = selectedItems ? selectedItems.has(item) : selectedItemsAuto.has(item);
            const onClick = () => {
              handleUpdate(item);
              handleToggleItemAuto(item);
            }
            return (
            <div
              key={`filter-dropdown-item-${label}-${index}`}
              className="filter-dropdown-item"
            >
              <div
                className={`filter-dropdown-circle${
                  selected ? " filter-dropdown-circle-active" : ""
                }`}
                onClick={onClick}
              ></div>
              {item}
            </div>
          )})}
        </div>
      )}
    </div>
  );
};

export default FilterItem;
