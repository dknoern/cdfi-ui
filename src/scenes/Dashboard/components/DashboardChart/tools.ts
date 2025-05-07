import { DashboardChartCategory } from 'types/dashboard';
import { FormatChartConfig, GraphType, GraphMeta } from 'types/graphs';
import { UserConfig } from 'types/chart';

const availableSmallChartTypes = [
  GraphType.LINE,
  GraphType.COLUMN,
  GraphType.COLUMN_STACKED,
  GraphType.PIE,
];

export const filterCharts = (
  allGraphs: GraphMeta[],
  allDashboardGraphs: GraphMeta['id'][],
): GraphMeta[] =>
  allGraphs.filter(
    (graph) =>
      availableSmallChartTypes.includes(graph.graphType) &&
      !allDashboardGraphs.includes(graph.id),
  );

export const extractAllDashboardChartsIds = (
  chartCategories: DashboardChartCategory[],
): GraphMeta['id'][] =>
  chartCategories.reduce(
    (total, category) => [...total, ...category.graphs],
    [] as GraphMeta['id'][],
  );

export const prepareUserConfig = (
  type: GraphType | null,
  { boundMax, boundMin }: FormatChartConfig,
): UserConfig => {
  let groupMode: 'grouped' | 'stacked' | undefined;

  switch (type) {
    case GraphType.COLUMN:
      groupMode = 'grouped';
      break;
    case GraphType.COLUMN_STACKED:
      groupMode = 'stacked';
      break;
    default:
      break;
  }

  return {
    ...(groupMode && { groupMode }),
    ...(type === GraphType.LINE
      ? {
          yScale: {
            type: 'linear',
            min: boundMin ? Number(boundMin) : 'auto',
            max: boundMax ? Number(boundMax) : 'auto',
            reverse: false,
          },
        }
      : {
          minValue: boundMin ? Number(boundMin) : 'auto',
          maxValue: boundMax ? Number(boundMax) : 'auto',
        }),
  };
};
