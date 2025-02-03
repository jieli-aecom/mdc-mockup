import { FC } from "react";
import "./ProgramDevelopmentAggTable.css";

export type ProgramDevelopmentAggDataRow = {
  Name: string;
  TotalCount: number;
  AverageScore: number;
};

export interface ProgramDevelopmentAggTableProps {
  data: ProgramDevelopmentAggDataRow[];
}

const ProgramDevelopmentAggTable: FC<
  ProgramDevelopmentAggTableProps
> = ({ data }) => {
  return (
    <table className="program-development-type-agg-table">
      <thead>
        <tr>
          <td width="50%" className="program-development-type-agg-table-leftalign"></td>
          <td width="25%">Total Count</td>
          <td width="25%">Average Score</td>
        </tr>
      </thead>
      <tbody>
        {data.map((row: ProgramDevelopmentAggDataRow) => (
          <tr key={row.Name}>
            <td width="50%" className="program-development-type-agg-table-leftalign program-development-type-agg-table-bold">{row.Name}</td>
            <td width="25%">{Math.round(row.TotalCount)}</td>
            <td width="25%">{Math.round(row.AverageScore)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramDevelopmentAggTable;
