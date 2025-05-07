import { Company, Contact, TagGroup } from 'types';
import { initialValues } from 'forms/PCCreate/steps/CompanyInfo/constants';
import { GeneralInfoFormModel, GeneralInfoModel } from './types';
import tagsStyles from '../shared/Tags/Tags.module.scss';

export const makeInitialValues = (
  company: Company | null,
): GeneralInfoFormModel => {
  if (!company) return initialValues;

  const {
    name,
    description,
    fiscalYearEnd,
    investmentType,
    totalInvestments,
    investmentNumValue,
    investmentEndDate,
    investmentStartDate,
    contacts,
    tags,
    address,
    reportingStartDate,
  } = company;

  const companyAddress = address ?? {}; // possible null from BE

  return {
    name,
    description: description ?? '',
    fiscalYearEnd,
    investmentType: investmentType ?? 'NONE',
    investment: totalInvestments ? investmentNumValue : undefined,
    investmentLife: {
      start: investmentStartDate,
      maturity: investmentEndDate,
    },
    tags: tags.map((item) => item.id),
    address: {
      city: companyAddress.city ?? '',
      country: companyAddress.country ?? '',
      state: companyAddress.state ?? '',
      street: companyAddress.street ?? '',
      zipCode: companyAddress.zipCode ?? '',
    },
    primaryContact: contacts.find((item) => item.primary) as Contact,
    additionalContacts: contacts.filter((item) => !item.primary),
    reportingStartDate,
  };
};

export const tagsFilterFn = (inputValue: string, treeNode: any): boolean => {
  return treeNode.title.props.children
    .toLowerCase()
    .includes(inputValue.toLowerCase());
};

export const getTagClassName = (group?: TagGroup): string => {
  switch (group) {
    case TagGroup.irisplus:
      return tagsStyles.irisTag;
    case TagGroup.sdgs:
      return tagsStyles.sdgTag;
    case TagGroup.custom:
    default:
      return tagsStyles.customTag;
  }
};

export const prepareDataForSave = (
  data: GeneralInfoFormModel,
): GeneralInfoModel => {
  const {
    name,
    description,
    address,
    fiscalYearEnd,
    investmentType,
    investment,
    investmentLife,
    primaryContact,
    additionalContacts,
    tags,
    reportingStartDate,
  } = data;

  return {
    name,
    description: description ?? '',
    fiscalYearEnd: Number(fiscalYearEnd),
    investmentType,
    investment: Number(investment),
    investmentLife: {
      start: investmentLife.start ?? '',
      maturity: investmentLife.maturity ?? '',
    },
    address,
    tags,
    reportingStartDate,
    contacts: [
      { ...primaryContact, primary: true },
      ...additionalContacts.map(
        ({ id, name: contactName, surname, email, title }) => ({
          id,
          name: contactName,
          surname,
          email,
          title,
        }),
      ),
    ],
  };
};
