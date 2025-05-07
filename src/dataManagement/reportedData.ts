import { Company, Metric } from 'types';
import { MetricValue } from 'types/metricValue';
import { ReportingPeriod } from 'types/reportedData';
import { MetricChangeHistory } from 'types/metricHistory';
import { PreviewTableGetParams, PreviewTableGetResult } from 'types/forecast';
import { apiProcessor } from 'tools';
import { uiStore } from 'store';
import { savePeriodData } from './operations/reportedData';

class ReportedDataManager {
  saveMetricAdjustment = (data: {
    metricId: Metric['id'];
    periodEndDate: ReportingPeriod;
    oldValue: MetricValue;
    newValue: MetricValue;
    companyId?: Company['id'];
    comment: string;
  }): Promise<void> => {
    const OPERATION = 'adjustmentAdd';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .post(OPERATION, null, {
        ...data,
        periodEndDate: `${data.periodEndDate.quarter}-${data.periodEndDate.year}`,
      })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  getMetricChangeHistory = (idObj: {
    metricId: Metric['id'];
    companyId: Company['id'];
    periodEndDate: ReportingPeriod;
  }): Promise<MetricChangeHistory[]> => {
    const OPERATION = 'metricValueChangeRequestHistory';

    return apiProcessor.get(OPERATION, {
      ...idObj,
      periodEndDate: `${idObj.periodEndDate.quarter}-${idObj.periodEndDate.year}`,
    });
  };

  savePeriodData: typeof savePeriodData = (report) => {
    const OPERATION = 'SAVE_PERIOD_DATA';

    uiStore.addLoading(OPERATION);

    return savePeriodData(report).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  deletePeriod = (config: {
    period: ReportingPeriod;
    companyId?: Company['id'];
  }): Promise<void> => {
    const {
      period: { year, quarter },
      companyId,
    } = config;
    const OPERATION = 'dataInputPeriodDelete';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .delete(OPERATION, {
        companyId,
        year,
        quarter,
      })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  getReportedDataV2 = (
    params: PreviewTableGetParams,
  ): Promise<PreviewTableGetResult> => {
    const OPERATION = 'reportedDataV2ForCompany';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .post(OPERATION, params.companyId, params)
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };
}

export const reportedData = new ReportedDataManager();
