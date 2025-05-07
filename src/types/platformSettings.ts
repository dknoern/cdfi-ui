export interface PlatformSetting {
  name: string;
  path: string;
  canArchive: boolean;
}

export interface SupportRequestSubject {
  id: number;
  subject: string;
  isEnabled?: boolean;
}

export type SupportRequestSubjectData = SupportRequestSubject & {
  key: React.Key;
};
