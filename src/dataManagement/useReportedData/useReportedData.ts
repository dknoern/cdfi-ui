import { useState, useEffect, useCallback } from 'react';
import { DataHookResult } from 'types';
import { ColumnProps } from 'antd/lib/table';
import { notifyUser } from 'tools';
import { DataItem } from 'types/reportedData';
import { uiText } from 'constants/uiText';
import { getReportedData } from '../operations/reportedData';
import { parseColumns, convertValues } from './tools';

interface UseReportDataResult extends DataHookResult {
  data: DataItem[] | null;
  dataColumns: ColumnProps<DataItem>[];
  reload: () => void;
}

export const useReportedData = (
  companyId: number | null,
  config = { convertEmpty: true, loadEmpty: false },
): UseReportDataResult => {
  const [data, setData] = useState<UseReportDataResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [dataColumns, setDataColumns] = useState<ColumnProps<DataItem>[]>([]);

  const reload = useCallback(() => {
    if (!companyId) return;

    const { loadEmpty } = config;

    setError(false);
    setLoading(true);
    setData(null);

    getReportedData(companyId, loadEmpty)
      .then((res) => {
        setDataColumns(parseColumns(res.columns, config));
        setData(
          convertValues(
            res.categories.reduce(
              (prev, curr) => [...prev, ...curr.datas],
              [] as DataItem[],
            ),
          ),
        );
      })
      .catch(() => {
        notifyUser.error(uiText('reportedData', 'loadError'));
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId, config]);

  useEffect(reload, [companyId]);

  return {
    data,
    isLoading,
    hasError,
    dataColumns,
    reload,
  };
};
