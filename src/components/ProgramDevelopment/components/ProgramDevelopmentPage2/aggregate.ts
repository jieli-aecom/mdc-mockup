import { ALIGNMENT_BY_PROJECT_TYPE } from "../../../../consts/alignment-by-project-type";
import { CommissionDistrict } from "../../../../types/District";
import { PerformanceArea } from "../../../../types/PerformanceArea";
import { Project, ProjectType } from "../../../../types/Project";
import { ProgramDevelopmentAggDataRow } from "./ProgramDevelopmentAggTable/ProgramDevelopmentTypeAggTable";

export const aggregateByType = (projects: Project[]) => {
  const countByType: Partial<Record<ProjectType, number>> = {};
  const totalScoreByType: Partial<Record<ProjectType, number>> = {};
  const avgScoreByType: Partial<Record<ProjectType, number>> = {};

  for (const project of projects) {
    const type: ProjectType = project.Type;
    countByType[type] = (countByType[type] || 0) + 1;
    totalScoreByType[type] =
      (totalScoreByType[type] || 0) + project.CompositeScore;
  }

  for (const type in countByType) {
    const projectType = type as ProjectType;
    avgScoreByType[projectType] =
      totalScoreByType[projectType]! / countByType[projectType]!;
  }

  const result: ProgramDevelopmentAggDataRow[] = Object.keys(countByType).map(
    (type) => ({
      Name: type as string,
      Field1: countByType[type as ProjectType]!,
      Field2: avgScoreByType[type as ProjectType]!,
    })
  );

  return result;
};

export const aggregateByCommissionDistrict = (projects: Project[]) => {
  const countByDistrict: Partial<Record<CommissionDistrict, number>> = {};
  const totalScoreByDistrict: Partial<Record<CommissionDistrict, number>> = {};
  const avgScoreByDistrict: Partial<Record<CommissionDistrict, number>> = {};

  for (const project of projects) {
    const districts = project.CommissionDistricts;
    for (const district of districts) {
      countByDistrict[district] = (countByDistrict[district] || 0) + 1;
      totalScoreByDistrict[district] =
        (totalScoreByDistrict[district] || 0) + project.CompositeScore;
    }
  }

  for (const type in countByDistrict) {
    const projectType = type as CommissionDistrict;
    avgScoreByDistrict[projectType] =
      totalScoreByDistrict[projectType]! / countByDistrict[projectType]!;
  }

  const result: ProgramDevelopmentAggDataRow[] = Object.keys(
    countByDistrict
  ).map((district) => ({
    Name: "Commission District " + (district as string),
    Field1: countByDistrict[district as CommissionDistrict]!,
    Field2: avgScoreByDistrict[district as CommissionDistrict]!,
  }));

  return result;
};

export const aggregateByPolicyAlignment = (projects: Project[]) => {
  const alignments: Record<PerformanceArea, number> = {
    [PerformanceArea.Safe]: 0,
    [PerformanceArea.Clean]: 0,
    [PerformanceArea.Efficient]: 0,
    [PerformanceArea.Connected]: 0,
  };

  // TODO: Enhance this function
  for (const project of projects) {
    const type = project.Type;
    alignments[PerformanceArea.Safe] +=
      ALIGNMENT_BY_PROJECT_TYPE[type][PerformanceArea.Safe];

    alignments[PerformanceArea.Clean] +=
      ALIGNMENT_BY_PROJECT_TYPE[type][PerformanceArea.Clean];

    alignments[PerformanceArea.Efficient] +=
      ALIGNMENT_BY_PROJECT_TYPE[type][PerformanceArea.Efficient];

    alignments[PerformanceArea.Connected] +=
      ALIGNMENT_BY_PROJECT_TYPE[type][PerformanceArea.Connected];
  }

  const result: ProgramDevelopmentAggDataRow[] = Object.keys(alignments).map(
    (alignment) => ({
      Name: alignment as string,
      Field1: alignments[alignment as PerformanceArea]!,
    })
  );

  return result;
};
