import { FundManagerUpdate } from 'types';
import { companyInfoBaseInitialValue } from 'forms/constants';

export const FMCreateDefaultValues: FundManagerUpdate = Object.assign(
  {
    phone: '',
    description: '',
    fiscalYearEnd: 2,
  },
  companyInfoBaseInitialValue,
);

export enum ActionValue {
  ENTER_WEBFORM = 'Enter webform',
  QUARTERLY_UPLOAD = 'Quarterly upload',
  QUARTERLY_FINANCIALS = 'Quarterly financials',
}
