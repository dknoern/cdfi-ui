import { FMKpiRawCompany, FMKpiRaw, PCKpiRaw } from 'types';
import { apiProcessor } from 'tools';

export const listFMKpi = (): Promise<FMKpiRaw> => apiProcessor.get('fmKpiList');

export const listFMKpiPortfolio = (portfolioId: number): Promise<FMKpiRaw> =>
  apiProcessor.get('fmKpiListPortfolio', portfolioId);

export const listFMKpiCompany = (companyId: number): Promise<FMKpiRawCompany> =>
  apiProcessor.get('fmKpiListCompany', companyId);

export const listPCKpi = (): Promise<PCKpiRaw> => apiProcessor.get('pcKpiList');
