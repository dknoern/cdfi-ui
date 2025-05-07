import { PageSectionWrapper } from 'components';
import React, {FC, useCallback, useEffect, useState} from 'react';
import { withRouter } from 'react-router-dom';
import { emailAerisSupportButton } from './actionButtons';
import { SupportHistoryEmailModal } from './SupportHistoryEmailModal';
import { SupportHistoryView } from './SupportHistoryView';
import { Form } from 'antd';
import { userStore, subscriberStore } from 'store';
import {toJS} from "mobx";
import {useCdfis, useSubscribers} from "../../dataManagement";
import { LogoHeader } from './components/LogoHeader';
import { cdfiStore } from 'store';
import { useCdfiLogo } from 'tools/useCdfiLogo';

export const SupportHistoryDashboardFn: FC = () => {
  const [showSupportHistoryEmailModal, setShowSupportHistoryEmailModal] =
    useState<boolean>(false);

  const startAdd = useCallback(() => {
    setShowSupportHistoryEmailModal(true);
  }, []);

  const formId = 'SEND_AERIS_SUPPORT_EMAIL';
  const [form] = Form.useForm();
  const { setSubscribers, subscribers, subscriberId, subscriber } = subscriberStore;
  const { cdfiId } = cdfiStore;
  const { data: cdfis } = useCdfis();
  const { data } = useSubscribers();
  useEffect(() => {
    setSubscribers(data)
  }, [data])

  const subscriberName = toJS(subscribers)?.find((item) =>
    item.id == subscriberId ? item.name : '',
  )?.name;

  const cdfiName = cdfis?.find((item) =>
    item.id == cdfiId ? item.name : '',
  )?.name;

  const logo = useCdfiLogo(cdfiId);

  return (
    <PageSectionWrapper
      title="Support History"
      topTitle={<LogoHeader imgPath={logo} subTitle={cdfiName} />}
      actionButtons={userStore.isSubscriber || userStore.isCdfi ? [emailAerisSupportButton(startAdd)] : []}
    >
      
      <p style={{ color: "#2084ad", fontSize: 'medium' }}>{userStore.isSubscriber ? subscriber?.name : subscriberName}</p>
      <SupportHistoryView />
      <SupportHistoryEmailModal
        visible={showSupportHistoryEmailModal}
        onClose={() => {
          setShowSupportHistoryEmailModal(false);
          form.resetFields();
        }}
        onFinish={() => {
          setShowSupportHistoryEmailModal(false);
          form.resetFields();
        }}
        formId={formId}
        form={form}
  />
    </PageSectionWrapper>
  );
};

export const SupportHistoryDashboard = withRouter(SupportHistoryDashboardFn);
