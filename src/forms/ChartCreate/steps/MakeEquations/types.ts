import { Equation } from 'forms/ChartCreate/types';

export type CursorPosition = number;

export enum FunctionTypes {
  Sum = 'Sum',
  Count = 'Count',
  Product = 'Product',
  Average = 'Average',
  Median = 'Median',
  Min = 'Min',
  Max = 'Max',
}

export type EquationEditableParts = Pick<
  Equation,
  'name' | 'formula' | 'format' | 'decimals'
>;

export interface EquationUpdater {
  (itemData: EquationEditableParts & { id?: Equation['id'] }): void;
}

type TooltipText = {
  usage: string;
  description: string;
};

export type FunctionTooltipsText = {
  [key in keyof typeof FunctionTypes]: TooltipText;
};
