import { RouteComponentProps } from 'react-router-dom';
import { ViewModeConfig } from 'types/misc';

export const path2ViewModeConfig = (path: string): ViewModeConfig => {
  const config: ViewModeConfig = {
    companyId: null,
    portfolioId: null,
    fundManagerId: null,
    entityId: null,
    cdfiId: null,
  };

  const checkPortfolio = /portfolio\/(\d+)/i.exec(path);
  if (checkPortfolio) {
    config.portfolioId = Number(checkPortfolio[1]);
  }

  // TODO fix naming (company->investment)
  const checkInvestment = /company\/(\d+)/i.exec(path);
  if (checkInvestment) {
    config.companyId = Number(checkInvestment[1]);
  }

  const checkRE = /entity\/(\d+)/i.exec(path);
  if (checkRE) {
    config.entityId = Number(checkRE[1]);
  }

  const checkFundManager = /fundmanager\/(\d+)/i.exec(path);
  if (checkFundManager) {
    config.fundManagerId = Number(checkFundManager[1]);
  }

  const checkSelectedCdfi = /cdfi\/(\d+)/i.exec(path);
  if (checkSelectedCdfi) {
    config.cdfiId = Number(checkSelectedCdfi[1]);
  }

  const checkSelectedSubscriber = /subscriber\/(\d+)/i.exec(path);
  if (checkSelectedSubscriber) {
    config.subscriberId = Number(checkSelectedSubscriber[1]);
  }

  return config;
};

export const location2ViewModeConfig = (
  location: RouteComponentProps['location'],
): ViewModeConfig => {
  return path2ViewModeConfig(location.pathname);
};
