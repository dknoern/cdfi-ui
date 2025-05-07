export interface FMKpiRaw {
  investments: number;
  totalPortfolioInvestment: string;
  nextDueDate: string;
  delayedReports: number;
}

export interface FMKpiRawCompany {
  nextReportingDueDate: string;
  numberOfMissingDocuments: number;
  mostRecentFileUpload: string;
}

export const isCompanyKpi = (
  kpi: FMKpiRaw | FMKpiRawCompany,
): kpi is FMKpiRawCompany => {
  return (kpi as FMKpiRawCompany).numberOfMissingDocuments !== undefined;
};

export interface PCKpiRaw {
  numberOfPendingMetricRequests: number;
  nextReportingPeriod: string;
  dataDueDate: string;
  documentDueDate: string;
  numberOfMissingData: string;
}

export interface Kpi {
  id: string | number;
  title: React.ReactNode;
  value: string | number;
}
