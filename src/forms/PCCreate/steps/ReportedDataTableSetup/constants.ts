import { ReportedDataTableConfig } from 'types/reportedDataTableConfig';
import { FormStep } from 'forms/PCCreate/types';

export const CURRENT_STEP = FormStep.reportingConfig;

export const initialValues: ReportedDataTableConfig = {
  displayType: 'ANNUAL_TO_DATE',
  showAnnualSummaryColumn: false,
};
