import React, { useEffect, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { uiText } from 'constants/uiText';
import { useMetricCategories } from 'scenes/Manage/tools';
import { useCompanyMetrics } from 'dataManagement';
import { workDataStore } from 'store';
import { reportingConfigType } from '../types';
import { usePCReporting, useMapping, filterUnusedCategories } from '../tools';
import { mapStore } from '../store';
import { SourceCol } from './SourceCol';
import { MetricsCol } from './MetricsCol';
import styles from './Constructor.module.scss';

export const Constructor = ({ reportingConfig }) => {
  const [isLoadingReporting, reportingData, hasErrorReporting] = usePCReporting(
    reportingConfig,
  );
  const [isLoadingMapping, mappingData, hasErrorMapping] = useMapping(
    reportingConfig,
  );

  const { companyId } = workDataStore.viewModeConfig;
  const {
    data: requiredMetrics,
    isLoading: isLoadingMetrics,
    hasError: hasErrorMetrics,
  } = useCompanyMetrics(companyId ?? 0);
  const {
    items: availableMetricCategories,
    isLoading: isLoadingMetricCategories,
    hasError: hasErrorMetricCategories,
  } = useMetricCategories();

  useEffect(() => {
    mapStore.setReportingConfig(reportingConfig);
  }, [reportingConfig]);

  useEffect(() => {
    if (reportingData) {
      mapStore.reset();
      mapStore.setSourceData(reportingData, mappingData);
    }
  }, [reportingData, mappingData]);

  useEffect(() => {
    if (mappingData) {
      mapStore.storeImports(mappingData);
    }
  }, [mappingData]);

  const usedCategories = useMemo(() => {
    if (
      !Array.isArray(requiredMetrics) ||
      !Array.isArray(availableMetricCategories)
    )
      return [];

    return filterUnusedCategories({
      metrics: requiredMetrics,
      categories: availableMetricCategories,
    });
  }, [requiredMetrics, availableMetricCategories]);

  if (
    hasErrorReporting ||
    hasErrorMetrics ||
    hasErrorMetricCategories ||
    hasErrorMapping
  ) {
    return <div>{uiText('general', 'dataLoadingError')}</div>;
  }

  if (
    isLoadingReporting ||
    isLoadingMetrics ||
    isLoadingMetricCategories ||
    isLoadingMapping
  ) {
    return <div>{uiText('general', 'dataLoading')}</div>;
  }

  if (reportingData && reportingData.length < 1) {
    return <div>{uiText('mapper', 'errorNoDataInReporting')}</div>;
  }

  return (
    <DndProvider backend={Backend}>
      <main className={styles.cols}>
        <SourceCol />
        <MetricsCol
          metrics={requiredMetrics}
          metricCategories={usedCategories}
        />
      </main>
    </DndProvider>
  );
};
Constructor.propTypes = {
  reportingConfig: reportingConfigType.isRequired,
};
