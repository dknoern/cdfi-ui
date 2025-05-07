import {
  CdfiEditFormData,
  Cdfi,
  OrgTag,
  State,
  ImpactArea,
  SubImpactArea,
} from 'types';

export type EditableCdfi = CdfiEditFormData & { id?: Cdfi['id'] };

export type SubImpactAreasType = {
  impactAreaId: number;
  subImpactAreas: string[];
};

export interface CdfiStaticData {
  states: State[];
  taxTypes: TaxType[];
  taxJurisdictions: TaxType[];
  shareFinancials: TaxType[];
  fiscalYearEnds: FiscalYearEnd[];
  impactAreas: ImpactArea[];
  subImpactAreas: SubImpactArea[];
  taxBeneficiaries: TaxType[];
  lendingTypes: TaxType[];
  startRequestingYears: StartRequestingYear[];
  startRequestingQuarters: StartRequestingQuarter[];
  tags: OrgTag[];
  organizationTypes: OrganizationType[];
  ratingSettings: RatingSettings;
}

interface RatingSettings {
  reviewTypes: string[];
  years: number[];
  quarters: number[];
  impactPerformancesAnnual: string[];
  impactPerformancesFull: string[];
  financialStrengthsAnnual: string[];
  financialStrengthsFull: string[];
}

interface OrganizationType {
  id: number;
  type: string;
  name: string;
  isEnabled: boolean;
}

interface StartRequestingQuarter {
  id: number;
  quarter: string;
}

interface StartRequestingYear {
  id: number;
  year: string;
}

interface FiscalYearEnd {
  key: number;
  name: string;
}

interface TaxType {
  id: number;
  name: string;
  isEnabled: boolean;
  enabled?: boolean;
}
