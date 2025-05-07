import { apiProcessor } from 'tools/apiProcessor';
import { Company } from 'types';

export const listCompanies = (): Promise<Company[]> => {
  return apiProcessor.get('pcCompaniesList');
};
