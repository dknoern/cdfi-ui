import {
  CHART_EXPORT_ENDPOINT_ENTITY_PC,
  CHART_EXPORT_ENDPOINT_ENTITY_PORTFOLIO,
  FORECAST_EXPORT_ENDPOINT_ENTITY,
} from './constants';

export const getEndpointEntityByExportMode = (mode: string): string => {
  switch (mode) {
    case 'companyChart':
      return CHART_EXPORT_ENDPOINT_ENTITY_PC;
    case 'portfolioChart':
      return CHART_EXPORT_ENDPOINT_ENTITY_PORTFOLIO;
    case 'forecast':
    default:
      return FORECAST_EXPORT_ENDPOINT_ENTITY;
  }
};
