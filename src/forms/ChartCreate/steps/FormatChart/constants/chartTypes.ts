import { GraphType } from 'types/graphs';
import barChartStacked from '../icons/barChartStacked.svg';
import barChartGrouped from '../icons/barChartGrouped.svg';
import lineChart from '../icons/lineChart.svg';
import pieChart from '../icons/pieChart.svg';
import tableChart from '../icons/tableChart.svg';

export const chartTypes = [
  {
    type: GraphType.TABLE,
    label: 'Table',
    description: 'Table',
    icon: tableChart,
  },
  {
    type: GraphType.COLUMN,
    label: 'Bar',
    description: 'Grouped',
    icon: barChartGrouped,
  },
  {
    type: GraphType.COLUMN_STACKED,
    label: 'Bar',
    description: 'Stacked',
    icon: barChartStacked,
  },
  {
    type: GraphType.LINE,
    label: 'Line',
    description: 'Line Chart',
    icon: lineChart,
  },
  {
    type: GraphType.PIE,
    label: 'Pie',
    description: 'Showing last period',
    icon: pieChart,
  },
];
