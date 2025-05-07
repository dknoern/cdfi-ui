import { GraphMeta } from 'types/graphs';
import { formStore } from 'forms/PortfolioSetup/formStore';

export const filterSelectedCharts = (charts: GraphMeta[]): GraphMeta[] => {
  return charts.filter((chart) => formStore.selectedCharts.includes(chart.id));
};
