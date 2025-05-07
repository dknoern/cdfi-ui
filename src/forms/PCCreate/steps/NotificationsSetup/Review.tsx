import React, { useMemo } from 'react';
import { LibraryFolder4Notifications, SubscribedFolder } from 'types';
import { useLibraryFolders } from 'dataManagement';
import { formStore } from 'forms/PCCreate/formStore';
import { FormStep } from 'forms/PCCreate/types';
import { NotificationsForm } from 'forms/NotificationsForm';

const CURRENT_STEP = FormStep.notificationsSetup;

const FORM_ID = 'notificationsSetupReview';

export default (): JSX.Element => {
  const { forMe, forPC } = (formStore.data[CURRENT_STEP] as any) || {};

  const { templateId, createFolders } =
    (formStore.data.librarySetup as any) || {};
  const { data: library } = useLibraryFolders(templateId);

  const { upcoming, pastDue, initial } = forPC || {};

  const userNotificationsFolders = useMemo(() => {
    if (!forMe || !forMe.subscribedFolders) return [];

    const names = (forMe.subscribedFolders as SubscribedFolder[]).map(
      (folder) => folder.name,
    );

    const formattedTableFolders: LibraryFolder4Notifications[] = [
      ...(library?.folders ?? []),
      ...createFolders,
    ]
      .filter((folder) => names.includes(folder.name))
      .map((folder) => {
        return {
          id: folder.isSystemFolder ? folder.id : null,
          name: folder.name,
          frequency: folder.frequency,
          parentFolderName: 'N/A',
          on: true,
          disabled: true,
        };
      });

    return formattedTableFolders;
  }, [createFolders, library, forMe]);

  return (
    <NotificationsForm
      id={FORM_ID}
      initialValues={{
        forPC: {
          initial,
          upcoming,
          pastDue,
        },
      }}
      userNotificationsFolders={userNotificationsFolders}
      editable={false}
      contacts={formStore.contacts}
    />
  );
};
