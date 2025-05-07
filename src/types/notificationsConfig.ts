import { Folder } from 'types/library';

type Switchable<T = {}> = T & {
  on: boolean;
};

interface PCNotification {
  email: string;
  message: string;
}

export type LibraryFolder4Notifications = Switchable<{
  id: Folder['id'] | null;
  parentFolderName: Folder['name'];
  name: Folder['name'];
  frequency: Folder['frequency'];
}>;

export type SubscribedFolder = {
  id: Folder['id'] | null;
  name: Folder['name'];
};

// for FM user
type UserNotificationsConfig = {
  subscribedFolders: SubscribedFolder[];
};

type PCNotificationsConfig = {
  initial: PCNotification & { date: string };
  upcoming: Switchable<PCNotification & { dayCount: number }>;
  pastDue: Switchable<PCNotification>;
};

export type NotificationsConfig = {
  forPC: PCNotificationsConfig;
  forMe: UserNotificationsConfig;
};
