export const generateFormId = (formName: string, stepIndex: number): string => {
  return `${formName}-step${stepIndex}`;
};
