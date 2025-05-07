import React from 'react';
import { Col, Row } from 'antd';
import { GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import styles from './RatingsDefinitions.module.scss';

export const FinancialPerformance = () => {
  return (
    <>
      <div className={styles.block}>
        <h3 className={styles.title}>
          Financial Performance Rating description
        </h3>
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
              <div className={styles.ratingWrapper}>
                <p className={styles.rating}>AAA</p>
                <p className={styles.ratingText}>Sound</p>
              </div>
              <p className={styles.text}>
                The CDFI has exceptional financial strength, performance and
                risk management practices. Any weaknesses are minor and can be
                handled in a routine manner by the board of directors and
                management. The CDFI is resilient to significant changes in its
                operating environment.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <div className={styles.ratingWrapper}>
                <p className={styles.rating}>AA+ AA AA-</p>
                <p className={styles.ratingText}>Sound</p>
              </div>
              <p className={styles.text}>
                The CDFI has very strong financial strength, performance and
                risk management practices relative to its size, complexity, and
                risk profile. Challenges are well within the board of directors'
                and management's capabilities and willingness to strengthen. The
                CDFI is capable of withstanding fluctuations in its operating
                environment.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <div className={styles.ratingWrapper}>
                <p className={styles.rating}>A+ A A-</p>
                <p className={styles.ratingText}>Sound</p>
              </div>
              <p className={styles.text}>
                The CDFI has strong financial strength, recent performance and
                risk management practices relative to its size, complexity, and
                risk profile. It is stable but more vulnerable to fluctuations
                in its operating environment than higher rated CDFIs.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <div className={styles.ratingWrapper}>
                <p className={styles.rating}>BBB+ BBB BBB-</p>
                <p className={styles.ratingText}>Sound</p>
              </div>
              <p className={styles.text}>
                The CDFI has satisfactory financial strength, performance and
                risk management practices relative to its size, complexity, and
                risk profile. It is stable but sensitive to fluctuations in its
                operating environment.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <div className={styles.ratingWrapper}>
                <p className={styles.rating}>BB+ BB BB-</p>
                <p className={styles.ratingText}>Vulnerable</p>
              </div>
              <p className={styles.text}>
                The CDFI exhibits inadequate financial strength, performance, or
                risk management practices relative to its size, complexity, and
                risk profile. It exhibits weaknesses in one or more areas that
                could compromise its financial situation in the medium term,
                even in a stable operating environment.
              </p>
            </Col>
          </Row>
          <Row className={styles.infoItem}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <div className={styles.ratingWrapper}>
                <p className={styles.rating}>B</p>
                <p className={styles.ratingText}>Vulnerable</p>
              </div>
              <p className={styles.text}>
                The CDFI exhibits weaknesses in several areas that compromise
                its financial viability. Although the CDFI may be able to
                sustain operations for a period of time, its financial stability
                is extremely sensitive to any fluctuation in its operating
                environment.
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
