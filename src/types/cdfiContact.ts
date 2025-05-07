import { PersonRole } from "./auth";

export interface CdfiContact {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  phoneExtension: string;
  title: string;
  dateCreated: Date;
  isActive: boolean;
  enabled: boolean;
  role: PersonRole.ANALYST;
  fullName: string;
  uploadReminders: boolean;
  isPublicContact: boolean;
}

export type CdfiContactEditFormData = Pick<
  CdfiContact,
  | 'id'
  | 'email'
  | 'username'
  | 'phone'
  | 'phoneExtension'
  | 'firstName'
  | 'lastName'
  | 'title'
  | 'dateCreated'
  | 'isActive'
  | 'enabled'
  | 'role'
  | 'fullName'
  | 'uploadReminders'
  | 'isPublicContact'
>;
