import React, { FC, useState, useEffect } from 'react';
import { PageSectionWrapper } from '../../../../components';
import { Table } from 'antd';
import {
  subscriptionsButton,
  subscriberSubscriptionCreateDefaultValues,
} from './constants';
import {
  SubscriberSubscriptionEditFormData,
  SubscriberSubscriptionsDTO,
} from 'types';
import { SubscriberSubscriptionEdit } from './SubscriberSubscriptionEdit';
import styles from './SubscriberActivities.module.scss';
import { makeSubscriberSubscriptionsColumns } from './makeSubscriberSubscriptionsColumns';
import { subscriberStore } from 'store';
import { deleteSubscriberSubscription } from './tools/operations';
import { observer } from 'mobx-react';
import { ConfirmModal } from './ConfirmModal/ConfirmModal';
import { toJS } from 'mobx';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { getSubscriberSubscriptions } from 'dataManagement/operations/subscriberOperations';

interface SubscriberSubscriptionsProps {
  data: SubscriberSubscriptionsDTO;
}

type SubscriberSubscriptionsData = SubscriberSubscriptionsDTO & {
  key: React.Key;
};

function addIndexAsKey(
  data: SubscriberSubscriptionsDTO,
): SubscriberSubscriptionEditFormData[] {
  return data?.content.map((subscription, index) => ({
    key: index,
    ...subscription,
  }));
}

const pageSizeOptions = ['25', '50', '100'];

export const SubscriberSubscriptionsTable: FC<SubscriberSubscriptionsProps> =
  observer((props) => {
    const {
      isConfirmModal,
      setIsConfirmModal,
      subscriberId,
      deleteSubscriberId,
      setPagination,
      setLoading,
      pagination,
      loading,
    } = subscriberStore;
    const data = addIndexAsKey(props.data);
    const [editingSubscriberSubscription, setEditingSubscriberSubscription] =
      useState<SubscriberSubscriptionEditFormData | undefined>();
    const [deleteSubscriptionId, setDeleteSubscriptionId] = useState<
      number | null | undefined
    >();

    const startAdd = () => {
      setEditingSubscriberSubscription(
        subscriberSubscriptionCreateDefaultValues,
      );
    };

    const columns = makeSubscriberSubscriptionsColumns(
      subscriberId,
      setEditingSubscriberSubscription,
      setDeleteSubscriptionId,
    );

    /**
     * Effects
     */
    useEffect(() => {
      if (deleteSubscriptionId) {
        const proceedSave = (): ReturnType<
          typeof deleteSubscriberSubscription
        > => deleteSubscriberSubscription(subscriberId, deleteSubscriptionId);
        proceedSave().then();
      }
    }, [deleteSubscriptionId]);

    /**
     * Handlers
     */
    const onTableChange = (
      pagination: TablePaginationConfig,
      sorter: SorterResult<any> | SorterResult<any>[],
    ) => {
      const pageNumber =
        pagination.current !== undefined
          ? pagination.current - 1
          : pagination.current;
      setPagination({ current: pageNumber, pageSize: pagination.pageSize });
      getSubscriberSubscriptions(
        subscriberId,
        pageNumber,
        pagination.pageSize,
        sorter,
      );
    };

    return (
      <PageSectionWrapper
        title="Subscription Management"
        actionButtons={subscriptionsButton(startAdd)}
      >
        {editingSubscriberSubscription && (
          <SubscriberSubscriptionEdit
            initialValues={editingSubscriberSubscription}
            setInitialValues={setEditingSubscriberSubscription}
          />
        )}
        <Table
          loading={loading}
          className={`${styles.contactsTable} ${styles.subscriptionTable}`}
          dataSource={data}
          columns={columns}
          onChange={onTableChange}
          pagination={{
            ...toJS(pagination),
            showSizeChanger: true,
            pageSizeOptions,
            total: 25,
            // total: props.data?.numberOfElements,
            // total: props?.data?.totalElements,
          }}
          size={'small'}
          showSorterTooltip
          scroll={{
            x: 'max-content',
          }}
          {...props}
        />
        <ConfirmModal
          visible={isConfirmModal}
          onClose={() => {
            setIsConfirmModal(false);
          }}
          setDelete={setDeleteSubscriptionId}
          id={deleteSubscriberId}
        />
      </PageSectionWrapper>
    );
  });
