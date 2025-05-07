import { useState, useEffect } from 'react';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools/APITools';
import { uiStore } from 'store';
import { reportingsManager } from 'scenes/Manage/tools';

const prepareIncomingData = (data) =>
  data.map((page) => ({
    ...page,
    page: page.page.map((row) => ({
      row: row.row.map((cell) => ({
        ...cell,
        x: cell.column,
        y: cell.row,
        z: cell.pageNum,
        cellKey: `x${cell.column}y${cell.row}z${cell.pageNum}`,
      })),
    })),
  }));

export const usePCReporting = ({ companyId, year, quarter }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!companyId || !year || !quarter) {
      return;
    }

    uiStore.addLoading('LOAD_REPORTING');

    setTimeout(() => {
      setIsLoading(true);
      setData(null);
      reportingsManager
        .loadData({ companyId, year, quarter })
        .then(prepareIncomingData)
        .then(setData)
        .catch(showAPIError(uiText('mapper', 'reportingLoadError')))
        .finally(() => {
          setIsLoading(false);
          uiStore.endLoading('LOAD_REPORTING');
        });
    }, 0);
  }, [companyId, year, quarter]);

  return [isLoading, data, !isLoading && data === null];
};
