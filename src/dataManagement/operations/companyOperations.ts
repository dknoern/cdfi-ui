import { apiProcessor } from 'tools/apiProcessor';
import { Company, Tag } from 'types';

// specific only for ReportingEntities (Company type) for now
// other types return full tag objects
type CompaniesItemVM = Omit<Company, 'tags'> & { tags: Tag['id'][] };

export const listCompanies = (): Promise<CompaniesItemVM[]> => {
  return apiProcessor.get('companiesAll');
};
