import React, { ReactNode } from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import { AllSubscribers } from 'types/allSubscribers';
import { ColumnType } from 'antd/lib/table';
import styles from './AllSubscribersManage.module.scss';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { getSubscriberSubscription } from 'dataManagement/operations/subscriberOperations';
import moment from 'moment';
import { SubscriberSubscriptionEditFormData, SubscriptionCdfi } from 'types';
import { subscriberStore } from 'store';
import { AlignType } from 'rc-table/lib/interface';

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

export const allSubscribersManageColumns = (
  setEditingSubscriberSubscription: (
    subscription: SubscriberSubscriptionEditFormData | undefined,
  ) => void,
): ColumnType<AllSubscribers>[] => {
  const { setSubscriberId } = subscriberStore;
  const onEditClick = (subscriberId: number, subscriptionId: number) => () => {
    setEditingSubscriberSubscription(undefined);
    setSubscriberId(subscriberId);
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
      console.log(subscriberId);
    });
  };

  return [
    {
      width: 280,
      key: 'name',
      title: 'Subscriber Name',
      dataIndex: 'name',
      sorter: true,
      render: (value, subscription): ReactNode => (
        <>
          <Button
            type="link"
            onClick={onEditClick(
              subscription.subscriberId,
              subscription.subscriptionId,
            )}
            name="edit"
            value={subscription.subscriberId}
            icon={<EditFilled />}
            key={`edit-${subscription.subscriptionId}`}
            title="Edit subscription"
          />{' '}
          {subscription.name}
        </>
      ),
    },
    {
      key: 'active',
      title: 'Active Status',
      dataIndex: 'active',
      align: 'center' as AlignType,
      sorter: false,
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
      width: 100,
      key: 'startDate',
      title: 'Subscription Start Date',
      dataIndex: 'startDate',
      sorter: true,
    },
    {
      width: 150,
      key: 'expirationDate',
      title: 'Subscription Expiration Date',
      dataIndex: 'expirationDate',
      sorter: true,
    },
    {
      width: 80,
      key: 'ratingReportsSlots',
      title: 'Rating Reports',
      dataIndex: 'ratingReportsSlots',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      width: 120,
      key: 'ratingReportsNumber',
      title: 'Rating Reports CDFIs',
      dataIndex: 'ratingReportsNumber',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      width: 100,
      key: 'performanceMapsSlots',
      title: 'Performance Maps',
      dataIndex: 'performanceMapsSlots',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      width: 100,
      key: 'performanceMapsNumber',
      title: 'Performance Maps CDFIs',
      dataIndex: 'performanceMapsNumber',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      width: 60,
      key: 'factSheetsSlots',
      title: 'Fact Sheets',
      dataIndex: 'factSheetsSlots',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      width: 100,
      key: 'factSheetsNumber',
      title: 'Fact Sheets CDFIs',
      dataIndex: 'factSheetsNumber',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      width: 80,
      key: 'peerGroupsSlots',
      title: 'Aeris Explorer',
      dataIndex: 'peerGroupsSlots',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      width: 120,
      key: 'peerGroupsNumber',
      title: 'Aeris Explorer CDFIs',
      dataIndex: 'peerGroupsNumber',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      key: 'librarySlots',
      title: 'Library',
      dataIndex: 'librarySlots',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      width: 80,
      key: 'libraryNumber',
      title: 'Library CDFIs',
      dataIndex: 'libraryNumber',
      align: 'center' as AlignType,
      sorter: false,
    },
    {
      key: 'impactManagementReportsSlots',
      title: 'Impact Management Reports',
      dataIndex: 'impactManagementReportsSlots',
      align: 'center' as AlignType,
      width: 170,
      sorter: false,
    },
    {
      key: 'impactManagementReportsNumber',
      title: 'Impact Management Reports CDFIs',
      dataIndex: 'impactManagementReportsNumber',
      width: 170,
      sorter: false,
      align: 'center' as AlignType,
    },

    {
      key: 'isCustomDataReports',
      title: 'Custom Data Reports',
      dataIndex: 'isCustomDataReports',
      width: 140,
      align: 'center' as AlignType,
      sorter: true,
      render: (text: string, record: any) => (
        <Paragraph>{record?.isCustomDataReports ? 'Yes' : 'No'}</Paragraph>
      ),
    },
    {
      width: 180,
      key: 'notes',
      title: 'Notes',
      dataIndex: 'notes',
      sorter: false,
    },
  ];
};
