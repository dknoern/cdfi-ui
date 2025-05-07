import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { notificationStore, userStore } from 'store';
import { Layout, Globals } from 'components';
import { EditDataWebform } from './Dashboard/scenes/AdminDashboard/EditDataWebform';
import { authTools } from 'tools';
import { URLWatcher } from 'tools/URLWatcher';
import {
  Dashboard,
  Auth,
  ChangePassword,
  NotLogged,
  Manage,
  CdfiSelector,
  AerisExplorer,
  RatingsDefinitions,
  HotCdfis,
} from './index';
import { MyCdfis } from './Dashboard/scenes/Subscribers/MyCdfis';
import { RatingsDistribution } from './Dashboard/scenes/Subscribers/RatingsDistribution';
import { AutoEmailPage } from './Manage/scenes';
import { DocumentTypes } from './Manage/scenes';
import { Formulas } from './Manage/scenes';
import { Graphs } from './Manage/scenes';
import { Libraries } from './Manage/scenes';
import { OutputMaps } from './Manage/scenes';
import { PeerGroups } from './Manage/scenes/Platform/PeerGroupsPage/PeerGroups';
import { ReportGroups } from './Manage/scenes';
import { SystemEmailPage } from './Manage/scenes';
import { Tags } from './Manage/scenes';
import { TaxJurisdictions } from './Manage/scenes';
import { ValueFacts } from './Manage/scenes';
import { GlobalPerformanceMetrics } from './Manage/scenes';
import {
  SubscribersManage,
  SubscribersCdfiManage,
} from './Subscribers/scenes/SubscribersManage';
import { AerisGlobalLibrary } from './Library/GlobalLibrary';
import { Cdfi } from './Manage/scenes/CdfiManage/Cdfi';
import { CustomDataReportsAdminDashboard } from './CustomDataReports/CustomDataReportsAdmin';
import { Metrics } from './Metrics';
import { ManageAggregatedMetrics } from './Metrics/AggregatedMetrics';
import {
  CustomDataReportsSubscriberDashboard,
  CustomDataReportsCdfiDashboard,
} from './CustomDataReports/CustomDataReportsSubscriberCdfi';
import { SupportHistoryDashboard } from './SupportHistory';
import { ManagePlatform } from './ManagePlatform';
import { GlobalListContents } from './GlobalListContents/GlobalListContents';
import { SystemEmail } from './Manage/scenes/Platform/SystemEmailPage/SystemEmail';
import { GlobalGraph } from './Manage/scenes/Platform/GraphsPage/GlobalGraph';
import { SubscriberContacts } from './Dashboard/scenes/SubscriberDashboard/SubscriberContacts';
import { MyAccount } from './MyAccount';
import { TaxJurisdiction } from './Manage/scenes/Platform/TaxJurisdictionPage/TaxJurisdiction';
import { ReportsPage } from './AerisExplorer/components/ReportsPage/ReportsPage';
import { ComparisonViewPage } from './AerisExplorer/components/ComparisonViewPage/ComparisonViewPage';
import { ManageExplorerFilters } from './Manage/scenes/Platform/ExplorerPage/ManageExplorerFilters';

const Logged = observer(() => {
  const { isAerisAdmin: isAdmin, isTermsOfUseAccepted } = userStore;

  useEffect(authTools.listenToTokenChanges, []);

  useEffect(() => {
    if (isAdmin || !isTermsOfUseAccepted) return;

    notificationStore.loadNotifications();
  }, [isAdmin, isTermsOfUseAccepted]);

  if (
    userStore.isAerisAdmin ||
    userStore.isAerisAnalyst ||
    userStore.isStaff ||
    userStore.isContractor
  ) {
    return (
      <>
        <URLWatcher />
        <Layout>
          <Switch>
            <Route path="/aerisExplorer/cdfi/:cdfiId" component={AerisExplorer} />
            <Route path="/aerisExplorer/global" component={AerisExplorer} />
            <Route path="/aerisExplorer/subscriber/:subscriberId" component={AerisExplorer} />
            <Route path="/aerisExplorer/subscriber/:subscriberId/cdfi/:cdfiId" component={AerisExplorer} />
            <Route path="/aggregated-metrics" component={ManageAggregatedMetrics} key="aggregated-metrics" />
            <Route exact path="/auto-email" component={AutoEmailPage} />
            <Route exact path="/cdfi/:id" component={Cdfi} key="cdfi" />
            <Route path="/cdfi" component={SubscribersCdfiManage} key="manage" />
            <Route path="/cdfiselector" component={CdfiSelector} key="manage" />
            <Route path="/hot-cdfis" component={HotCdfis} key="hot-cdfis" />
            <Route path="/comparison-view-page/:id" component={ComparisonViewPage} key="comparison-view-page" />
            <Route path="/create-peer-or-portfolio/:groupType/:id?/:userType?/:companyId?" component={CdfiSelector} key="/create-peer-or-portfolio" />
            <Route path="/custom-data-reports" component={CustomDataReportsAdminDashboard} key="manage" />
            <Route path="/custom-email" component={SystemEmail} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/document-types" component={DocumentTypes} />
            <Route path="/edit-data/:year/:quarter/:id" component={EditDataWebform} />
            <Route exact path="/explorer-filters" component={ManageExplorerFilters} />
            <Route path="/formulas" component={Formulas} />
            <Route path="/global-graphs/" component={GlobalGraph} />
            <Route path="/global-graphs/:id" component={GlobalGraph} />
            <Route path="/global-list-contents" component={GlobalListContents} key="global-list-contents" />
            <Route path="/global-performance-metrics" component={GlobalPerformanceMetrics} />
            <Route path="/graphs" component={Graphs} />
            <Route path="/libraries" component={Libraries} />
            <Route path="/library" component={AerisGlobalLibrary} key="manage" />
            <Route path="/manage" component={Manage} key="manage" />
            <Route path="/manage-platform" component={ManagePlatform} key="manage-platform" />
            <Route path="/metrics" component={Metrics} key="metrics" />
            <Route path="/output-maps" component={OutputMaps} />
            <Route exact path="/peer-groups" component={PeerGroups} />
            <Route path="/ratings-definitions" component={RatingsDefinitions} key="ratings-definitions" />
            <Route path="/report-groups" component={ReportGroups} />
            <Route path="/reports-page/:id" component={ReportsPage} key="reports-page" />
            <Route exact path="/system-email" component={SystemEmailPage} />
            <Route path="/system-email/:id" component={SystemEmail} />
            <Route path="/tags" component={Tags} />
            <Route path="/tax-jurisdictions" component={TaxJurisdictions} />
            <Route path="/tax-jurisdiction/" component={TaxJurisdiction} />
            <Route path="/tax-jurisdiction/:id" component={TaxJurisdiction} />
            <Route path="/value-facts" component={ValueFacts} />
            <Redirect to="/dashboard" />
          </Switch>
        </Layout>
        <Globals />
      </>
    );
  }

  // If they are a subscriber
  if (userStore.isSubscriber) {
    return (
      <>
        <URLWatcher />
        <Layout>
          <Switch>
            <Route path="/aerisExplorer/cdfi/:cdfiId" component={AerisExplorer} />
            <Route path="/aerisExplorer/subscriber/:subscriberId" component={AerisExplorer} />
            <Route path="/cdfi" component={SubscribersCdfiManage} key="manage" />
            <Route path="/cdfiselector" component={CdfiSelector} key="cdfiSelector" />
            <Route path="/comparison-view-page/:id" component={ComparisonViewPage} key="comparison-view-page" />
            <Route path="/contacts" component={SubscriberContacts} />
            <Route path="/create-peer-or-portfolio/:groupType/:id?/:userType?/:companyId?" component={CdfiSelector} key="/create-peer-or-portfolio" />
            <Route path="/custom-data-reports" component={CustomDataReportsSubscriberDashboard} key="manage" />
            <Route path="/dashboard" component={MyCdfis} />
            <Route path="/manage" component={SubscribersManage} key="manage" />
            <Route path="/my-account" component={MyAccount} key="my-account" />
            <Route path="/ratings-definitions" component={RatingsDefinitions} key="ratings-definitions" />
            <Route path="/ratings-distribution" component={RatingsDistribution} key="manage" />
            <Route path="/reports-page/:id" component={ReportsPage} key="reports-page" />
            <Route path="/support-history" component={SupportHistoryDashboard} key="support" />
            <Redirect to="/dashboard" />
          </Switch>
        </Layout>
        <Globals />
      </>
    );
  }

  return (
    <>
      <URLWatcher />
      <Layout>
        <Switch>
          <Route path="/aerisExplorer/cdfi/:cdfiId" component={AerisExplorer} />
          <Route path="/aerisExplorer/subscriber/:subscriberId" component={AerisExplorer} />
          <Route path="/cdfi/:id" component={Cdfi} key="cdfi" />
          <Route path="/cdfiselector" component={CdfiSelector} key="manage" />
          <Route path="/create-peer-or-portfolio/:groupType/:id?/:userType?/:companyId?" component={CdfiSelector} key="/create-peer-or-portfolio" />
          <Route path="/comparison-view-page/:id" component={ComparisonViewPage} key="comparison-view-page" />
          <Route path="/custom-data-reports" component={CustomDataReportsCdfiDashboard} key="manage" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/library" component={AerisGlobalLibrary} key="manage" />
          <Route path="/manage" component={Manage} key="manage" />
          <Route path="/ratings-definitions" component={RatingsDefinitions} key="ratings-definitions" />
          <Route path="/reports-page/:id" component={ReportsPage} key="reports-page" />
          <Route path="/support-history" component={SupportHistoryDashboard} key="support" />
          <Redirect to="/dashboard" />
        </Switch>
      </Layout>
      <Globals />
    </>
  );
});
Logged.displayName = 'Logged';

// eslint-disable-next-line react/prop-types
export const rootComp = ({ isLogged, isFirstLogin }) => {
  let Component;
  switch (Number(isLogged) + Number(isFirstLogin) * 2) {
    case 3:
      Component = ChangePassword; // user activation scenario via first login
      break;
    case 1:
      Component = Logged;
      break;
    default:
      Component = NotLogged;
      break;
  }

  return (
    <Switch>
      <Route exact path="/auth/:token" component={Auth} key="auth" />
      <Route component={Component} />
    </Switch>
  );
};
