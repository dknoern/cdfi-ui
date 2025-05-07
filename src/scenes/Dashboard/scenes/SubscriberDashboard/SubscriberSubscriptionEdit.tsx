import React, { FC, useCallback, useState } from 'react';
import { SubscriberSubscriptionEditFormData, SubscriptionCdfi } from 'types';
import { ModalWithForm } from 'modals';
import { subscriberStore } from 'store';
import { SubscriberSubscriptionEditForm } from 'forms/SubscriberSubscriptionEdit';
import {
  createSubscriberSubscription,
  updateSubscriberSubscription,
} from './tools/operations';
import { Form } from 'antd';
import moment from 'moment';
import { useCdfis } from 'dataManagement/useCdfis';
import { MODAL_WIDTH } from 'constants/ui';
import { ConfirmCancelModal } from './ConfirmModal/ConfirmCancelModal';

type SubscriberSubscriptionEditProps = {
  initialValues: SubscriberSubscriptionEditFormData | null | undefined;
  setInitialValues: (
    subscription: SubscriberSubscriptionEditFormData | undefined,
  ) => void;
};

export const SubscriberSubscriptionEdit: FC<
  SubscriberSubscriptionEditProps
> = ({ initialValues, setInitialValues }) => {
  const { subscriberId } = subscriberStore;
  const [isConfirmModalVisible, setConfirmModalVisibility] = useState(false);

  const showConfirmModal = () => {
    setConfirmModalVisibility(true);
  };

  const handleConfirmCancel = () => {
    showConfirmModal();
  };

  const [isAtLeastOneCheckboxChecked, setIsAtLeastOneCheckboxChecked] =
    useState(false);

  const [form] = Form.useForm();

  const close = (): void => {
    setInitialValues(undefined);
    setConfirmModalVisibility(false);
  };

  const { data: cdfis } = useCdfis();

  const transformCdfis = (cdfiArray: any): SubscriptionCdfi[] => {
    let newCdfis = [];
    if (cdfiArray) {
      if (!Number.isInteger(cdfiArray[0])) {
        newCdfis = cdfiArray.map((cdfi: string) => {
          if (cdfis) {
            for (let i = 0; i < cdfis?.length; ++i) {
              if (cdfis[i]?.name === (cdfi as unknown as string)) {
                return cdfis[i]?.id;
              }
            }
          }
        });
      }
    }
    return newCdfis as unknown as SubscriptionCdfi[];
  };

  const saveHandler = useCallback(
    (values: any) => {
      const { allCdfisRatingReports } = subscriberStore;
      if (!initialValues) return;

      let proceedSave;

      if (initialValues?.id) {
        let newUpdateData = values;
        newUpdateData.expirationDate = moment(values.expirationDate).format(
          'YYYY-MM-DD',
        );

        if (values.startDate !== undefined) {
          newUpdateData.startDate = moment(values.startDate).format(
            'YYYY-MM-DD',
          );
        }

        newUpdateData.cdfisRatingReports = transformCdfis(
          values.cdfisRatingReports,
        );
        newUpdateData.cdfisPerformanceMaps = transformCdfis(
          values.cdfisPerformanceMaps,
        );
        newUpdateData.cdfisPeerGroups = transformCdfis(values.cdfisPeerGroups);
        newUpdateData.cdfisFactSheets = transformCdfis(values.cdfisFactSheets);
        newUpdateData.cdfisLibrary = transformCdfis(values.cdfisLibrary);
        newUpdateData.cdfisImpactManagementReports = transformCdfis(
          values.cdfisImpactManagementReports,
        );

        newUpdateData.subscriptionType = 'MULTIPLE';

        proceedSave = (): ReturnType<typeof updateSubscriberSubscription> =>
          updateSubscriberSubscription(
            subscriberId,
            initialValues.id,
            newUpdateData,
          );
      } else {
        const activeCdfis = cdfis?.filter((cdfi) => cdfi.active);
        const activeCdfisData = activeCdfis?.map((cdfi) => {
          const newCdfi: SubscriptionCdfi = {
            id: cdfi.id,
            active: cdfi.active,
            name: cdfi.name,
            companyType: 'CDFI',
          };
          return newCdfi;
        });

        let newCreateData = values;

        newCreateData.expirationDate = moment(values.expirationDate).format(
          'YYYY-MM-DD',
        );

        newCreateData.startDate = moment(values.startDate).format('YYYY-MM-DD');

        const getNewCdfis = (values: string | string[]) => {
          if (values === undefined) {
            return;
          }
          // @ts-ignore
          return activeCdfisData.reduce((acc, item) => {
            if (values.includes(item.name)) {
              // @ts-ignore
              acc.push(item.id);
            }
            return acc;
          }, []);
        };

        newCreateData.subscriptionType = 'MULTIPLE';
        newCreateData.cdfisRatingReports = getNewCdfis(
          values.cdfisRatingReports,
        )
          ? getNewCdfis(values.cdfisRatingReports)
          : [];
        newCreateData.cdfisPerformanceMaps = getNewCdfis(
          values.cdfisPerformanceMaps,
        )
          ? getNewCdfis(values.cdfisPerformanceMaps)
          : [];
        newCreateData.cdfisPeerGroups = getNewCdfis(values.cdfisPeerGroups)
          ? getNewCdfis(values.cdfisPeerGroups)
          : [];
        newCreateData.cdfisFactSheets = getNewCdfis(values.cdfisFactSheets)
          ? getNewCdfis(values.cdfisFactSheets)
          : [];
        newCreateData.cdfisLibrary = getNewCdfis(values.cdfisLibrary)
          ? getNewCdfis(values.cdfisLibrary)
          : [];
        newCreateData.cdfisImpactManagementReports = getNewCdfis(
          values.cdfisImpactManagementReports,
        )
          ? getNewCdfis(values.cdfisImpactManagementReports)
          : [];

        proceedSave = (): ReturnType<typeof createSubscriberSubscription> =>
          createSubscriberSubscription(subscriberId, newCreateData);
      }

      proceedSave().then(close);
      setIsAtLeastOneCheckboxChecked(false);
    },
    [close, initialValues],
  );

  const FORM_ID = initialValues?.id
    ? 'SUBSCRIBER_SUBSCRIPTION_EDIT'
    : 'SUBSCRIBER_SUBSCRIPTION_CREATE';

  return (
    <>
      <ModalWithForm
        visible={initialValues !== undefined}
        onCancel={handleConfirmCancel}
        formId={FORM_ID}
        forceRender={false}
        title={
          initialValues?.id ? 'Update Subscription' : 'Create New Subscription'
        }
        actionButtonText={initialValues?.id ? 'Update' : 'Save'}
        actionButtonDisabled={!isAtLeastOneCheckboxChecked}
        width={MODAL_WIDTH.MEDIUM}
        maskClosable={false}
      >
        {!!initialValues !== undefined && (
          <SubscriberSubscriptionEditForm
            initialValues={initialValues ?? {}}
            onFinish={saveHandler}
            formId={FORM_ID}
            form={form}
            onCancel={handleConfirmCancel}
            setIsAtLeastOneCheckboxChecked={setIsAtLeastOneCheckboxChecked}
            actionButtonDisabled={!isAtLeastOneCheckboxChecked}
            actionButtonText={initialValues?.id ? 'Update' : 'Save'}
          />
        )}
      </ModalWithForm>
      <ConfirmCancelModal
        visible={isConfirmModalVisible}
        onClose={(): void => setConfirmModalVisibility(false)}
        onClick={close}
        text="Do you really want to cancel? All data entered will be lost."
        buttonText="Yes"
      />
    </>
  );
};
