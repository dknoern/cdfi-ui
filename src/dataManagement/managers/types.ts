import { VoidFn } from 'types/misc';
import { ReportedDataTableConfigManager } from 'dataManagement/managers/ReportedDataTableConfigManager';
import { PortfolioManager } from './PortfolioManager';
import { AcceptedMetricsManager } from './AcceptedMetricsManager';
import { MetricsManager } from './MetricsManager';
import { AggregatedMetricsManager } from './AggregatedMetricsManager';
import { FMCompanyManager } from './FMCompanyManager';
import { UserManager } from './UserManager';
import { SubscriptionManager } from './SubscriptionManager';
import { PCCompanyManager } from './PCCompanyManager';
import { ForecastManager } from './ForecastManager';
import { NotificationManager } from './NotificationManager';
import { TagsManager } from './TagsManager';
import { MetricCategoriesManager } from './MetricCategoriesManager';
import { DashboardManager } from './DashboardManager';
import { CountriesManager } from './CountriesManager';
import { NotificationsConfigManager } from './NotificationsConfigManager';
import { FeedbackManager } from './FeedbackManager';
import { InvestmentManager } from './InvestmentManager';
import { ReportingEntityManager } from './ReportingEntityManager';
import { ActivityManager } from './ActivityManager';
import { RecentActivityManager } from './RecentActivityManager';
import { RatingsManager } from './RatingsManager';
import { EmailCategoriesManager } from './EmailManager';
import {
  CdfiManager,
  CdfiActivitiesManager,
  ActionItemsManager,
  CdfiSubscribersManager,
  AnalystsManager,
  CdfiOrgDetailsManager,
  CdfiRatingsManager,
  CdfiContactsManager,
} from './CdfiManager';
import { SelectedCdfiManager } from './SelectedCdfiManager';
import { AllAnalystsManager } from './AllAnalystsManager';
import { CdfiSubscriptionsManager } from './CdfiSubscriptionsManager';
import { AerisLibraryManager } from './AerisLibraryManager';
import { AerisDashboardManager } from './AerisDashboardManager';
import {
  AerisLibraryViewersManager,
  AerisLibraryDocumentsAccessManager,
} from './AerisLibraryViewersManager';

import {
  SubscriberManager,
  SubscriberActivitiesManager,
  SubscriberContactsManager,
  SubscriberOrgDetailsManager,
  SubscriberSubscriptionsManager,
  DelegatedSubscriptionsManager,
} from './SubscriberManager';
import { SelectedSubscriberManager } from './SelectedSubscriberManager';
import { DocumentTypeManager } from './DocumentTypeManager';
import { ActiveUsersManager } from './ActiveUsersManager';
import {
  CustomDataReportsManager,
  CustomDataReportsSubscriberManager,
  CustomDataReportsCdfiManager,
} from './CustomDataReportsManager';
import { SupportHistoryManager } from './SupportHistoryManager';
import {
  AreasServedManager,
  ImpactAreasManager,
  LendingTypesManager,
  OrganizationTypesManager,
  PlatformSettingsManager,
  SubImpactAreasManager,
  SupportRequestSubjectsManager,
  TargetBenefeficiariesManager,
} from './PlatformSettingsManager';

export enum ManagerName {
  emailCategories = 'emailCategories',
  portfolios = 'portfolios',
  acceptedMetrics = 'acceptedMetrics',
  metrics = 'metrics',
  aggregatedMetrics = 'aggregatedMetrics',
  fmCompanies = 'fmCompanies',
  users = 'users',
  subscriptions = 'subscriptions',
  pcCompanies = 'pcCompanies',
  forecasts = 'forecasts',
  notifications = 'notifications',
  tags = 'tags',
  metricCategories = 'metricCategories',
  reportedDataTableConfig = 'reportedDataTableConfig',
  dashboard = 'dashboard',
  countries = 'countries',
  notificationsConfig = 'notificationsConfig',
  feedback = 'feedback',
  investments = 'investments',
  reportingEntity = 'reportingEntity',
  activities = 'activities',
  recentActivities = 'recentActivities',
  cdfis = 'cdfis',
  cdfiActivities = 'cdfiActivities',
  actionItems = 'actionItems',
  cdfiSubscribers = 'cdfiSubscribers',
  analysts = 'analysts',
  allAnalysts = 'allAnalysts',
  cdfiOrgDetails = 'cdfiOrgDetails',
  selectedCdfi = 'selectedCdfi',
  cdfiRatingsDetails = 'cdfiRatingsDetails',
  cdfiRatings = 'cdfiRatings',
  cdfiContacts = 'cdfiContacts',
  cdfiSubscriptions = 'cdfiSubscriptions',
  aerisLibraryDocs = 'aerisLibraryDocs',
  aerisDashboardManager = 'aerisDashboardManager',
  aerisLibraryViewersManager = 'aerisLibraryViewersManager',
  aerisLibraryDocumentsAccessManager = 'aerisLibraryDocumentsAccessManager',
  subscribers = 'subscribers',
  selectedSubscriber = 'selectedSubscriber',
  subscriberActivities = 'subscriberActivities',
  subscriberContacts = 'subscriberContacts',
  subscriberOrgDetails = 'subscriberOrgDetails',
  subscriberSubscriptions = 'subscriberSubscriptions',
  delegatedSubscriptions = 'delegatedSubscriptions',
  documentTypes = 'documentTypes',
  activeUsers = 'activeUsers',
  customDataReports = 'customDataReports',
  customDataReportsSubscriber = 'customDataReportsSubscriber',
  customDataReportsCdfi = 'customDataReportsCdfi',
  supportHistory = 'supportHistory',
  platformSettings = 'platformSettings',
  supportRequestSubjects = 'supportRequestSubjects',
  lendingTypes = 'lendingTypes',
  targetBeneficiaries = 'targetBeneficiaries',
  areasServed = 'areasServed',
  impactAreas = 'impactAreas',
  subImpactAreas = 'subImpactAreas',
  organizationTypes = 'organizationTypes',
}

export type Data = any;

export type DataStore<DataType = Data> = {
  isLoading: boolean;
  hasError: boolean;
  data: DataType | null;
  reload: VoidFn;
};

export interface Manager {
  store: DataStore;
  resetStore: VoidFn;
  reload: VoidFn;
  init: VoidFn;
  loadTriggered: boolean;
  dataReady: boolean;
  proceedReload: (getterFn: () => Promise<any>, errorCallback: VoidFn) => void;
}

export type ManagerType = {
  [ManagerName.emailCategories]: EmailCategoriesManager;
  [ManagerName.portfolios]: PortfolioManager;
  [ManagerName.acceptedMetrics]: AcceptedMetricsManager;
  [ManagerName.metrics]: MetricsManager;
  [ManagerName.aggregatedMetrics]: AggregatedMetricsManager;
  [ManagerName.fmCompanies]: FMCompanyManager;
  [ManagerName.users]: UserManager;
  [ManagerName.subscriptions]: SubscriptionManager;
  [ManagerName.pcCompanies]: PCCompanyManager;
  [ManagerName.forecasts]: ForecastManager;
  [ManagerName.notifications]: NotificationManager;
  [ManagerName.tags]: TagsManager;
  [ManagerName.metricCategories]: MetricCategoriesManager;
  [ManagerName.reportedDataTableConfig]: ReportedDataTableConfigManager;
  [ManagerName.dashboard]: DashboardManager;
  [ManagerName.countries]: CountriesManager;
  [ManagerName.notificationsConfig]: NotificationsConfigManager;
  [ManagerName.feedback]: FeedbackManager;
  [ManagerName.investments]: InvestmentManager;
  [ManagerName.reportingEntity]: ReportingEntityManager;
  [ManagerName.activities]: ActivityManager;
  [ManagerName.recentActivities]: RecentActivityManager;
  [ManagerName.cdfis]: CdfiManager;
  [ManagerName.cdfiActivities]: CdfiActivitiesManager;
  [ManagerName.actionItems]: ActionItemsManager;
  [ManagerName.cdfiSubscribers]: CdfiSubscribersManager;
  [ManagerName.selectedCdfi]: SelectedCdfiManager;
  [ManagerName.analysts]: AnalystsManager;
  [ManagerName.allAnalysts]: AllAnalystsManager;
  [ManagerName.cdfiOrgDetails]: CdfiOrgDetailsManager;
  [ManagerName.cdfiRatingsDetails]: CdfiRatingsManager;
  [ManagerName.cdfiRatings]: RatingsManager;
  [ManagerName.cdfiContacts]: CdfiContactsManager;
  [ManagerName.cdfiSubscriptions]: CdfiSubscriptionsManager;
  [ManagerName.aerisLibraryDocs]: AerisLibraryManager;
  [ManagerName.aerisDashboardManager]: AerisDashboardManager;
  [ManagerName.aerisLibraryViewersManager]: AerisLibraryViewersManager;
  [ManagerName.aerisLibraryDocumentsAccessManager]: AerisLibraryDocumentsAccessManager;
  [ManagerName.subscribers]: SubscriberManager;
  [ManagerName.selectedSubscriber]: SelectedSubscriberManager;
  [ManagerName.subscriberActivities]: SubscriberActivitiesManager;
  [ManagerName.subscriberContacts]: SubscriberContactsManager;
  [ManagerName.subscriberOrgDetails]: SubscriberOrgDetailsManager;
  [ManagerName.subscriberSubscriptions]: SubscriberSubscriptionsManager;
  [ManagerName.delegatedSubscriptions]: DelegatedSubscriptionsManager;
  [ManagerName.documentTypes]: DocumentTypeManager;
  [ManagerName.activeUsers]: ActiveUsersManager;
  [ManagerName.customDataReports]: CustomDataReportsManager;
  [ManagerName.customDataReportsSubscriber]: CustomDataReportsSubscriberManager;
  [ManagerName.customDataReportsCdfi]: CustomDataReportsCdfiManager;
  [ManagerName.supportHistory]: SupportHistoryManager;
  [ManagerName.platformSettings]: PlatformSettingsManager;
  [ManagerName.supportRequestSubjects]: SupportRequestSubjectsManager;
  [ManagerName.lendingTypes]: LendingTypesManager;
  [ManagerName.targetBeneficiaries]: TargetBenefeficiariesManager;
  [ManagerName.areasServed]: AreasServedManager;
  [ManagerName.impactAreas]: ImpactAreasManager;
  [ManagerName.subImpactAreas]: SubImpactAreasManager;
  [ManagerName.organizationTypes]: OrganizationTypesManager;
};
