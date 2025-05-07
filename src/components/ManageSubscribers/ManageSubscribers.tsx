import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SubscriberEdit } from './SubscriberEdit';
import { subscriberStore } from 'store';
import { EditableSubscriber } from 'forms/AdminForms/SubscriberEdit/types';
import { useSubscriberOrgDetails } from 'dataManagement';

export const ManageSubscribers: FC = () => {
  const location = useLocation();
  const isUpdateForm = location.pathname.includes('update-subscriber');
  const { subscriberId } = subscriberStore;
  const { data: subscriberOrgDetails } = useSubscriberOrgDetails(subscriberId);
  const [subscriberEditData, setSubscriberEditData] = useState<EditableSubscriber>();

  useEffect(() => {
    if (isUpdateForm) {
      setSubscriberEditData(subscriberOrgDetails?.subscriber);
    }
  }, [subscriberOrgDetails]);

  if (isUpdateForm && !subscriberEditData) {
    return <></>;
  }

  return <SubscriberEdit isEditForm={isUpdateForm} subscriberEditData={subscriberEditData}></SubscriberEdit>;
};
