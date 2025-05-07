import {
  ReportedDataTableConfig,
  ReportedDataTableConfigRaw,
} from 'types/reportedDataTableConfig';

const server2Client = ({
  reportingType,
  aggregateAnnualData,
}: ReportedDataTableConfigRaw): ReportedDataTableConfig => ({
  displayType: reportingType,
  showAnnualSummaryColumn: aggregateAnnualData,
});

const client2Server = ({
  displayType,
  showAnnualSummaryColumn,
}: ReportedDataTableConfig): ReportedDataTableConfigRaw => ({
  reportingType: displayType,
  aggregateAnnualData: showAnnualSummaryColumn,
});

export const reportedDataTableConverters = {
  server2Client,
  client2Server,
};
