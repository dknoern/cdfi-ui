import { Card, Col, List, Tooltip, Spin, Typography } from 'antd';
import { BasicModal } from 'modals/BasicModal';
import React, { useState } from 'react';
import { CompanyMetaData } from 'types/peerGroups';
import styles from './ComparisonViewInfoSection.module.scss';
import { GRID_COL_QUARTER_ROW_SPAN } from 'constants/ui';

type NumberOfPeersCardProps = {
  companyMetaData: CompanyMetaData;
  loading: boolean;
  isComparePortfolioSegment: boolean;
};

export const NumberOfPeersCard = ({
  loading,
  isComparePortfolioSegment,
  companyMetaData,
}: NumberOfPeersCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Col span={GRID_COL_QUARTER_ROW_SPAN}>
        {!loading ? (
          <Card
            className={styles.card}
            title={
              <>
                <div className={styles.displayFlexSmGap}>
                  <span className={styles.greyFive}>
                    {`${
                      isComparePortfolioSegment
                        ? 'Portfolio Segment:'
                        : 'Peer Group:'
                    }`}
                  </span>
                  <Typography.Paragraph
                    ellipsis
                  >{`${companyMetaData?.name}`}</Typography.Paragraph>
                </div>
                <div className={styles.displayFlexSmGap}>
                  <span className={styles.greyFive}>
                    {`Number of ${
                      isComparePortfolioSegment ? 'CDFIs' : 'Peers'
                    } `}
                  </span>
                  <span>{`${
                    companyMetaData?.peerCompanies?.length || 0
                  }`}</span>
                </div>
              </>
            }
          >
            <Tooltip
              title={`Click to view list of ${
                isComparePortfolioSegment ? 'CDFIs' : 'Peer Groups'
              }.`}
            >
              <button
                type="button"
                className={`${styles.buttonAsText} ${styles.lightBlue}`}
                onClick={() => setIsVisible(true)}
              >
                {companyMetaData?.peerCompanies
                  ?.map((peer) => peer.name)
                  .join(', ')
                  .substring(0, 30)}
                ...
              </button>
            </Tooltip>
          </Card>
        ) : (
          <div className={styles.spinnerContainer}>
            <Spin />
          </div>
        )}
      </Col>
      <BasicModal
        visible={isVisible}
        title={`${isComparePortfolioSegment ? 'CDFIs' : 'Peers'}`}
        onCancel={() => setIsVisible(false)}
        closable
      >
        <List>
          {companyMetaData?.peerCompanies?.map((peer) => (
            <List.Item key={peer.id}>{peer.name}</List.Item>
          ))}
        </List>
      </BasicModal>
    </>
  );
};
