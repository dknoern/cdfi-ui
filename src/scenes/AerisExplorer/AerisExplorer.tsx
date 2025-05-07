import React, { FC, useEffect, useState } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useLocation, useParams } from 'react-router-dom';
import { ContentLimiter, PageSectionWrapper } from '../../components';
import { subscriberStore, userStore, aerisExplorerPeerGroupStore } from 'store';
import { useCdfiOrgDetails } from '../../dataManagement';
import { useAppConfig } from 'useAppConfig';
import { Spin, Tabs } from 'antd';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from './components/LogoHeader';
import styles from './AerisExplorer.module.scss';
import { subscriptionStore } from '../../store/subscriptionStore';
import { TabComparison } from './components/TabComparison';
import { TabPeerGroup } from './components/TabPeerGroup';
import { TabPortfolioSegment } from './components/TabPortfolioSegment';
import { TabComparisonInstructions } from './components/Instructions/TabComparisonInstructions';
import { TabIntroInstructions } from './components/Instructions/TabIntroInstructions';
import { TabPeerGroupInstructions } from './components/Instructions/TabPeerGroupInstructions';
import { TabPortfolioSegmentInstructions } from './components/Instructions/TabPortfolioSegmentInstructions';

export const AerisExplorer: FC = observer(() => {
  const { subscriberId, cdfiId } = useParams();
  const { pathname } = useLocation();
  const { subscribers, subscriber, subscriptions } = subscriberStore;
  const { getActiveSubscriptions, hasAerisExplorerSubscription } =
    subscriptionStore;
  const {
    setAerisExplorerHomePath,
    activeKey,
    setActiveKey,
    subscriberFirstVisit,
    setSubscriberFirstVisit,
  } = aerisExplorerPeerGroupStore;
  const { data } = useCdfiOrgDetails(cdfiId);
  const cdfi = data ? data.cdfi : undefined;

  const { NEW_AERIS_EXPLORER_ENABLED } = useAppConfig();
  const { TabPane } = Tabs;

  const [enableTabs, setEnableTabs] = useState(false);

  const onTabKeyChange = (key: string) => setActiveKey(key);

  const enableExplorerTabs = (): void => {
    if (
      userStore.isAerisAdmin ||
      userStore.isStaff ||
      userStore.isContractor ||
      userStore.isCdfi ||
      userStore.isAerisAnalyst
    ) {
      setEnableTabs(true);
      return;
    }

    if (userStore.isSubscriber && hasAerisExplorerSubscription(subscriberId)) {
      setEnableTabs(true);
      return;
    }

    setEnableTabs(false);
  };

  useEffect(() => {
    getActiveSubscriptions().then((r) => enableExplorerTabs());
  }, [enableExplorerTabs, getActiveSubscriptions, subscriberId]);

  useEffect(() => {
    setAerisExplorerHomePath(pathname);
  }, [pathname, setAerisExplorerHomePath]);

  useEffect(() => {
    if (!subscriberId) {
      setActiveKey('peergroups');
    }
    if (subscriberId && subscriberFirstVisit) {
      setActiveKey('');
      setSubscriberFirstVisit(false);
    }
  }, [
    subscriberId,
    cdfiId,
    subscriberFirstVisit,
    setActiveKey,
    setSubscriberFirstVisit,
  ]);

  const [loadingIFrame, setLoadingIFrame] = useState(true);
  setTimeout(function () {
    setLoadingIFrame(false);
  }, 3000);

  const getUrl = (): string => {
    if (userStore.isSubscriber && cdfiId) {
      // Subscriber viewing the Aeris Explorer for a particular CDFI
      return `/cdfi/${cdfiId}/peergroups`;
    }
    if (userStore.isSubscriber) {
      // Subscriber viewing Aeris Explorer.
      return `/investor/${userStore.companyId}/peergroups`;
    }
    if (userStore.isAerisAdmin && cdfiId) {
      // Aeris admin viewing a cdfi
      return `/cdfi/${cdfiId}/peergroups`;
    }
    if (userStore.isAerisAdmin && subscriberId) {
      // Aeris admin viewing a subscriber
      return `/investor/${subscriberId}/peergroups`;
    }
    if (userStore.isCdfi) {
      // cdfi logged in viewing Aeris Explorer
      return `/cdfi/${userStore.companyId}/peergroups`;
    }
    if (userStore.isAerisAnalyst && cdfiId) {
      // Aeris analyst viewing a cdfi
      return `/cdfi/${cdfiId}/peergroups`;
    }
    if (userStore.isStaff && cdfiId) {
      // Aeris staff viewing a cdfi
      return `/cdfi/${cdfiId}/peergroups`;
    }
    if (userStore.isStaff && subscriberId) {
      // Aeris staff viewing a subscriber
      return `/investor/${subscriberId}/peergroups`;
    }
    if (userStore.isContractor && cdfiId) {
      // Aeris contractor viewing a cdfi
      return `/cdfi/${cdfiId}/peergroups`;
    }
    if (userStore.isContractor && subscriberId) {
      // Aeris contractor viewing a subscriber
      return `/investor/${subscriberId}/peergroups`;
    }
    // Admin viewing Aeris Explorer
    return `/peergroups/list`;
  };

  const urlWithToken = `${getUrl()}?token=${userStore.token}`;

  const subscriberName = toJS(subscribers)?.find((item) =>
    item.id === subscriberId ? item.name : '',
  )?.name;

  const logo = useCdfiLogo(cdfiId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!NEW_AERIS_EXPLORER_ENABLED) {
    return (
      <ContentLimiter>
        <PageSectionWrapper title="CDFI Explorer">
          <div className={styles.spin}>
            <Spin spinning={loadingIFrame} />
          </div>
          <p style={{ color: '#2084ad', fontSize: 'medium' }}>
            {userStore.isSubscriber ? subscriber?.name : subscriberName}
          </p>
          <iframe
            title="iframe-explorer"
            src={urlWithToken}
            width="100%"
            height="1000"
            onLoad={(): void => window.scrollTo(0, 0)}
          />
        </PageSectionWrapper>
      </ContentLimiter>
    );
  }
  // *************** ^^^ OLD STUFF ^^^ ****************
  // **************************************************

  return (
    <ContentLimiter>
      <PageSectionWrapper
        title="CDFI Explorer"
        description={
          <>
            {activeKey === '' && (
              <TabIntroInstructions explorerEnabled={enableTabs} />
            )}
            {activeKey === 'peergroups' && (
              <TabPeerGroupInstructions
                cdfiId={cdfiId}
                subscriberId={subscriberId}
                isAdmin={userStore.isAerisAdmin}
                isStaff={userStore.isStaff}
              />
            )}
            {activeKey === 'portfolio' && <TabPortfolioSegmentInstructions />}
            {activeKey === 'comparison' && <TabComparisonInstructions />}
          </>
        }
        topTitle={cdfiId && <LogoHeader imgPath={logo} subTitle={cdfi?.name} />}
      >
        <Tabs
          type="card"
          defaultActiveKey={activeKey}
          onChange={onTabKeyChange}
        >
          <TabPane
            aria-level={3}
            tab="PEER GROUPS"
            key="peergroups"
            disabled={!enableTabs}
          >
            {subscriberId && activeKey === '' ? (
              <div />
            ) : (
              <TabPeerGroup cdfiId={cdfiId} subscriberId={subscriberId} />
            )}
          </TabPane>
          {subscriberId && !cdfiId && (
            <TabPane
              aria-level={3}
              tab="PORTFOLIO SEGMENTS"
              key="portfolio"
              disabled={!enableTabs}
            >
              <TabPortfolioSegment
                cdfiId={cdfiId}
                subscriberId={subscriberId}
              />
            </TabPane>
          )}
          {subscriberId && !cdfiId && (
            <TabPane
              aria-level={3}
              tab="COMPARISONS"
              key="comparison"
              disabled={!enableTabs}
            >
              <TabComparison subscriberId={subscriberId} cdfiId={cdfiId} />
            </TabPane>
          )}
        </Tabs>
      </PageSectionWrapper>
    </ContentLimiter>
  );
});
