import { useReducer, useEffect, useCallback } from 'react';
import { DataHook, Investment } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import {
  initialState,
  dataFetchReducer,
  ReducerType,
} from './dataFetchReducer';
import { dataMan } from './managers';

type DataType = Investment;

const mgr = dataMan.managers.investments;

export const useInvestment: DataHook<Investment['id'] | null, DataType> = (
  id?: Investment['id'] | null,
) => {
  const [data, dispatch] = useReducer<ReducerType<DataType>>(
    dataFetchReducer,
    initialState,
  );

  const reload = useCallback(() => {
    if (!id) return;

    mgr
      .getById(id)
      .then(dispatch)
      .catch(() => {
        notifyUser.error(uiText('investments', 'oneLoadError'));
        dispatch('error');
      });
  }, [id]);

  useEffect(reload, [id]);

  return { ...data, reload };
};
