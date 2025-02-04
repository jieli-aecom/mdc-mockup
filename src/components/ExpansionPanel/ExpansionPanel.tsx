import { FC, useEffect, useMemo, useState } from "react";
import "./ExpansionPanel.css";
import MinusIcon from "../../icons/MinusIcon";
import PlusIcon from "../../icons/PlusIcon";

export interface ExpansionPanelProps {
  title: string;
  children?: React.ReactNode;
  defaultExpanded: boolean;
}

const ExpansionPanel : FC<ExpansionPanelProps> = ({ title, children, defaultExpanded }) => {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const [bodyOverflow, setBodyOverflow] = useState<string>('hidden');

  useEffect(() => {
    if (expanded) {
      setTimeout(() => {
        setBodyOverflow('auto');
      }, 400);
    } else {
      setBodyOverflow('hidden');
    }
  }, [expanded]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const icon = useMemo(() => {
    return expanded ? <MinusIcon /> : <PlusIcon />;
  }, [expanded]);
  const ariaLabel = expanded ? 'Collapse' : 'Expand';
  const bodyClass = expanded ? 'mdc-expansionpanel-body' : 'mdc-expansionpanel-body mdc-expansionpanel-body-collapsed';


  
  return <div className="mdc-expansionpanel">
    <div className='mdc-expansionpanel-header'>
      <div className='mdc-expansionpanel-header-title'>{title}</div>
      <button className='mdc-expansionpanel-header-toggle' onClick={handleToggle}
        aria-label={ariaLabel}
        aria-expanded={expanded}
        title={ariaLabel}
      >
        {icon}
      </button>
    </div>
    <div className={bodyClass} style={{ overflow: bodyOverflow }}>
      {children ?? null}
    </div>

  </div>;
}

export default ExpansionPanel;