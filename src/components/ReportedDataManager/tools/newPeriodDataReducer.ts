import { PeriodData, PeriodDataAction } from '../types';

export const newPeriodDataReducer = (
  state: PeriodData,
  action?: PeriodDataAction,
): PeriodData => {
  if (!action) return new Map();

  const data = new Map(state);
  if (action.value === '') {
    data.delete(action.metricId);
  } else {
    data.set(action.metricId, action.value);
  }

  return data;
};
