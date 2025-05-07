import React from 'react';
import { transformDataToLineDataWithMax } from 'scenes/AerisExplorer/components/ReportsCharts/chartsHelpers';
import { ReportsLineChart } from 'scenes/AerisExplorer/components/ReportsCharts/ReportsLineChart/ReportsLineChart';
import { PeerAnalysisReport } from 'types/peerGroups';
import styles from './ReportsPageChart.module.scss';
import { Serie } from '@nivo/line';

type ReportsPageChartProps = {
  data: PeerAnalysisReport;
};

export const ReportsPageChart = ({ data }: ReportsPageChartProps) => {
  const formatType = data?.chart[0]?.equation?.unitType || '';
  const decimalPlaces = data?.chart[0]?.equation?.decimalPlaces || 0;
  const { max, lineData } = transformDataToLineDataWithMax(
    data?.chart,
    data?.periods,
  );

  const xTicks = data?.periods;

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <div className={styles.line}>
          <ReportsLineChart
            xTicks={xTicks}
            lineData={lineData as Serie[]}
            formatType={formatType}
            decimalPlaces={decimalPlaces}
            maxYTick={max * 1.1}
          />
        </div>
      </div>
    </div>
  );
};
