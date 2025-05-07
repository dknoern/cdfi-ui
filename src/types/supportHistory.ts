import { UserSimple } from "./user";

export interface SupportHistory {
  id: number;
  dateRequested: string;
  requester: UserSimple;
  subject: string;
  inquiry: string;
}

export type SupportHistoryData = SupportHistory & {
  key: React.Key;
};
