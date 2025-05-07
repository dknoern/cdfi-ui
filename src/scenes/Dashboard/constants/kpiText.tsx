import React, { ReactNode } from 'react';
import { FMKpiRaw, FMKpiRawCompany, PCKpiRaw } from 'types';

export const fmPortfolioKpiText: Record<keyof FMKpiRaw, string> = {
  investments: 'Number of Investments',
  totalPortfolioInvestment: 'Total Portfolio Investments',
  nextDueDate: 'Next Report Due Date',
  delayedReports: 'Number of Delayed Reports',
};

export const fmPortfolioCompanyKpiText: Record<
  keyof FMKpiRawCompany,
  string
> = {
  nextReportingDueDate: 'Next Reporting Due Date',
  numberOfMissingDocuments: 'Number of Missing Documents',
  mostRecentFileUpload: 'Most Recent File Upload',
};

export const pcKpiText: Record<keyof PCKpiRaw, ReactNode> = {
  numberOfPendingMetricRequests: (
    <>
      Number of Pending Metric
      <br />
      Requests
    </>
  ),
  nextReportingPeriod: 'Next Data Reporting Period',
  dataDueDate: 'Data Due Date',
  documentDueDate: (
    <>
      Next
      <br />
      Document
      <br />
      Due Date
    </>
  ),
  numberOfMissingData: 'Number of Missing Data',
};
