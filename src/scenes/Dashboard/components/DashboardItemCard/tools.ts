import {
  FMCompanyCard,
  InvestmentCard,
  PCCompanyCard,
  Portfolio,
  ReportingEntityCard,
  Tag,
} from 'types';
import { formatNumberWithCommas } from 'tools/reportedData';
import { CardColumn, DashboardCardType } from 'scenes/Dashboard/types';

type ItemType =
  | Portfolio
  | PCCompanyCard
  | FMCompanyCard
  | ReportingEntityCard
  | InvestmentCard;

export const getCardTags = (item: ItemType): Tag[] => {
  return 'tags' in item ? item.tags : [];
};

export const getCardColumns = (
  item: ItemType,
  dashboardCardType: DashboardCardType,
): CardColumn[] => {
  let displayItem;
  switch (dashboardCardType) {
    case DashboardCardType.PORTFOLIO:
      displayItem = item as Portfolio;
      return [
        {
          title: displayItem.investments.length,
          text: 'Number of Investments',
        },
        {
          title: displayItem.totalInvestments,
          text: 'Total Funds Invested',
        },
      ];

    case DashboardCardType.REPORTING_ENTITY:
      displayItem = item as ReportingEntityCard;
      return [
        {
          title: displayItem.investmentsInfo?.length,
          text: 'Number of Investments',
        },
        {
          title: displayItem.investmentScore,
          text: 'Total Funds Invested',
        },
      ];
    case DashboardCardType.FUND_MANAGER_COMPANY:
      displayItem = item as FMCompanyCard;
      return [
        {
          title: displayItem.portfolios,
          text: 'Total portfolios',
        },
        {
          title: displayItem.portfolioCompanies,
          text: 'Funds',
        },
      ];
    case DashboardCardType.INVESTMENT:
    default:
      displayItem = item as InvestmentCard;
      return [
        {
          title: formatNumberWithCommas(displayItem.totalCommitment) ?? 'N/A',
          text: 'Total commitment',
        },
        {
          title: displayItem.investmentLife.start ?? '',
          text: 'Investment date',
        },
        {
          title: displayItem.investmentLife.maturity ?? '',
          text: 'Maturity date',
        },
      ];
  }
};
