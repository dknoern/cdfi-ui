import { Metric } from 'types';
import { Equation, MetricTableDataItem } from '../types';

const accountCodeSearchRE = /([\w]+#)/gimu;
export const extractAccountCodes = (equation: string): string[] => {
  const matches = equation.match(accountCodeSearchRE);
  if (matches) {
    return matches.map((code) => code.slice(0, -1));
  }
  return [];
};

export const metricsUsedInEquations = (
  metrics: MetricTableDataItem[],
  equations: Equation[],
): MetricTableDataItem[] => {
  // make map of code=>metric
  const metricMap = new Map<Metric['accountCode'], MetricTableDataItem>(
    metrics.map((metric) => [metric.accountCode, metric]),
  );
  // metric ID also can be used as code (if got from backend)
  metrics.forEach((metric) => {
    metricMap.set(String(metric.id), metric); // also rewrites if code===id
  });

  // extract all used codes
  const usedMetricCodes = new Set<Metric['accountCode']>();
  equations.forEach((equation) => {
    extractAccountCodes(equation.formula).forEach((code) => {
      usedMetricCodes.add(code);
    });
  });

  const usedMetricIds = new Set<Metric['id']>();
  Array.from(usedMetricCodes).forEach((code) => {
    const metric = metricMap.get(code);
    if (metric) {
      usedMetricIds.add(metric.id);
    }
  });

  return metrics.filter((metric) => usedMetricIds.has(metric.id));
};

export const activateDispatchData = (
  indexOnCreate: number,
  isEdit: boolean,
): { step: number; type: 'available' } => {
  return {
    step: isEdit ? indexOnCreate - 1 : indexOnCreate,
    type: 'available',
  };
};

export * from './useMetricDeps';
export * from './formatEquations';
