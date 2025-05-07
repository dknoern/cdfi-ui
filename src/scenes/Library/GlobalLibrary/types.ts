import { Company } from 'types';

export type GlobalLibraryTableRow = {
  id: number;
  name: string;
  pcCompanies: GlobalLibraryCompany[];
};

export type GlobalLibraryCompany = Pick<Company, 'id' | 'name'>;
