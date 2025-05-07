import { Nullable } from 'types/utility';
import { Company, Portfolio } from 'types';

type RedirectLinkQueryParams = {
  companyId: Nullable<Company['id']>;
  portfolioId: Nullable<Portfolio['id']>;
};

export const makeLibraryLink = ({
  companyId,
  portfolioId,
}: RedirectLinkQueryParams): string =>
  `/libraries${
    portfolioId ? `/portfolio/${portfolioId}` : ''
  }/company/${companyId}`;
