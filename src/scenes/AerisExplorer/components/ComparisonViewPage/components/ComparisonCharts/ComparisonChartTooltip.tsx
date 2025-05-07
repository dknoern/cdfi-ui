import React from 'react';
import { getFormat } from 'scenes/AerisExplorer/components/ReportsCharts/chartsHelpers';
import { PeerAnalysisReport } from '../../../../../../types/peerGroups';
import styles from './ComparisonChartsLayout.module.scss';

type ComparisonChartTooltipProps = {
  seriesIndex?: string | number;
  rowIndex?: string | number;
  data: PeerAnalysisReport;
  formatType?: string;
};

export const ComparisonChartTooltip = ({
  seriesIndex,
  rowIndex,
  data,
  formatType = 'NUMBER',
}: ComparisonChartTooltipProps) => {
  const getDataValues = (): string[] => {
    const output: string[] = [];
    const f = data?.compareChart?.forEach((row) => {
      if (rowIndex !== row.rowName || seriesIndex === undefined) {
        return;
      }
      output.push(
        `${row.rowName}: ${getFormat(
          row.columns[seriesIndex],
          formatType,
          row.equation?.decimalPlaces ?? 0,
        )}`,
      );
    });
    return output;
  };

  const getCompareValues = (): string[] => {
    const output: string[] = [];
    const f = data?.chart?.forEach((row) => {
      if (seriesIndex === undefined) {
        return;
      }
      output.push(
        `${row.rowName}: ${getFormat(
          row.columns[seriesIndex],
          formatType,
          row.equation?.decimalPlaces ?? 0,
        )}`,
      );
    });
    return output;
  };

  const compareValues = getCompareValues();
  const dataValues = getDataValues();

  return (
    <div className={styles.smallPadding}>
      <strong>{dataValues[0]}</strong>
      <ul>
        {compareValues.map((v) => {
          return <li key={v}>{v}</li>;
        })}
      </ul>
    </div>
  );
};
