import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { defaultReportsPageUrlParams } from 'scenes/AerisExplorer/constants';
import { aerisExplorerPeerGroupStore, userStore } from 'store';
import { handleCheckboxChange } from 'scenes/AerisExplorer/components/handleReportsPageUrlParamsChange';
import {
  Row,
  Col,
  Spin,
  Button,
  List,
  Card,
  Tooltip,
  Checkbox,
  Typography,
} from 'antd';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  MODAL_WIDTH,
} from 'constants/ui';

import { EditLink } from '../../../EditLink/EditLink';
import { InnerPageTitle } from 'components/InnerPage/InnerPageTitle';
import { BasicModal } from 'modals/BasicModal';
import { DownloadOutlined } from '@ant-design/icons';
import { apiProcessor } from 'tools';
import styles from './ReportsPageInfoSection.module.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import {
  GlobalCdifiWithMetrics,
  PeerPortfolioSegment,
  GroupType,
} from 'types/peerGroups';
import { ActivityModel } from '../../../../../../types';
import { createActivity } from '../../../../../../dataManagement/operations/cdfiOperations';

type ReportsPageInfoSectionProps = {
  paramId: any;
  expandedRowKeys: number[];
  setExpandedRowKeys: React.Dispatch<React.SetStateAction<number[]>>;
  setSectionTitles: React.Dispatch<
    React.SetStateAction<{ distribution: string; equations: string }>
  >;
  setGlobalCdfiData: React.Dispatch<
    React.SetStateAction<GlobalCdifiWithMetrics | undefined>
  >;
};

export const ReportsPageInfoSection = observer(
  ({
    paramId,
    expandedRowKeys,
    setExpandedRowKeys,
    setSectionTitles,
    setGlobalCdfiData,
  }: ReportsPageInfoSectionProps) => {
    const {
      peerGroup,
      getPeerGroup,
      reportsPageUrlParams,
      setReportsPageUrlParams,
      reportEquations,
      setPeerGroup,
      getEquationFilters,
      getGlobalCDFIMetrics,
    } = aerisExplorerPeerGroupStore;
    const [allEquationFilters, setAllEquationFilters] = useState<
      Record<number, { name: string; unitType: string }>
    >({});
    const [allEquationFiltersLoading, setAllEquationFiltersLoading] =
      useState(false);
    const [peerPortfolioLoading, setPeerPortfolioLoading] = useState(false);
    const [isPeerCriteriaVisible, setIsPeerCriteriaVisible] = useState(false);
    const [isPeerGroupListVisible, setIsPeerGroupListVisible] = useState(false);

    const [isExcelReportLoading, setIsExcelReportLoading] = useState(false);
    const [emailSentModalVisible, setEmailSentModalVisible] = useState(false);
    const [sentToEmail, setSentToEmail] = useState('');

    const name = peerGroup?.name;
    const description = peerGroup?.description;
    const peers = peerGroup?.peerCompanies;
    const filters = peerGroup?.filters?.filter((filter) => !filter.equationId);
    const additionalFilters = peerGroup?.filters?.filter(
      (filter) => filter.equationId,
    );
    const isPeerGroup = peerGroup?.groupType === GroupType.PEER_GROUP;
    const isArchived = peerGroup?.archived;
    const peersTerminology = isPeerGroup
      ? 'Peers'
      : 'CDFIs in Portfolio Segment';

    const peerCriteriaTerminology = isPeerGroup ? 'Peer' : 'CDFI';

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

      setIsExcelReportLoading(true);

      fetch(
        apiProcessor.makeEndpoint('exportReportPage', {
          ...reportsPageUrlParams,
          peerOrPortId: paramId,
          equationIds: expandedEquations,
        }),
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          credentials: 'include',
        },
      )
        .then((response) => {
          const contentType = response.headers
            ? response.headers.get('Content-Type')
            : null;
          if (contentType && contentType.includes('application/json')) {
            return response.json().then((data) => {
              if (data.email) {
                setIsExcelReportLoading(false);
                setEmailSentModalVisible(true);
                setSentToEmail(data.email);
              }
            });
          }
          if (
            contentType &&
            contentType.includes(
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            )
          ) {
            return response.blob().then((blob) => {
              setIsExcelReportLoading(false);
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${name}.xlsx`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            });
          }
          throw new Error('Unexpected or undefined Content-Type.');
        })
        .catch((error) => {
          setIsExcelReportLoading(false);
          console.error('Error processing request:', error.message || error);
          alert(
            'An error occurred while processing your request. Please try again later.',
          );
        });
    };

    const formatValues = (value: string, unitType: string) => {
      switch (unitType) {
        case 'DOLLAR':
          return new Intl.NumberFormat('en-US', {
            currency: 'USD',
            style: 'currency',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(Number(value));
        case 'PERCENTAGE':
          return `${Number(value) * 100}%`;
        case 'NUMBER':
          return Number(value).toLocaleString();
        default:
          return value;
      }
    };

    useEffect(() => {
      setPeerPortfolioLoading(true);
      getPeerGroup(paramId).then(() => setPeerPortfolioLoading(false));
      return () => {
        setReportsPageUrlParams(defaultReportsPageUrlParams);
        setPeerGroup(undefined as unknown as PeerPortfolioSegment);
      };
    }, [paramId, getPeerGroup, setReportsPageUrlParams, setPeerGroup]);

    useEffect(() => {
      setAllEquationFiltersLoading(true);
      getEquationFilters().then((res) => {
        const initialAccumulator: Record<
          number,
          { name: string; unitType: string }
        > = {};
        setAllEquationFilters(
          res.reduce((result, equation) => {
            result[equation.id] = {
              name: equation.name,
              unitType: equation.unitType as string,
            };
            return result;
          }, initialAccumulator),
        );

        setAllEquationFiltersLoading(false);
      });
    }, [getEquationFilters]);

    useEffect(() => {
      if (peerGroup?.cdfiId) {
        getGlobalCDFIMetrics(
          peerGroup?.id,
          peerGroup?.cdfiId,
          reportsPageUrlParams,
        ).then((data) => {
          setGlobalCdfiData(data);
        });
      }
    }, [
      getGlobalCDFIMetrics,
      peerGroup,
      reportsPageUrlParams,
      setGlobalCdfiData,
    ]);

    useEffect(() => {
      const entityTitle = isPeerGroup ? 'Peer Group' : 'Portfolio Segment';
      setSectionTitles({
        distribution: `${entityTitle} Ratings Distribution`,
        equations: `${entityTitle} Selected Metrics`,
      });
    }, [isPeerGroup, paramId, peerGroup, setSectionTitles]);

    useEffect(() => {
      let activityType = '';
      if (isPeerGroup) {
        activityType = 'PEER_GROUP_REPORT_VIEWED';
      } else {
        activityType = 'PORTFOLIO_SEGMENT_REPORT_VIEWED';
      }

      const activity: ActivityModel = {
        companyId: peerGroup?.companyId,
        quarter: 0,
        year: 0,
        activityType,
      };

      if (!activity.companyId) {
        console.error('No company Id found.');
        return;
      }

      createActivity(activity).catch(console.error);
    }, [isPeerGroup, peerGroup]);

    if (peerPortfolioLoading || isExcelReportLoading) {
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
          {(userStore.isAerisAdmin || userStore.isStaff) &&
            isPeerGroup &&
            !isArchived && (
              <div className={styles.editContainer}>
                <EditLink
                  url={`/create-peer-or-portfolio/${peerGroup?.groupType}/${paramId}`}
                />
              </div>
            )}
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
                  disabled={isExcelReportLoading}
                >
                  {'Export Excel Workbook'}
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
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <Card
              className={styles.card}
              title={`Number of ${peersTerminology}: ${peers?.length}`}
            >
              <Tooltip title={`Click to view list of ${peersTerminology}.`}>
                <button
                  type="button"
                  className={`${styles.buttonAsText} ${styles.lightBlue}`}
                  onClick={() => setIsPeerGroupListVisible(true)}
                >
                  {peers
                    ?.map((peer) => peer.name)
                    .join(', ')
                    .substring(0, 30)}
                  ...
                </button>
              </Tooltip>
            </Card>
          </Col>

          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <Card
              className={styles.card}
              title={`${peerCriteriaTerminology} Criteria`}
            >
              {[...(filters || []), ...(additionalFilters || [])].length > 0 ? (
                <Tooltip
                  title={`Click to view all ${peerCriteriaTerminology} criteria`}
                >
                  <button
                    type="button"
                    className={`${styles.buttonAsText} ${styles.lightBlue}`}
                    onClick={() => setIsPeerCriteriaVisible(true)}
                  >
                    {allEquationFiltersLoading ? (
                      <Spin />
                    ) : (
                      `${
                        filters
                          ?.map((criteria) => criteria.displayName)
                          .join(', ')
                          .substring(0, 40) ||
                        `View ${peerCriteriaTerminology} Criteria`
                      }...`
                    )}
                  </button>
                </Tooltip>
              ) : (
                `There is no ${peerCriteriaTerminology} criteria.`
              )}
            </Card>
          </Col>
          <BasicModal
            visible={isPeerCriteriaVisible}
            title={`${peerCriteriaTerminology} Criteria`}
            onCancel={() => setIsPeerCriteriaVisible(false)}
            closable
          >
            {filters?.map((filter, i) => (
              <div key={i}>
                <h4>{filter.displayName}</h4>
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={filter.values}
                  renderItem={(val: string, idx: number) => {
                    if (filter.displayName === 'Total Assets') {
                      const prefix = (
                        <span className={styles.totalAssetsPrefix}>
                          {idx === 0 ? `Min:` : 'Max:'}
                        </span>
                      );
                      return (
                        <List.Item>
                          {prefix} <br />
                          {formatValues(val, 'DOLLAR')}
                        </List.Item>
                      );
                    }
                    return <List.Item>{val}</List.Item>;
                  }}
                />
              </div>
            ))}
            {additionalFilters?.map((filter, i) => {
              const displayName = allEquationFilters[filter.equationId]?.name;
              const unitType = allEquationFilters[filter.equationId]?.unitType;
              return (
                <div key={i}>
                  <h4>{displayName}</h4>
                  <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={filter.values}
                    renderItem={(val: string, idx: number) => {
                      const prefix = (
                        <span className={styles.totalAssetsPrefix}>
                          {idx === 0 ? `Min:` : 'Max:'}
                        </span>
                      );
                      return (
                        <List.Item>
                          {prefix}
                          <br /> {formatValues(val, unitType)}
                        </List.Item>
                      );
                    }}
                  />
                </div>
              );
            })}
          </BasicModal>
          <BasicModal
            visible={isPeerGroupListVisible}
            title={peersTerminology}
            onCancel={() => setIsPeerGroupListVisible(false)}
            closable
          >
            <List>
              {peers?.map((peer) => (
                <List.Item key={peer.id}>{peer.name}</List.Item>
              ))}
            </List>
          </BasicModal>
          <BasicModal
            width={MODAL_WIDTH.SMALL}
            className={styles.modal}
            visible={emailSentModalVisible}
            title="Export Excel Report"
            onCancel={() => setEmailSentModalVisible(false)}
            closable
            footer={
              <Button
                onClick={() => setEmailSentModalVisible(false)}
                type="primary"
              >
                Ok
              </Button>
            }
          >
            <div className={styles.wrapperModal}>
              <p className={styles.text}>
                The report will be generated and sent to: {sentToEmail}
              </p>
            </div>
          </BasicModal>
        </Row>
      </>
    );
  },
);
