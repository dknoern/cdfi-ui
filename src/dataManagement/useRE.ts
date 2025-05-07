import { useEffect, useReducer, useCallback } from 'react';
import { DataHook, ReportingEntity } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import {
  initialState,
  dataFetchReducer,
  ReducerType,
} from './dataFetchReducer';
import { dataMan } from './managers';

type DataType = ReportingEntity;

const mgr = dataMan.managers.reportingEntity;

export const useRE: DataHook<ReportingEntity['id'], DataType> = (id) => {
  const [data, dispatch] = useReducer<ReducerType<DataType>>(
    dataFetchReducer,
    initialState,
  );

  const reload = useCallback(() => {
    if (!id) return;

    dispatch('reset');

    mgr
      .getById(id)
      .then(dispatch)
      .catch(() => {
        notifyUser.error(uiText('reportingEntities', 'oneLoadError'));
        dispatch('error');
      });
  }, [id]);

  useEffect(reload, [id]);

  return { ...data, reload };
};
