import React, { ReactNode } from 'react';
import { Col, Row } from 'antd';
import { GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import styles from './RatingsDefinitions.module.scss';

type ImpactPerformanceProps = {
  getStarIcons: (arg: number) => ReactNode;
};

export const ImpactPerformance = ({ getStarIcons }: ImpactPerformanceProps) => {
  return (
    <>
      <div className={styles.block}>
        <h3 className={styles.title}>Impact Performance Rating description</h3>
        <p className={styles.description}>
          Aeris ratings are not based on a normative curve. Given the unique
          mission and operating environment in which a loan fund works, it is
          not rated in comparison to other loan funds. Instead each institution
          is rated based on how it compares with the following ratings
          descriptions.
        </p>
        <div className={styles.scrollBLock}>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              {getStarIcons(4)}
              <p className={styles.text}>
                The CDFI has exceptional alignment of its mission, strategies,
                programs and services. It fully and effectively uses its
                financial resources in alignment with its mission, both directly
                with its portfolio investments and indirectly leveraging
                off-balance sheet financial resources. Its processes and systems
                accurately track comprehensive output and outcome data, on an
                ongoing basis. Impact metrics show positive changes toward
                achieving its impact goals. Board and management consistently
                use the data to adjust strategies and activities to improve its
                effectiveness in achieving its mission.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              {getStarIcons(3)}
              <p className={styles.text}>
                The CDFI has strong alignment of its mission, strategies,
                programs and services, and portfolio investments with its
                mission. It effectively uses its financial resources in
                alignment with its mission, primarily with portfolio
                investments; investment activities beyond its loan portfolio may
                be minimal. Its processes and systems accurately track output
                data, on an ongoing basis. Longer term outcome metrics may be
                limited. Impact metrics show positive changes toward achieving
                its impact goals. Board and management use the data on a regular
                basis to improve strategies and activities in pursuit of
                mission.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              {getStarIcons(2)}
              <p className={styles.text}>
                The CDFI has reasonable strategies, programs and services, and
                portfolio investments that are in alignment with its mission. It
                has basic systems in place to track essential output data that
                indicate its resources are used consistent with its mission.
                Board and management use the data on a limited basis to adjust
                strategies and activities in pursuit of mission.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              {getStarIcons(1)}
              <p className={styles.text}>
                The CDFI may lack alignment of its mission, strategies, programs
                and services, and portfolio investments. Either it lacks impact
                data, the data is unsatisfactory, or data systems are weak. It
                also may have a history of underutilizing its financial
                resources consistent with its mission. Board and management
                rarely use data to adjust strategies and activities in pursuit
                of mission.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <p className={styles.rating}>Policy Plus</p>
              <p className={styles.text}>
                Policy change is an integral part of this CDFI's strategies. The
                CDFI leads initiatives to change government policy to benefit
                the CDFI industry or disadvantaged people and communities. The
                CDFI can provide evidence of its leadership role in recent
                policy changes that produced benefits beyond additional
                resources for the CDFI itself, and management can clearly
                articulate the CDFI’s leadership role in current policy
                activities.
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
