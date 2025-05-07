import { PersonRole } from 'types/auth';

export interface User {
  id: number;
  name: string;
  surname: string;
  firstName: string;
  lastName: string;
  dateCreated?: Date;
  email: string;
  phone: string;
  title: string;
  fullName: string;
  primary: boolean;
  enabled?: boolean;
  role: PersonRole;
  notes: string;
  isActive: boolean;
  username: string;
}

export type UserEditFormData = Pick<
  User,
  | 'name'
  | 'surname'
  | 'title'
  | 'email'
  | 'dateCreated'
  | 'phone'
  | 'enabled'
  | 'role'
  | 'notes'
  | 'firstName'
  | 'lastName'
  | 'isActive'
>;

export interface UserSimple {
  id: number;
  firstName: string;
  lastName: string;
}
