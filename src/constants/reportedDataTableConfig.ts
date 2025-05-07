import { ReportedDataTableConfig } from 'types/reportedDataTableConfig';

export const reportedDataTableConfigFields: Record<
  keyof ReportedDataTableConfig,
  string
> = {
  displayType: 'displayType',
  showAnnualSummaryColumn: 'showAnnualSummaryColumn',
};

export const reportedDataTableDisplayTypeNames: Record<
  ReportedDataTableConfig['displayType'],
  string
> = {
  ANNUAL_TO_DATE: 'Year-to-Date (YTD, Default)',
  QUARTER_TO_DATE: 'Quarter-to-Date (QTD)',
};

export const reportedDataTableConfigDefaultValues: ReportedDataTableConfig = {
  displayType: 'ANNUAL_TO_DATE',
  showAnnualSummaryColumn: false,
};
