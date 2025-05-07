import React, { useState, useEffect } from 'react';
import { ReportsBarChart } from 'scenes/AerisExplorer/components/ReportsCharts/ReportsBarChart/ReportsBarChart';
import { ReportsLineChart } from 'scenes/AerisExplorer/components/ReportsCharts/ReportsLineChart/ReportsLineChart';
import { PeerAnalysisReport, PeerAnalysisReportChart } from 'types/peerGroups';
import styles from './ComparisonChartsLayout.module.scss';
import {
  transformDataToLineDataWithMax,
  transformDataToBarDataWithMax,
} from 'scenes/AerisExplorer/components/ReportsCharts/chartsHelpers';
import { Serie } from '@nivo/line';
import { ComparisonChartTooltip } from './ComparisonChartTooltip';

type ComparisonChartsLayoutProps = {
  data: PeerAnalysisReport;
  isSingleCdfi: boolean;
  isMultipleCdfis: boolean;
};

export const ComparisonChartsLayout = ({
  data,
  isSingleCdfi,
  isMultipleCdfis,
}: ComparisonChartsLayoutProps) => {
  const [lineData, setLineData] = useState<Serie[]>([]);

  const formatType = data?.chart[0]?.equation?.unitType || '';
  const decimalPlaces = data?.chart[0]?.equation?.decimalPlaces || 0;
  const { max: baseLineMax, lineData: baseLineData } =
    transformDataToLineDataWithMax(data?.chart, data?.periods);

  const { max: compareLineMax, lineData: compareLineData } =
    transformDataToLineDataWithMax(
      data?.compareChart as PeerAnalysisReportChart[],
      data?.periods,
    );

  const {
    max: barMax,
    barData,
    keys,
  } = transformDataToBarDataWithMax(
    data?.compareChart as PeerAnalysisReportChart[],
    data?.periods,
  );

  const max = isMultipleCdfis
    ? Math.max(baseLineMax, barMax)
    : Math.max(baseLineMax, compareLineMax);

  const xTicks = data?.periods;

  useEffect(() => {
    // work around for legend display names - perhaps a change in the data would save this calculation
    const renamedBaseLineData = baseLineData.map((item) => {
      if (item.id === 'Top Quartile') {
        return { ...item, id: 'Peer Group Top Quartile' };
      }
      if (item.id === 'Median') {
        return { ...item, id: 'Peer Group Median' };
      }
      if (item.id === 'Bottom Quartile') {
        return { ...item, id: 'Peer Group Bottom Quartile' };
      }
      return item;
    });

    // compare to multiple cdfis, simply set line data to base as cdfis are represented in barData - dual axis bar and line visualization
    if (isMultipleCdfis) {
      setLineData(renamedBaseLineData as Serie[]);
      return;
    }

    // in the case of a single cdfi, merge line data - line chart visualization
    if (isSingleCdfi) {
      setLineData([...renamedBaseLineData, ...compareLineData] as Serie[]);
      return;
    }
    // TODO: should backend return just the median quartile when comparing to one portfolio segment?
    const medianQuartile = compareLineData?.find(
      (item) => item.id === 'Median',
    );

    // in the case of a portfolio segment vs either a portfolio segment or peergroup, merge line data with 'Median Quartile' data - line chart visualization
    if (medianQuartile) {
      setLineData([
        ...renamedBaseLineData,
        {
          ...medianQuartile,
          id: 'Median of Portfolio Segment',
        },
      ] as Serie[]);
    } else {
      setLineData([...renamedBaseLineData] as Serie[]);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.charts}>
        <div className={styles.line}>
          <ReportsLineChart
            xTicks={!isMultipleCdfis ? xTicks : []}
            lineData={lineData}
            formatType={formatType}
            decimalPlaces={decimalPlaces}
            maxYTick={max * 1.1}
          />
        </div>
        {isMultipleCdfis && (
          <div className={styles.bar}>
            <ReportsBarChart
              barData={barData}
              keys={keys}
              xTicks={isMultipleCdfis ? xTicks : []}
              formatType={formatType}
              decimalPlaces={decimalPlaces}
              maxYTick={max * 1.1}
              tooltip={(value) => (
                <ComparisonChartTooltip
                  seriesIndex={value.indexValue}
                  rowIndex={value.id}
                  formatType={formatType}
                  data={data}
                />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};
