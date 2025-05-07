import React, {useEffect, useState} from 'react';
import {PageSectionWrapper} from "../../components";
import styles from "./AccountSummary.module.scss";
import {Table} from "antd";
import {SubscriberSubscriptionEditFormData} from "../../types";
import {useSubscribers, useSubscriberSubscriptions} from "../../dataManagement";
import {subscriberStore, userStore} from "../../store";
import {getSubscriberSubscription} from "../../dataManagement/operations/subscriberOperations";
import {getDataSource} from "./makeDataSource";
import moment from "moment";
import {columnsAccountSummary} from "./makeColumns";

export const AccountSummary = () => {
  const [subscriberSubscription, setSubscriberSubscription] = useState<SubscriberSubscriptionEditFormData>();
  const { data: subscribers } = useSubscribers();
  const { viewModeConfig } = subscriberStore;
  // @ts-ignore
  const {data: subscriberSubscriptions}  = useSubscriberSubscriptions(viewModeConfig?.subscriberId);

  const subscriberName = subscribers?.find((item) =>
    item.id == viewModeConfig?.subscriberId ? item.name : '',
  )?.name;

  const startDate =
    subscriberSubscriptions?.subscriberSubscriptions.content.length !== 0
      ? subscriberSubscriptions?.subscriberSubscriptions.content[0].startDate
      : '';

  useEffect(() => {
    if (subscriberSubscriptions?.subscriberSubscriptions.content.length !== 0 && subscriberSubscriptions?.subscriberSubscriptions.content[0].id !== undefined) {
      // @ts-ignore
      getSubscriberSubscription(viewModeConfig?.subscriberId, subscriberSubscriptions?.subscriberSubscriptions.content[0].id).then((result) => {
        return setSubscriberSubscription(result);
      })
    }
  }, [subscriberSubscriptions?.subscriberSubscriptions])

  const expirationDate = subscriberSubscriptions?.subscriberSubscriptions.content.length !== 0 ?
    subscriberSubscriptions?.subscriberSubscriptions.content[0].expirationDate : '';
  const columns = columnsAccountSummary();
  const dataSource = subscriberSubscription ? getDataSource(subscriberSubscription) : [];

  const validDate = () => {
    if(expirationDate === '') {
      return false;
    }

    // @ts-ignore
    const inputDate = new Date(moment(expirationDate)).toISOString().slice(0, 10);
    const currentDate = new Date().toISOString().slice(0, 10);
    return moment(currentDate).isSameOrBefore(inputDate);
  }

  return subscriberSubscriptions ? (
    <PageSectionWrapper
      title={subscriberName}
    >
      <p className={styles.title}>ACCOUNT SUMMARY</p>
      <div className={styles.descriptions}>
        {validDate() ?
          <>
            <p>
              Current Subscription period is from {startDate} to &nbsp;
              {expirationDate}.
            </p>
            <p className={styles.titleTable}>
              This organization is currently subscribed to the following Aeris
              services.
            </p>
          </>
          : !validDate() && subscriberSubscriptions?.subscriberSubscriptions.content.length === 0 ?
            <p>This organization is not currently subscribed to the following Aeris services</p> :
            <p>This subscription expired on {expirationDate}.</p>
        }
      </div>
      {validDate() ?
        <Table
        className={styles.accountSummaryTable}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size={'small'}
      /> : null}
    </PageSectionWrapper>
  ) : null
}
