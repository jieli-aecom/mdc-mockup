import { FC } from "react";

interface DataCardProps {
  id: string;
  title: string;
  description: string;
  source: string;
  lastUpdated: string;
}

const DataCard: FC<DataCardProps> = ({
  id,
  title,
  description,
  source,
  lastUpdated,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        border: "2px solid #e61754",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          padding: "25px",
          background: "white",

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: "24px",
            color: "#263C8C",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: "18px",
            color: "#4f4f4f",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          boxSizing: "border-box",
          width: "100%",
          height: "60px",
          padding: "8px 25px 8px 25px",
          background: "#ebebeb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>Source: </span>
          <span>{source}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>Last Updated: </span>
          <span>{lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
