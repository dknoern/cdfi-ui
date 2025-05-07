import { PersonRole } from './auth';

export interface SubscriberContact {
  id: number;
  firstName: string;
  dateCreated?: Date;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  phoneExtension: string;
  title: string;
  isActive: boolean;
  enabled: boolean;
  role: PersonRole.ANALYST;
  fullName: string;
  emailReminders: boolean;
  uploadReminders: boolean;
}

export type SubscriberContactEditFormData = Pick<
  SubscriberContact,
  | 'id'
  | 'email'
  | 'username'
  | 'phone'
  | 'phoneExtension'
  | 'dateCreated'
  | 'firstName'
  | 'lastName'
  | 'title'
  | 'isActive'
  | 'enabled'
  | 'role'
  | 'fullName'
  | 'emailReminders'
  | 'uploadReminders'
>;
