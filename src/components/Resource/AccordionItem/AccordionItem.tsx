import { FC, useState } from "react";
import ArrowUp from "../../../icons/ArrowUp";
import ArrowDown from "../../../icons/ArrowDown";

interface AccordionItemProps {
  index: number;
  category: string;
  items: string[];
  selectedItems: string[];
}

const AccordionItem: FC<AccordionItemProps> = ({
  index,
  category,
  items,
  selectedItems,
}) => {
  const [isContentVisible, setContentVisible] = useState(false);

  return (
    <div
      style={{
        borderTop: index === 0 ? "2px solid #263C8C" : "",
        borderBottom: "2px solid #263C8C",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <span>{category}</span>

        <div onClick={(e) => setContentVisible(!isContentVisible)}>
          {isContentVisible ? <ArrowUp /> : <ArrowDown />}
        </div>
      </div>
      {isContentVisible && (
        <div>
          {items.map((item, index) => (
            <div key={item + index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
