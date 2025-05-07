import { ViewModeConfig } from 'types';

export const convertConfig = (config: ViewModeConfig): ViewModeConfig => {
  return {
    ...config,
    companyId: config.companyId ?? 0,
  };
};
