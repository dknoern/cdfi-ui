import { User } from './user';
import { Company } from './company';

export type FlowState = 'IDLE' | 'PROCESSING' | 'CODE_RECEIVED';

type FormDataBase = {
  phone: User['phone'];
  category: string;
  description: string;
  accountId?: Company['id'];
};
export type FormDataLogged = FormDataBase;
export type FormDataNotLogged = FormDataBase &
  Pick<User, 'name' | 'surname' | 'email'>;
export type FormData = FormDataLogged | FormDataNotLogged;

export type RequestData =
  | FormDataNotLogged
  | (FormDataLogged & { userId: User['id'] });

export type RequestResult = {
  requestId: string;
};
