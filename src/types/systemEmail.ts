import {MetricTypeConfig} from "./metric";
import {MetricSharePeriod} from "./metricSharePeriod";
import moment from "moment";

export interface IEmailCategory {
  id?: number;
  name: string;
  emailTemplateId?: number;
  dependentOn?: string & IEmailReminders;
  isEnabled: boolean;
}

export interface ISendTestEmail {
  email?: string,
  emailCategoryId: number | null,
  subject: string,
  text: string
}

export interface ISystemEmail {
  id: number;
  subject: string;
  text: string;
  recipientGroup: string;
  emailCategoryId: number | undefined;
  dependentOn: string | undefined | null;
  isBeforeDate: boolean;
  isEnabled: boolean;
  lastUpdated?: string;
  lastUpdatedBy?: string;
  numberOfDays: number;
  triggerType: string | undefined | null;
}

export interface ISystemEmailEdit {
  dependentOn: IEmailReminders;
  triggerType: IEmailTrigger;
  id: number;
  subject: string;
  text: string;
  recipientGroup: string;
  emailCategoryId: number;
  isBeforeDate: boolean;
  isEnabled: boolean;
  lastUpdated?: string;
  lastUpdatedBy?: string;
  numberOfDays: number;
  ccEmailList?: string[];
  bccEmailList?: string[];
  emailSenderId: string;
}

export type SystemEmailRecord = ISystemEmail & {
  key: number;
  frequency: MetricSharePeriod;
  typeConfig?: MetricTypeConfig;
};

export type SystemEmailRowItem = Pick<SystemEmailRecord, 'id'> &
  Partial<Omit<SystemEmailRecord, 'status'>>;


export enum SystemEmailColumns {
  EMAIL_CATEGORY_ID = 'emailCategoryId',
  SUBJECT = 'subject',
  LAST_UPDATED = 'lastUpdated',
  UPDATED_BY = 'lastUpdatedBy',
  ENABLED = 'isEnabled',
  CODE = 'code'
}

export interface IEmailReminders {
  reminderType: string;
  description: string;
}

export interface IEmailTrigger {
  triggerType: string;
  description: string;
}

export interface IEmailTemplates {
  id: number;
  fileName: string;
  description: string;
  dateCreated: string;
}

export interface IEmailTemplate {
  id?: number;
  fileName: string;
  templateBody?: string;
  defaultText?: string;
  dateCreated?: string;
}

export interface ISenderEmail {
  id: number | string,
  email: string,
  description?: string
}

export interface IEmailLogDetails {
  id?: number | string;
  code: string;
  recipientGroup?: string;
  dependentOn?: string & IEmailReminders;
  emailCategoryId?: number;
  numberOfDays?: number;
  isBeforeDate?: boolean;
  isEnabled?: boolean;
  triggerType?: IEmailTrigger;
  subject?: string;
  bccEmailList?: string[];
  ccEmailList?: string[];
  lastUpdated?: string;
  lastUpdatedBy?: string;
}

export interface IDateSentRange {
  from: string;
  to: string;
}
