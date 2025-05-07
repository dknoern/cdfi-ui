import { CompanyInfoBase, Investment, Tag, User } from 'types';

export type REContact = Omit<User, 'fullName' | 'role' | 'notes'>;
export type REContactFormData = Omit<
  REContact,
  'primary' | 'enabled' | 'id'
> & {
  id?: REContact['id'];
};

export type ReportingEntity = CompanyInfoBase & {
  id: number;
  tags: Tag['id'][];
  contacts: REContact[];
  investmentsInfo: Investment[];
};

export type REEditFormData = Omit<ReportingEntity, 'id'> & {
  id?: ReportingEntity['id'];
};
