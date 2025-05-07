export interface IGlobalGraph {
  id: number;
  active: boolean;
  title: string;
  code: string;
  graphType: string;
  unitType: string;
  showInterim: boolean;
  showPeriodNumber: number;
  showPeriodType: string;
  notes: string;
  companies: [];
}

export interface IGlobalGraphEdit {
  id: number;
  active: boolean;
  title: string;
  code: string;
  graphType: string;
  unitType: string;
  showInterim: boolean;
  showPeriodNumber: number;
  showPeriodType: string;
  notes: string;
}
