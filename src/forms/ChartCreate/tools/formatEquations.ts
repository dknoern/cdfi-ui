import { ReportedDataEquationBase } from 'types/reportedDataV2';

export const formatLoadedEquations = (
  equations: ReportedDataEquationBase[],
  isEditForm: boolean,
): ReportedDataEquationBase[] => {
  return equations.map((item) => {
    return { ...item, new: !isEditForm };
  });
};
