export interface RootObject {
    states: State[];
    taxTypes: TaxType[];
    taxJurisdictions: TaxType[];
    shareFinancials: TaxType[];
    fiscalYearEnds: FiscalYearEnd[];
    impactAreas: TaxType[];
    subImpactAreas: SubImpactArea[];
    taxBeneficiaries: TaxType[];
    lendingTypes: TaxType[];
    startRequestingYears: StartRequestingYear[];
    startRequestingQuarters: StartRequestingQuarter[];
    tags: Tag[];
    organizationTypes: OrganizationType[];
    ratingSettings: RatingSettings;
  }
  
  export type RatingSettings = {
    reviewTypes: string[];
    years: number[];
    quarters: number[];
    impactPerformancesAnnual: string[];
    impactPerformancesFull: string[];
    financialStrengthsAnnual: string[];
    financialStrengthsFull: string[];
  }
  
  export type OrganizationType = {
    id: number;
    type: string;
  }
  
  export type Tag = {
    id: number;
    name: string;
    category: string;
  }
  
  export type StartRequestingQuarter = {
    id: number;
    quarter: string;
  }
  
  export type StartRequestingYear = {
    id: number;
    year: string;
  }
  
  export type SubImpactArea = {
    id: number;
    name: string;
    impactArea: number;
    isEnabled: boolean;
  }
  
  export type FiscalYearEnd = {
    key: number;
    name: string;
  }
  
  export type TaxType = {
    id: number;
    name: string;
    isEnabled: boolean;
  }
  
  export type State = {
    id: number;
    name: string;
    code: string;
    isEnabled: boolean;
  }

  export type GlobalListEditValueType = {
    id: number;
    key: number;
    name: string;
    isEnabled: boolean;
  }