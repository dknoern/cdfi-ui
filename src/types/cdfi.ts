export interface Cdfi {
  id: number;
  name: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  areasServed: State[];
  companyType: string;
  description: string;
  fax: string;
  phone: string;
  phoneExtension: string;
  ratedSince: string;
  website: string;
  fiscalYearEnd: string;
  otherLendingTypes: string[];
  primaryLendingTypes: string[];
  assetSize: string;
  ein: string;
  organizationType: string;
  taxType: string;
  targetBeneficiaries: string[];
  tags: OrgTag[];
  hideActivity: boolean;
  reportAllRows: boolean;
  active: boolean;
  rated: boolean;
  taxJurisdiction: string;
  shareFinancials: string;
  peerGroupAllowed: boolean;
  suppressReminders: boolean;
  mission: string;
  impactAreas: ImpactArea[] | string[];
  subImpactAreas: SubImpactArea[] | string[];
  startRequestingYear: string;
  startRequestingQuarter: string;
  emailReminders: string;
  logoDocumentId:number;
}

export type OrgTag = {
  id: number,
  name: string;
  category: string;
};

export interface State {
  id: number;
  name: string;
  code: string;
  isEnabled: boolean;
  enabled?: boolean;
}

export interface ImpactArea {
  id: number;
  name: string;
  isEnabled: boolean;
}

export interface SubImpactArea {
  id: number;
  name: string;
  impactArea: number;
  isEnabled: boolean;
}

export type CdfiEditFormData = Pick<
Cdfi,
  | 'name'
  | 'address'
  | 'address2'
  | 'city'
  | 'state'
  | 'zip'
  | 'areasServed'
  | 'companyType'
  | 'description'
  | 'fax'
  | 'phone'
  | 'ratedSince'
  | 'website'
  | 'fiscalYearEnd'
  | 'otherLendingTypes'
  | 'primaryLendingTypes'
  | 'assetSize'
  | 'ein'
  | 'organizationType'
  | 'taxType'
  | 'targetBeneficiaries'
  | 'tags'
  | 'country'
  | 'phoneExtension'
  | 'hideActivity'
  | 'reportAllRows'
  | 'active'
  | 'rated'
  | 'taxJurisdiction'
  | 'shareFinancials'
  | 'peerGroupAllowed'
  | 'suppressReminders'
  | 'mission'
  | 'impactAreas'
  | 'subImpactAreas'
  | 'startRequestingYear'
  | 'startRequestingQuarter'
  | 'emailReminders'
>;

export enum TitleCDFIEnum {
  MY_CDFIS = 'My CDFIs',
  SUBSCRIBER_CDFIS = 'Subscriber CDFIs',
}
