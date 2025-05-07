import { UserSimple } from './user';

export interface CustomDataReport {
  id: number;
  contact: UserSimple;
  generator: UserSimple;
  requester: UserSimple;
  status: string;
  recipients: string[];
  dateRequested: string;
  dateGenerated: string;
  expirationDate: string;
  name: string;
  description: string;
  dataPoints: string;
}

export type CustomDataReportData = CustomDataReport & {
  key: React.Key;
};
