import React, {
  FC,
  useCallback,
  useMemo,
  useEffect,
  useContext,
  useState,
} from 'react';
import { observer } from 'mobx-react';
import { Form } from 'antd';
import {
  LibraryFolder4Notifications,
  NotificationsConfig,
  SubscribedFolder,
} from 'types';
import { FormStep } from 'forms/PCCreate/types';
import { formStore } from 'forms/PCCreate/formStore';
import { stepContext } from 'forms/PCCreate/context';
import { stepIndexByKey } from 'forms/PCCreate/tools';
import { formName } from 'forms/PCCreate/constants';
import { NotificationsForm } from 'forms/NotificationsForm';
import { useLibraryFolders } from 'dataManagement';
import { generateFormId } from 'tools/formTools';

const CURRENT_STEP = FormStep.notificationsSetup;

const NotificationsSetupFn: FC = () => {
  const storeData = (formStore.data[CURRENT_STEP] as any) || {};

  const [form] = Form.useForm();

  const { state, dispatch: dispatchStep } = useContext(stepContext);

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goNext' });
  }, [dispatchStep]);

  const { forPC } = storeData;

  const [userNotificationsFolders, setUserNotificationsFolders] = useState<
    LibraryFolder4Notifications[]
  >([]);

  const { templateId, createFolders } =
    (formStore.data.librarySetup as any) || {};

  const { upcoming, pastDue, initial } = forPC || {};

  const { data: library, isLoading: isFoldersLoading } = useLibraryFolders(
    templateId,
  );

  useEffect(() => {
    if (isFoldersLoading) return;

    let activeFolders = [];
    const tableFolders = [
      ...(library?.folders ?? []),
      ...(createFolders ?? []),
    ];

    if ((storeData.forMe || {}).subscribedFolders) {
      activeFolders = storeData.forMe.subscribedFolders;
    } else {
      activeFolders = [...(library?.folders ?? []), ...(createFolders ?? [])];
    }

    const subscribedFolders: SubscribedFolder[] = activeFolders.map(
      (folder: any) => {
        return {
          id: folder.isSystemFolder ? folder.id : null,
          name: folder.name,
        };
      },
    );

    formStore.setData(CURRENT_STEP, {
      ...storeData,
      forMe: {
        subscribedFolders,
      },
    });

    const names = subscribedFolders.map((folder) => folder.name);

    const formattedTableFolders = tableFolders.map((folder: any) => {
      return {
        id: folder.isSystemFolder ? folder.id : null,
        name: folder.name,
        frequency: folder.frequency,
        parentFolderName: 'N/A',
        on: names.includes(folder.name) ?? false,
      };
    });

    setUserNotificationsFolders(formattedTableFolders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createFolders, library, isFoldersLoading]);

  const initialValues: Pick<NotificationsConfig, 'forPC'> = useMemo(() => {
    return {
      forPC: {
        initial,
        upcoming,
        pastDue,
      },
    };
  }, [pastDue, upcoming, initial]);

  useEffect(() => {
    dispatchStep({
      type: 'available',
      step: stepIndexByKey(FormStep.notificationsSetup),
    });
  }, [dispatchStep]);

  useEffect(() => {
    if (!forPC) {
      formStore.setData(CURRENT_STEP, {
        ...storeData,
        ...initialValues,
      });
    }
  }, [initialValues, forPC, storeData]);

  const onTableItemChange = useCallback(
    (name: string, parentFolderName: string) => {
      if (!userNotificationsFolders) return;
    },
    [userNotificationsFolders],
  );

  return (
    <NotificationsForm
      form={form}
      id={generateFormId(formName, state.step)}
      initialValues={initialValues}
      onFinish={handleNextClick}
      onValuesChange={(_, values): void => {
        formStore.setData(CURRENT_STEP, {
          ...storeData,
          ...form.getFieldsValue(),
        });
      }}
      userNotificationsFolders={userNotificationsFolders}
      onTableItemChange={onTableItemChange}
      contacts={formStore.contacts}
    />
  );
};

export const NotificationsSetup = observer(NotificationsSetupFn);
