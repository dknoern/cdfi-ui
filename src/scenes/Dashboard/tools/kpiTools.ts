import { Kpi, FetchHookResult, ViewMode, PersonRole } from 'types';
import { pcLevelKPIConfig } from '../constants/kpiConfig';

export const commonKPITemplate: Kpi[] = new Array(5).fill(1).map((_, idx) => ({
  id: idx + 1,
  title: 'Loading...',
  value: 'N/A',
}));

interface KPIDisplayConfig {
  personRole: PersonRole;
  viewMode: ViewMode;
}
type KPIDisplayData = (Kpi & {
  smallValue?: boolean;
})[];

export const KPIPlaceholderData = ({
  personRole,
  viewMode,
}: KPIDisplayConfig): KPIDisplayData => {
  let count = 4;
  if (personRole === PersonRole.PORTFOLIO_USER) {
    count = 5;
  } else if (viewMode === 'INVESTMENT') count = 3;

  return commonKPITemplate.slice(0, count);
};

interface Preparer {
  (
    fetchResult: FetchHookResult<Kpi[]>,
    config: KPIDisplayConfig,
    fallbackData?: KPIDisplayData,
  ): KPIDisplayData;
}
export const prepareKPICards: Preparer = (
  fetchResult,
  { personRole, viewMode },
  fallbackData,
) => {
  if (fetchResult.isLoading || !fetchResult.data || fetchResult.hasError)
    return fallbackData ?? KPIPlaceholderData({ personRole, viewMode });

  if (
    (personRole === PersonRole.FUND_MANAGER_USER ||
      personRole === PersonRole.FUND_MANAGER_ADMIN) &&
    (viewMode === 'INVESTMENT' || viewMode === 'ENTITY')
  ) {
    // need to add smallValue param
    return fetchResult.data.map(({ id, value, title }) => ({
      ...(pcLevelKPIConfig.find((item) => item.id === id) || {
        smallValue: false,
      }),
      id,
      value,
      title,
    }));
  }

  return fetchResult.data;
};
