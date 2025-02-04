import { FC } from "react";
import "./ProgramDevelopmentAggTable.css";

export type ProgramDevelopmentAggDataRow = {
  Name: string;
  Field1: number;
  Field2?: number;
};

export type ProgramDevelopmentAggTableFieldConfig = {
  label: string;
  width: string;
};

export type ProgramDevelopmentAggTableFieldConfigs = Partial<
  Record<string, ProgramDevelopmentAggTableFieldConfig>
>;

export interface ProgramDevelopmentAggTableProps {
  data: ProgramDevelopmentAggDataRow[];
  configs?: ProgramDevelopmentAggTableFieldConfigs;
}

const ProgramDevelopmentAggTable: FC<ProgramDevelopmentAggTableProps> = ({
  data,
  configs = {},
}) => {
  return (
    <table className="program-development-type-agg-table">
      <thead>
        <tr>
          <td
            width={configs.Name?.width || "50%"}
            className="program-development-type-agg-table-leftalign"
          ></td>
          <td width={configs.Field1?.width || "25%"}>
            {configs?.Field1?.label || ""}
          </td>
          {configs.Field2 !== undefined && (
            <td width={configs?.Field2?.width || "25%"}>
              {configs?.Field2?.label || ""}
            </td>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row: ProgramDevelopmentAggDataRow) => (
          <tr key={row.Name}>
            <td
              width={configs.Name?.width || "50%"}
              className="program-development-type-agg-table-leftalign program-development-type-agg-table-bold"
            >
              {row.Name}
            </td>
            <td width={configs.Field1?.width || "25%"}>
              {Math.round(row.Field1)}
            </td>
            {row.Field2 !== undefined && (
              <td width={configs.Field2?.width || "25%"}>
                {Math.round(row.Field2)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProgramDevelopmentAggTable;
