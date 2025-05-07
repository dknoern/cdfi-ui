import { MetricSharePeriod, Metric, Tag, MetricNumericFormat } from 'types';
import { GraphMeta, GraphTemplate } from 'types/graphs';
import { Equation as EquationBase } from 'types/equation';
import { SortableItem } from 'types/misc';

// Graph Period
export type PeriodConfig = {
  frequency: MetricSharePeriod;
  beginning: string; // full date like 12/31/2015
  ending: string; // full date like 12/31/2015
};

export type EquationFormatNames = {
  [key in EquationBase['format']]: string;
};

// TODO update EquationFormat
export type Equation = Omit<EquationBase, 'format'> &
  SortableItem & {
    format: MetricNumericFormat;
    isNew?: boolean;
  };

// Axes Titles
export interface Title {
  name: string;
  before: number;
}

export type StoreData = GraphTemplate & { id?: GraphMeta['id'] };

// Shared utility types
export interface PreviewTableRow {
  id?: Equation['id'];
  label: Equation['name'];
  children?: PreviewTableRow[];
  [key: string]: string | number | PreviewTableRow[] | undefined;
}

export type MetricTableDataItem = Omit<Metric, 'tags'> & { tags: Tag[] };
