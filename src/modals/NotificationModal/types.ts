import { WithClass, VoidFn } from 'types';
import { ButtonType } from 'antd/lib/button';

export interface ButtonConfig extends WithClass {
  key: string;
  text: string;
  action: VoidFn;
  id?: string;
  type: ButtonType;
  danger?: boolean;
}
