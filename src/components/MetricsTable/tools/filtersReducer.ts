import { Reducer } from 'react';
import { FilterState, FilterReducerAction } from 'types/metricTableItem';

export const filtersReducer: Reducer<FilterState, FilterReducerAction> = (
  state,
  action,
) => {
  return { ...state, ...action };
};
