import { FC } from "react";
import "./Tabs.css";

interface TabsProps {
  active: string;
  tabs: string[];
  onChange: (selected: string) => void;
}

const Tabs: FC<TabsProps> = ({ active, tabs, onChange }) => {
  return (
    <div className="tab-wrapper">
      {tabs.map((tab, index) => (
        <div
          className={`tab-item${tab === active ? " tab-item-active" : ""}`}
          key={`${tab}-${index}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
