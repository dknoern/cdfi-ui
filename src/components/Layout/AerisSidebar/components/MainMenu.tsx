import { Menu as AntMenu, Select } from 'antd';
import { LabeledValue } from 'antd/lib/select';
import {useCdfis, useSubscriberOrgDetails, useSubscribers} from 'dataManagement';
import React, { FC, useEffect, useState } from 'react';
import {
  useHistory,
  useLocation,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';
import { cdfiStore, userStore, subscriberStore } from 'store';
import { Cdfi, Subscriber } from 'types';
import styles from '../../components/SiderMenu.module.scss';
import { MainMenuButtons } from './MainMenuButtons';

const { Option } = Select;
const { Item } = AntMenu;

const ManagementMenuFn: FC = React.memo(() => {
  // section must match menu item's key
  const manageRouteMatch =
    useRouteMatch<{ section: string }>('/manage/:section');
  const history = useHistory();
  const location = useLocation();

  // CDFI dropdown
  const { cdfiId, setCdfiId } = cdfiStore;
  let cdfiDropdownItems: Cdfi[] | null = null;
  if (
    userStore.isAerisAdmin ||
    userStore.isAerisAnalyst ||
    userStore.isStaff ||
    userStore.isContractor
  ) {
    const { data } = useCdfis();
    cdfiDropdownItems = data;
  }
  const [selectedCdfiName, setSelectedCdfiName] = useState<LabeledValue>();
  const cdfiPlaceholder = 'Go to CDFI Account';
  const [cdfiDropDownPlaceHolder, setCdfiDropDownPlaceHolder] = useState<
    string | undefined
  >(cdfiPlaceholder);

  const onCdfiSelect = (value: LabeledValue) => {
    setSelectedCdfiName(value);
    const cdfi = Object.assign(value);
    setCdfiId(cdfi.value);
    history.push('/manage/cdfi/' + cdfi.value);
  };

  // Clear Selected CDFI
  useEffect(() => {
    if (
      location.pathname === '/dashboard' ||
      location.pathname.includes('/manage/subscriber')
    ) {
      setSelectedCdfiName(undefined);
      setCdfiId(null);
      setCdfiDropDownPlaceHolder(cdfiPlaceholder);
    }
  }, [location]);

  useEffect(() => {
    if (cdfiId) {
      let result = cdfiDropdownItems?.filter((obj) => {
        return obj.id === cdfiId;
      });
      setCdfiDropDownPlaceHolder(
        result?.[0] ? result?.[0].name : cdfiPlaceholder,
      );
    }
  }, [cdfiDropdownItems]);

  const cdfiAccountOptions = cdfiDropdownItems?.map((cdfi, index) => (
    <Option key={index} value={cdfi.id}>
      {cdfi.name}
    </Option>
  ));

  // Subscribers
  const { subscriberId, setSubscriberId, setSubscriberDetails, setSubscribers } = subscriberStore;
  let subscriberDropdownItems: Subscriber[] | null = null;
  if (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) {
    const { data } = useSubscribers();
    subscriberDropdownItems = data;

    useEffect(() => {
      setSubscribers(data)
    }, [data])
  }

  if (userStore.isSubscriber) {
    const {data} = useSubscriberOrgDetails(userStore.info.companyId);
    setSubscriberDetails(data?.subscriber)
  }

  const [selectedSubscriberName, setSelectedSubscriberName] =
    useState<LabeledValue>();
  const subscriberPlaceholder = 'Go to Subscriber Account';
  const [subscriberDropDownPlaceHolder, setSubscriberDropDownPlaceHolder] =
    useState<string | undefined>(subscriberPlaceholder);

  const onSubscriberSelect = (value: LabeledValue) => {
    setSelectedSubscriberName(value);
    const subscriber = Object.assign(value);
    setSubscriberId(subscriber.value);
    history.push('/manage/subscriber/' + subscriber.value);
  };

  // Clear Selected Subscriber
  useEffect(() => {
    if (
      location.pathname === '/dashboard' ||
      location.pathname.includes('/manage/cdfi')
    ) {
      setSelectedSubscriberName(undefined);
      setSubscriberId(null);
      setSubscriberDropDownPlaceHolder(subscriberPlaceholder);
    }
  }, [location]);

  useEffect(() => {
    if (subscriberId) {
      let result = subscriberDropdownItems?.filter((obj) => {
        return obj.id === subscriberId;
      });
      setSubscriberDropDownPlaceHolder(
        result?.[0] ? result?.[0].name : subscriberPlaceholder,
      );
    }
  }, [subscriberDropdownItems]);

  const subscriberAccountOptions = subscriberDropdownItems?.map(
    (subscriber, index) => (
      <Option key={index} value={subscriber.id}>
        {subscriber.name}
      </Option>
    ),
  );

  return (
    <>
      {(userStore.isAerisAdmin ||
        userStore.isAerisAnalyst ||
        userStore.isStaff ||
        userStore.isContractor) && (
        <>
          <Select
            className={`${styles.dropdown}  ${
              cdfiDropDownPlaceHolder !== cdfiPlaceholder ? styles.on : null
            }`}
            showSearch
            labelInValue
            placeholder={cdfiDropDownPlaceHolder}
            onChange={onCdfiSelect}
            value={selectedCdfiName!}
            optionFilterProp="children"
          >
            {cdfiAccountOptions}
          </Select>
          {(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) && (
            <Select
              className={`${styles.dropdown}  ${
                subscriberDropDownPlaceHolder !== subscriberPlaceholder
                  ? styles.on
                  : null
              }`}
              showSearch
              labelInValue
              placeholder={subscriberDropDownPlaceHolder}
              onChange={onSubscriberSelect}
              value={selectedSubscriberName!}
              optionFilterProp="children"
            >
              {subscriberAccountOptions}
            </Select>
          )}
        </>
      )}
      <MainMenuButtons />
      {(userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) && (
        <AntMenu
          id="AdminMenu"
          mode="inline"
          theme="dark"
          className={styles.menu}
          selectedKeys={
            manageRouteMatch ? [manageRouteMatch.params.section] : undefined
          }
        >
        </AntMenu>
      )}
    </>
  );
});

export const MainMenu = withRouter(ManagementMenuFn);
