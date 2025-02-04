import { FC } from "react";
import "./ProgramDevelopmentAggTable.css";

export type ProgramDevelopmentAggDataRow = {
  Name: string;
  Field1: number;
  Field2: number;
};

export type ProgramDevelopmentAggTableFieldLabels = Partial<Record<string, string>>;

export interface ProgramDevelopmentAggTableProps {
  data: ProgramDevelopmentAggDataRow[];
  fieldLabels?: ProgramDevelopmentAggTableFieldLabels;
}

const ProgramDevelopmentAggTable: FC<ProgramDevelopmentAggTableProps> = ({
  data,
  fieldLabels = {},
}) => {
  return (
    <table className="program-development-type-agg-table">
      <thead>
        <tr>
          <td
            width="50%"
            className="program-development-type-agg-table-leftalign"
          ></td>
          <td width="25%">{fieldLabels?.Field1}</td>
          <td width="25%">{fieldLabels?.Field2}</td>
        </tr>
      </thead>
      <tbody>
        {data.map((row: ProgramDevelopmentAggDataRow) => (
          <tr key={row.Name}>
            <td
              width="50%"
              className="program-development-type-agg-table-leftalign program-development-type-agg-table-bold"
            >
              {row.Name}
            </td>
            <td width="25%">{Math.round(row.Field1)}</td>
            <td width="25%">{Math.round(row.Field2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramDevelopmentAggTable;
