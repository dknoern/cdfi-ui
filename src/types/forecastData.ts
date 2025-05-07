import { Company } from './company';
import { Equation } from './equation';
import { FormatChartConfig, GraphType, GraphMeta } from './graphs';

export type GraphDataValueItem = {
  amount: number;
  value: string;
};

export interface GraphData {
  columnHeaders: {
    label: string;
    values: {
      value: string;
    }[];
  };
  companyId: Company['id'] | null;
  datas: {
    label: string;
    equationId?: Equation['id'];
    values: (GraphDataValueItem | undefined)[];
    companyValues?: {
      values: (GraphDataValueItem | undefined)[];
      companyId: Company['id'];
    }[];
  }[];
  date: string;
  decimalPlaces: number;
  graphId: GraphMeta['id'];
  notes: string;
  title: string;
  type: GraphType;
  formatChart: FormatChartConfig;
}
