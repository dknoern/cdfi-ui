import { apiProcessor } from 'tools/apiProcessor';
import {
  FMCompany,
  CompanyType,
  FundManagerUpdate,
  CompanyInfoBase,
} from 'types';

export const listCompanies = (): Promise<FMCompany[]> => {
  return Promise.resolve([]);
  //return apiProcessor.get('fmCompaniesList');
};

export const getCompany = (companyId: number): Promise<FMCompany> => {
  return apiProcessor.get('fmCompany', companyId);
};

export const createCompany = (data: FundManagerUpdate): Promise<void> => {
  return apiProcessor.post('fmCompanyCreate', null, {
    ...data,
    type: CompanyType.FUND_MANAGER_COMPANY,
  });
};

export const updateCompany = (
  companyId: number,
  data: FundManagerUpdate,
): Promise<void> => {
  return apiProcessor.patch('fmCompanyUpdate', companyId, {
    ...data,
    active: true,
  });
};

export const deleteCompany = (companyId: number): Promise<void> => {
  return apiProcessor.delete('fmCompanyDelete', companyId);
};

export const updateMyCompany = (data: any): Promise<void> => {
  return apiProcessor.patch('myFMCompanyUpdate', 0, data);
};

export const getMyCompany = (): Promise<CompanyInfoBase> => {
  return apiProcessor.get('myFMCompany');
};
