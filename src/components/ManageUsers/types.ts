import { UserEditFormData, User, Company } from 'types';

export type EditableUser = UserEditFormData & { id?: User['id'] };

export type WithFMIdProps = {
  fmId: Company['id'];
};

export type WithFMIdAndCompanyTypeProps = {
  fmId: Company['id'];
  companyType: Company['type'];
};
