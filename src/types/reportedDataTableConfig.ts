type ReportingType = 'QUARTER_TO_DATE' | 'ANNUAL_TO_DATE';
type AggregateAnnualData = boolean;

export type ReportedDataTableConfigRaw = {
  reportingType: ReportingType;
  aggregateAnnualData: AggregateAnnualData;
};

export type ReportedDataTableConfig = {
  displayType: ReportingType;
  showAnnualSummaryColumn: AggregateAnnualData;
};
