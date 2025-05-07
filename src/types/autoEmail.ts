export interface AutoEmailI {
  subject: string;
  text: string;
  recipientGroup: string;
  emailLogId: number;
  recipientList: string;
  dateSent: Date;
}
export interface AutoEmailsI {
  content: AutoEmailI[];
  totalElements: number;
}
