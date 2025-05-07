import { MetricTypeConfig, MetricNumericFormat } from './metric';

export interface Equation {
  id: number;
  name: string;
  formula: string;
  format: MetricNumericFormat;
  decimals: MetricTypeConfig['decimals'];
  definition?: string;
  equationType?: string;
  decimalPlaces?: number;
  smallValuePreference?: boolean;
  unitType?: string;
}

export type EquationSaveData = Omit<Equation, 'id'> & {
  id?: Equation['id'];
};
