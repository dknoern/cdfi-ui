import React, { ReactNode } from 'react';
import { Button, Typography } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ColumnProps } from 'antd/lib/table';
import { SubscriptionCdfi, SubscriberSubscriptionEditFormData } from 'types';
import { getSubscriberSubscription } from 'dataManagement/operations/subscriberOperations';
import moment from 'moment';
import styles from './makeSubscriberContactsColumns.module.scss';
import { subscriberStore } from '../../../../store';

const { Paragraph } = Typography;

const transformCdfis = (cdfis: any): SubscriptionCdfi[] => {
  const transformedCdfis = cdfis?.map((cdfi: any) => {
    const newCdfi: SubscriptionCdfi = {
      id: cdfi.id,
      active: cdfi.active,
      companyType: cdfi.companyType,
      name: cdfi.name,
    };
    return newCdfi;
  });
  return transformedCdfis;
};

const containsCdfi = (
  cdfi: SubscriptionCdfi,
  cdfis: SubscriptionCdfi[],
): boolean => {
  let hasCdfi = false;
  cdfis.forEach((c) => {
    if (c.id === cdfi.id) {
      hasCdfi = true;
    }
  });
  return hasCdfi;
};

const getCfdis = (subscription: any): SubscriptionCdfi[] => {
  let cdfis = transformCdfis(subscription.cdfisRatingReports).concat(
    transformCdfis(subscription.cdfisPerformanceMaps).concat(
      transformCdfis(subscription.cdfisPeerGroups).concat(
        transformCdfis(subscription.cdfisFactSheets).concat(
          transformCdfis(subscription.cdfisLibrary).concat(
            transformCdfis(subscription.cdfisImpactManagementReports),
          ),
        ),
      ),
    ),
  );

  let result: SubscriptionCdfi[] = [];

  cdfis.forEach((cdfi) => {
    if (!containsCdfi(cdfi, result)) {
      result.push(cdfi);
    }
  });

  return result;
};

export const makeSubscriberSubscriptionsColumns = (
  subscriberId: number,
  setEditingSubscriberSubscription: (
    subscription: SubscriberSubscriptionEditFormData | undefined,
  ) => void,
  setDeleteSubscriptionId: (subscriptionId: number | undefined) => void,
): ColumnProps<SubscriberSubscriptionEditFormData>[] => {
  const { setIsConfirmModal, setDeleteSubscriberId } = subscriberStore;

  const onEditClick = (subscriberId: number, subscriptionId: number) => () => {
    setEditingSubscriberSubscription(undefined);

    getSubscriberSubscription(subscriberId, subscriptionId).then((data) => {
      data.cdfisRatingReports = transformCdfis(data.cdfisRatingReports);
      data.cdfisPerformanceMaps = transformCdfis(data.cdfisPerformanceMaps);
      data.cdfisPeerGroups = transformCdfis(data.cdfisPeerGroups);
      data.cdfisFactSheets = transformCdfis(data.cdfisFactSheets);
      data.cdfisLibrary = transformCdfis(data.cdfisLibrary);
      data.cdfisImpactManagementReports = transformCdfis(
        data.cdfisImpactManagementReports,
      );
      data.expirationDate = moment(data?.expirationDate, 'MM/DD/YYYY');
      data.startDate = data?.startDate
        ? moment(data?.startDate, 'MM/DD/YYYY')
        : undefined;
      data.notes = data?.notes ? data.notes : '';
      setEditingSubscriberSubscription(data);
    });
  };

  return [
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      width: '120px',
      sorter: (a, b): number => {
        // @ts-ignore
        return new Date(b.startDate) - new Date(a.startDate);
      },
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expirationDate',
      width: '120px',
      sorter: (a, b): number => {
        // @ts-ignore
        return new Date(b.expirationDate) - new Date(a.expirationDate);
      },
    },
    {
      title: 'CDFIs',
      dataIndex: 'cdfis',
      width: '250px',
      render: (cdfis, row): ReactNode => (
        <>
          {getCfdis(row)
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((cdfi: SubscriptionCdfi, index: number) => {
              return <p key={cdfi.name + index}>{cdfi.name}</p>;
            })}
        </>
      ),
    },
    {
      title: 'Subscription Details',
      dataIndex: 'accessList',
      width: '250px',
      render: (accessList, row): ReactNode => (
        <>
          {accessList.map((access: string, index: number) => {
            return (
              <p key={access + index}>
                <em>
                  {access === 'Fact sheets' ? 'CDFI Fact sheets' : access}
                </em>
              </p>
            );
          })}
        </>
      ),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      width: '200px',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      width: '90px',
      render: (text: string, record: any) => (
        <Paragraph
          className={`${styles.accountStatus} ${styles.accountStatusContacts}`}
        >
          <span className={record?.active ? styles.on : '$'} />
          {record?.active ? 'Active' : 'Inactive'}
        </Paragraph>
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      align: 'right',
      width: '100px',
      render: (value, subscription): ReactNode => (
        <>
          <Button
            type="link"
            onClick={onEditClick(subscriberId, subscription.id)}
            name="edit"
            value={subscription.id}
            icon={<EditFilled />}
            title="Edit subscription"
          />
          <Button
            type="link"
            name="delete"
            value={subscription.id}
            icon={<DeleteFilled />}
            title="Delete subscription"
            onClick={() => {
              setDeleteSubscriberId(subscription.id);
              setIsConfirmModal(true);
            }}
          />
        </>
      ),
    },
  ];
};
