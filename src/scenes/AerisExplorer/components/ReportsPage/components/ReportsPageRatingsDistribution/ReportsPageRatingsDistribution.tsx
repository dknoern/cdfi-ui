import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { aerisExplorerPeerGroupStore } from 'store';
import { transformRatingsReportToChartData } from 'scenes/AerisExplorer/constants';
import { InnerPageTitle } from 'components/InnerPage/InnerPageTitle';
import { ReportsPieChart } from 'scenes/AerisExplorer/components/ReportsCharts/ReportsPieChart/ReportsPieChart';
import { ImpactDefinitionsModal } from './ImpactDefinitionsModal/ImpactDefinitionsModal';
import { PerformanceDefinitionsModal } from './PerfomanceDefinitionsModal/PerformanceDefinitionsModal';
import { PieDatum } from '@nivo/pie';
import { Row, Col, Spin, Card } from 'antd';
import { GRID_GUTTER, GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { RatingsDistributionReport } from 'types/peerGroups';
import styles from './ReportsPageRatingsDistribution.module.scss';

type ReportsPageRatingsDistributionProps = {
  paramId: any;
  title: string;
};

export const ReportsPageRatingDistribution = observer(
  ({ paramId, title }: ReportsPageRatingsDistributionProps) => {
    const { ratingsReport, getRatingsReport } = aerisExplorerPeerGroupStore;
    const [loading, setLoading] = useState(false);
    const [impactModalIsVisable, setImpactModalIsVisable] = useState(false);
    const [performanceModalIsVisable, setPerformanceModalIsVisable] =
      useState(false);

    // const colors = [
    //   '#2085ec',
    //   '#72b4eb',
    //   '#0a417a',
    //   '#8464a0',
    //   '#cea9bc',
    //   '#323232',
    // ];

    const allChartData: PieDatum[][] =
      toJS(ratingsReport)?.map(({ columns }: RatingsDistributionReport) => {
        const data = transformRatingsReportToChartData(columns);
        // data.forEach((datum, i) => (datum.color = colors[i % colors.length]));
        return data;
      }) || [];

    const getPercent = (pieSliceData: PieDatum, wholeSliceData: PieDatum[]) => {
      const total = wholeSliceData.reduce((sum, item) => sum + item.value, 0);
      return `${pieSliceData.id} ${((pieSliceData.value / total) * 100).toFixed(
        2,
      )}%`;
    };

    useEffect(() => {
      if (paramId) {
        setLoading(true);
        getRatingsReport(paramId).then(() => setLoading(false));
      }
    }, [getRatingsReport, paramId]);

    if (!ratingsReport) {
      return <p>No data found.</p>;
    }

    return (
      <>
        <Row className={styles.titleContainer}>
          <InnerPageTitle className={styles.lightBlueOverRide}>
            {title}
          </InnerPageTitle>
        </Row>

        <Row gutter={GRID_GUTTER} className={styles.pieChartRow}>
          {loading ? (
            <div className={styles.spinnerContainer}>
              <Spin />
            </div>
          ) : (
            <>
              <Col span={GRID_COL_HALF_ROW_SPAN}>
                <Card
                  title={
                    <button
                      type="button"
                      onClick={() => setImpactModalIsVisable(true)}
                      className={styles.buttonAsText}
                    >
                      Distribution of Current Impact Management Ratings
                    </button>
                  }
                >
                  <div className={styles.pieChartContainer}>
                    <ReportsPieChart
                      data={allChartData[0]}
                      radialLabel={(datum): string =>
                        getPercent(datum, allChartData[0])
                      }
                    />
                  </div>
                </Card>
              </Col>
              <Col span={GRID_COL_HALF_ROW_SPAN}>
                <Card
                  title={
                    <button
                      type="button"
                      onClick={() => setPerformanceModalIsVisable(true)}
                      className={styles.buttonAsText}
                    >
                      Distribution of Current Financial Strength and Performance
                      Ratings
                    </button>
                  }
                >
                  <div className={styles.pieChartContainer}>
                    <ReportsPieChart
                      data={allChartData[1]}
                      radialLabel={(datum): string =>
                        getPercent(datum, allChartData[1])
                      }
                    />
                  </div>
                </Card>
              </Col>
            </>
          )}
        </Row>
        <ImpactDefinitionsModal
          isVisible={impactModalIsVisable}
          onCancel={() => setImpactModalIsVisable(false)}
        />
        <PerformanceDefinitionsModal
          isVisible={performanceModalIsVisable}
          onCancel={() => setPerformanceModalIsVisable(false)}
        />
      </>
    );
  },
);
