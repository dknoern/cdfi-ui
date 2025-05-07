import { Company, ViewModeConfig } from 'types';

// append URL with /portfolio/:id/company/:id
// or              /entity/:id/company/:id
export const suffixURLPath = (
  path: string,
  viewModeConfig: Partial<ViewModeConfig> & { entityId?: Company['id'] | null },
): string => {
  let usePath = path;

  const { portfolioId, companyId, fundManagerId, entityId } = viewModeConfig;

  if (portfolioId) {
    usePath += `/portfolio/${portfolioId}`;
  }

  if (entityId) {
    usePath += `/entity/${entityId}`;
  }

  if (companyId) {
    usePath += `/company/${companyId}`;
  }

  if (fundManagerId) {
    usePath += `/fundmanager/${fundManagerId}`;
  }

  return usePath;
};
