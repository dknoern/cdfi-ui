import { Equation } from 'forms/ChartCreate/types';
import { formRuleMessages } from 'tools/formRules';
import { store as stepStore } from 'forms/ChartCreate/equationsStore';

// validate for unique equation name
export const validateEquationName = (
  value: string,
  equations: Equation[],
): Promise<void> => {
  if (
    value.trim().toLowerCase() ===
    stepStore.activeItem?.name.trim().toLowerCase()
  ) {
    return Promise.resolve();
  }

  return equations.find(
    (equation) =>
      equation.name.trim().toLowerCase() === value.trim().toLowerCase(),
  )
    ? Promise.reject(new Error(formRuleMessages(0, 'equation').unique))
    : Promise.resolve();
};

export const insertText = (
  text: string,
  insertTextPart: string,
  cursorPosition: number,
): string => {
  return (
    text.substring(0, cursorPosition) +
    insertTextPart +
    text.substring(cursorPosition)
  );
};
