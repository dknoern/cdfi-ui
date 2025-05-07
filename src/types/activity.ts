import {Company} from './company';
import {User} from "./user";

export interface ActivityBase {
  id: string;
  plainSummary: string;
  firstName: string;
  lastName: string;
  company: Company['name'];
}

export type Activity = ActivityBase;

export type ActivityModel = {
  activityId?: number;
  person?: User | undefined;
  companyId: number | undefined;
  quarter: number;
  year: number;
  description?: string | undefined;
  documentId?: number | undefined;
  date?: string | undefined;
  activityType: string | undefined;
};
