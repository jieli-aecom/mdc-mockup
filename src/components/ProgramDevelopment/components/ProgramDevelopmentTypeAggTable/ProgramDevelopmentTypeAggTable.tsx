import { FC } from "react";
import "./ProgramDevelopmentTypeAggTable.css";
import { ProjectType } from "../../../../types/Project";

export type ProgramDevelopmentTypeAggDataRow = {
  Name: ProjectType;
  TotalCount: number;
  TotalCost: number;
  AverageScore: number;
};

export interface ProgramDevelopmentTypeAggTableProps {
  data: ProgramDevelopmentTypeAggDataRow[];
}

const ProgramDevelopmentTypeAggTable: FC<
  ProgramDevelopmentTypeAggTableProps
> = ({ data }) => {
  return (
    <table className="program-development-type-agg-table">
      <thead>
        <tr>
          <td width="40%" className="program-development-type-agg-table-leftalign"></td>
          <td width="20%">Total Count</td>
          <td width="20%">Total Cost</td>
          <td width="20%">Average Score</td>
        </tr>
      </thead>
      <tbody>
        {data.map((row: ProgramDevelopmentTypeAggDataRow) => (
          <tr key={row.Name}>
            <td width="40%" className="program-development-type-agg-table-leftalign program-development-type-agg-table-bold">{row.Name}</td>
            <td width="20%">{Math.round(row.TotalCount)}</td>
            <td width="20%">{row.TotalCost.toLocaleString()}</td>
            <td width="20%">{Math.round(row.AverageScore)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramDevelopmentTypeAggTable;
