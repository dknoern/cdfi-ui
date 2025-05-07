import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { defaultReportsPageUrlParams } from 'scenes/AerisExplorer/constants';
import { aerisExplorerPeerGroupStore, userStore } from 'store';
import { useCompareMetaData } from './useCompareMetaData';
import { handleCheckboxChange } from 'scenes/AerisExplorer/components/handleReportsPageUrlParamsChange';
import {
  Row,
  Col,
  Spin,
  Button,
  Card,
  Tooltip,
  Checkbox,
  Typography,
} from 'antd';
import { NumberOfPeersCard } from './NumberOfPeersCard';
import { GRID_GUTTER, GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { InnerPageTitle } from 'components/InnerPage/InnerPageTitle';
import { DownloadOutlined } from '@ant-design/icons';
import { apiProcessor, makeFetch } from 'tools';
import styles from './ComparisonViewInfoSection.module.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Comparison } from 'types/peerGroups';

type ReportsPageInfoSectionProps = {
  paramId: any;
  expandedRowKeys: number[];
  setExpandedRowKeys: React.Dispatch<React.SetStateAction<number[]>>;
};

export const ComparisonViewInfoSection = observer(
  ({
    paramId,
    expandedRowKeys,
    setExpandedRowKeys,
  }: ReportsPageInfoSectionProps) => {
    const {
      reportsPageUrlParams,
      setReportsPageUrlParams,
      reportEquations,
      comparison,
      getComparison,
      setComparison,
      compareAggregate,
    } = aerisExplorerPeerGroupStore;
    const [loading, setLoading] = useState(false);

    const name = comparison?.name;
    const description = comparison?.description;
    const comparePeerGroupId = comparison?.comparePeerGroupId; // Portfolio Segment
    const basePeerGroupId = comparison?.basePeerGroupId; // Peer Group
    const cdfiId = comparison?.compareCdfis?.[0]; // Single CDFI
    const isComparePortfolioSegment = !!comparePeerGroupId;

    const {
      loading: metaDataLoading,
      portfolioMeta,
      peerGroupMeta,
      cdfiMeta,
    } = useCompareMetaData({
      comparePeerGroupId,
      basePeerGroupId,
      cdfiId,
    });

    const checkboxOptions = [
      ...(userStore.isAerisAdmin
        ? [{ label: 'Calendar Year View', value: 'showCalendarYearView' }]
        : []),
      { label: 'All Years', value: 'allYears' },
      { label: 'Show Interim', value: 'showInterim' },
      {
        label: 'Show Incomplete Current Year',
        value: 'showIncomplete',
      },
    ];

    const handleExpandAll = (e: CheckboxChangeEvent) => {
      if (e.target.checked) {
        setExpandedRowKeys(reportEquations?.map((_: any, i: number) => i));
        return;
      }
      setExpandedRowKeys([]);
    };

    const exportReport = () => {
      const expandedEquations = expandedRowKeys
        .map((key) => reportEquations[key])
        .map((equation) => equation?.id);

      makeFetch({
        url: apiProcessor.makeEndpoint('exportComparisonPage', {
          ...reportsPageUrlParams,
          peerOrPortId: paramId,
          equationIds: expandedEquations,
          compareAggregate,
        }),
        contentType:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${name}.xlsx`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
    };

    useEffect(() => {
      setLoading(true);
      getComparison(paramId).then(() => setLoading(false));
      return () => {
        setReportsPageUrlParams(defaultReportsPageUrlParams);
        setComparison(undefined as unknown as Comparison);
      };
    }, [paramId, getComparison]);

    if (loading) {
      return (
        <div className={styles.spinnerContainer}>
          <Spin />
        </div>
      );
    }
    return (
      <>
        <Row className={styles.titleContainer}>
          <InnerPageTitle className={styles.lightBlueOverRide}>
            <strong>{name}</strong>
          </InnerPageTitle>
        </Row>

        <Row>
          <Typography.Text type="secondary">{description}</Typography.Text>
        </Row>
        <Row gutter={GRID_GUTTER}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Card className={styles.card}>
              <Tooltip title="Download group report as excel workbook.">
                <Button
                  className={styles.exportButton}
                  onClick={exportReport}
                  icon={<DownloadOutlined />}
                >
                  Export Excel Workbook
                </Button>
              </Tooltip>
              <div style={{ display: 'block' }}>
                <Checkbox onChange={(e) => handleExpandAll(e)}>
                  Expand All
                </Checkbox>
                <Checkbox.Group
                  value={Object.keys(reportsPageUrlParams).filter(
                    (key) =>
                      reportsPageUrlParams[
                        key as keyof typeof reportsPageUrlParams
                      ],
                  )}
                  onChange={(checkedValues) =>
                    handleCheckboxChange(checkedValues, checkboxOptions)
                  }
                  options={checkboxOptions.map((option) => ({
                    ...option,
                    disabled:
                      option.value === 'showIncomplete' &&
                      reportsPageUrlParams.allYears,
                  }))}
                />
              </div>
            </Card>
          </Col>

          {isComparePortfolioSegment && (
            <NumberOfPeersCard
              loading={metaDataLoading}
              companyMetaData={portfolioMeta}
              isComparePortfolioSegment={true}
            />
          )}
          <NumberOfPeersCard
            loading={metaDataLoading}
            companyMetaData={peerGroupMeta}
            isComparePortfolioSegment={false}
          />
        </Row>
      </>
    );
  },
);
