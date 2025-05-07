import React, { FC, useContext, useMemo, useCallback } from 'react';
import { Row, Col, Typography, Empty } from 'antd';
import { observer } from 'mobx-react';
import { GraphType } from 'types/graphs';
import { typography } from 'constants/typography';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { workDataStore } from 'store';
import { useCreatedGraphPreviewDeps } from 'dataManagement/useCreatedGraphPreviewDeps';
import { store } from 'forms/ChartCreate/store';
import { stepContext } from 'forms/ChartCreate/context';
import { Table as EquationsTable } from 'forms/ChartCreate/steps/MakeEquations/Table';
import { metricsStore } from 'forms/ChartCreate/metricsStore';
import { isEmptyGraph } from 'tools/graphTools/isEmptyGraph';
import { Table as FormatTablePreview } from 'scenes/Charts/components';
import { FormatChartPreview } from '../FormatChartPreview';
import { SelectMetricsPreview } from '../SelectMetricsPreview';
import styles from './PreviewArea.module.scss';

const { Title, Text } = Typography;
const { previewPlaceholder } = typography('chartsSetup');
const { emptyData } = typography('charts');

type PreviewAreaProps = {
  isEdit?: boolean;
};

const PreviewAreaFn: FC<PreviewAreaProps> = ({ isEdit = false }) => {
  const {
    state: { step },
  } = useContext(stepContext);
  const { name, description, pcIds, type, formatChart } = store.data;
  const { metrics } = metricsStore;
  const { portfolio, company, companyId } = workDataStore;

  // Calculation is needed for editing graph case (SelectTemplate step is skipped)
  const calcStepIdx = useCallback(
    (steps: number | number[]) => {
      if (isEdit) {
        if (Array.isArray(steps)) {
          return steps.map((item) => item - 1);
        }

        return steps - 1;
      }

      return steps;
    },
    [isEdit],
  );

  const shouldRenderSelectMetricsPreview = useMemo(() => {
    return (
      step === calcStepIdx(2) &&
      metrics.length > 0 &&
      (company ? true : pcIds.length > 0)
    );
  }, [calcStepIdx, company, metrics.length, pcIds.length, step]);

  const shouldRenderEquationsPreview = useMemo(() => {
    return step === calcStepIdx(3);
  }, [calcStepIdx, step]);

  const shouldRenderFormatTablePreview = useMemo(() => {
    return step === calcStepIdx(4);
  }, [calcStepIdx, step]);

  const shouldRenderFormatChartPreview = useMemo(() => {
    return step === calcStepIdx(5) && !!type;
  }, [calcStepIdx, step, type]);

  const companiesForFormatTablePreview = useMemo(() => {
    if (company) return [company];
    if (portfolio?.investments) return portfolio.investments;

    return [];
  }, [company, portfolio]);

  const forPortfolio = !companyId;

  const {
    data: graphPreviewData,
    isLoading: graphPreviewDataLoading,
  } = useCreatedGraphPreviewDeps(forPortfolio);

  if (!isEdit && step < calcStepIdx(2) && !name && !description) {
    return (
      <Row className={styles.container} justify="center" align="middle">
        <Col>
          <Title level={4} className={`${styles.title} ${styles.upperCase}`}>
            {previewPlaceholder}
          </Title>
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[0, GRID_GUTTER]}>
      <Col span={GRID_COL_FULL_ROW_SPAN}>
        <Title id="graphName" level={4} className={styles.title}>
          {name || '[Please enter the name]'}
        </Title>
        <Text id="graphDescription">
          {description || '[Please enter the description]'}
        </Text>
      </Col>
      {shouldRenderSelectMetricsPreview && (
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <SelectMetricsPreview
            previewData={graphPreviewData}
            isLoading={graphPreviewDataLoading}
          />
        </Col>
      )}
      {shouldRenderEquationsPreview && (
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <EquationsTable />
        </Col>
      )}
      {shouldRenderFormatTablePreview && (
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <FormatTablePreview
            data={graphPreviewData}
            isLoading={graphPreviewDataLoading}
            companies={
              forPortfolio ? companiesForFormatTablePreview : undefined
            }
          />
        </Col>
      )}
      {shouldRenderFormatChartPreview && (
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          {isEmptyGraph(graphPreviewData) ? (
            <Empty description={emptyData} />
          ) : (
            <>
              {type !== GraphType.TABLE && (
                <FormatChartPreview
                  data={
                    graphPreviewData && type
                      ? { ...graphPreviewData, type }
                      : graphPreviewData
                  }
                  isLoading={graphPreviewDataLoading}
                  type={type}
                  {...formatChart}
                />
              )}
              <FormatTablePreview
                data={graphPreviewData}
                isLoading={graphPreviewDataLoading}
                companies={
                  forPortfolio ? companiesForFormatTablePreview : undefined
                }
              />
            </>
          )}
        </Col>
      )}
    </Row>
  );
};

export const PreviewArea = observer(PreviewAreaFn);
