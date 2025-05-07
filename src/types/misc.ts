import { FMCompany, Cdfi } from 'types';
import { Company } from './company';
import { Investment } from './investment';
import { Portfolio } from './portfolio';
import { Subscriber } from './subscriber';
import { Nullable } from './utility';

export interface FormStepObject {
  key: number | string;
  title: string;
  component: React.ReactNode;
}

export type TableIconType = 'folder' | 'sub-folder' | 'branch';

export type SortOrder = 'ascend' | 'descend';

export type ViewMode =
  | 'GLOBAL'
  | 'PORTFOLIO'
  | 'INVESTMENT'
  | 'FUNDMANAGER'
  | 'ENTITY'
  | 'CDFI'
  | 'SUBSCRIBER';

export interface ViewModeConfig {
  entityId?: null | Company['id'];
  companyId: null | Investment['id'];
  portfolioId: null | Portfolio['id'];
  fundManagerId?: null | FMCompany['id'];
  cdfiId?: null | Cdfi['id'];
  subscriberId?: null | Subscriber['id'];
}

export type WithClass<T = {}> = T & {
  className?: string;
};

export interface VoidFn {
  (...args: any): void;
}

export type SortResult = -1 | 0 | 1;
export interface SorterFn<ItemType = any> {
  (a: ItemType, b: ItemType): SortResult;
}

// by default we use "order" field
export interface SortableItem {
  order: Nullable<number>;
}

export type SelectOptions<ValueType = number> = {
  label: string;
  value: ValueType;
}[];

export interface CustomAntInput<ValueType> {
  value?: ValueType;
  onChange?: (value: ValueType) => void;
}

export type Size = {
  width: number;
  height: number;
};
