import { Metric } from './metric';
import { Equation } from './equation';
import { SortableItem } from './misc';

export enum DataItemType {
  'Equation' = 'equation',
  'Metric' = 'metric',
}

export type SortableListItem = SortableItem & {
  id: Equation['id'] | Metric['id'];
  type: DataItemType;
  name: Equation['name'] | Metric['name'];
};

export type SwapFn = (item1: SortableListItem, item2: SortableListItem) => void;

// id may be undefined if equation is new
export type EquationInfo = Equation & { isNew?: boolean };

export type ExistingMetric = Pick<Metric, 'id'>;

export interface MetricOrEquationId {
  metricId?: Metric['id'];
  equationId?: Equation['id'];
}
