import { autorun, IReactionDisposer } from 'mobx';
import { ReportedDataTableConfigManager } from 'dataManagement/managers/ReportedDataTableConfigManager';
import { ManagerName, DataStore, ManagerType } from './types';
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
import { AllAnalystsManager } from './AllAnalystsManager';
import { RatingsManager } from './RatingsManager';
import { AerisLibraryManager } from './AerisLibraryManager';
import { AerisDashboardManager } from './AerisDashboardManager';
import {
  AerisLibraryViewersManager,
  AerisLibraryDocumentsAccessManager,
} from './AerisLibraryViewersManager';
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
import {
  SubscriberManager,
  SubscriberActivitiesManager,
  SubscriberContactsManager,
  SubscriberOrgDetailsManager,
  SubscriberSubscriptionsManager,
  DelegatedSubscriptionsManager,
} from './SubscriberManager';
import { SelectedSubscriberManager } from './SelectedSubscriberManager';
import { CdfiSubscriptionsManager } from './CdfiSubscriptionsManager';
import { DocumentTypeManager } from './DocumentTypeManager';
import { ActiveUsersManager } from './ActiveUsersManager';
import {
  CustomDataReportsManager,
  CustomDataReportsSubscriberManager,
  CustomDataReportsCdfiManager,
} from './CustomDataReportsManager';
import { SupportHistoryManager } from './SupportHistoryManager';
import {
  PlatformSettingsManager,
  SupportRequestSubjectsManager,
  LendingTypesManager,
  TargetBenefeficiariesManager,
  AreasServedManager,
  ImpactAreasManager,
  SubImpactAreasManager,
  OrganizationTypesManager,
} from './PlatformSettingsManager';

class DataMan {
  readonly managers: ManagerType = {
    [ManagerName.emailCategories]: new EmailCategoriesManager(),
    [ManagerName.portfolios]: new PortfolioManager(),
    [ManagerName.acceptedMetrics]: new AcceptedMetricsManager(),
    [ManagerName.metrics]: new MetricsManager(),
    [ManagerName.aggregatedMetrics]: new AggregatedMetricsManager(),
    [ManagerName.fmCompanies]: new FMCompanyManager(),
    [ManagerName.users]: new UserManager(),
    [ManagerName.subscriptions]: new SubscriptionManager(),
    [ManagerName.pcCompanies]: new PCCompanyManager(),
    [ManagerName.forecasts]: new ForecastManager(),
    [ManagerName.notifications]: new NotificationManager(),
    [ManagerName.tags]: new TagsManager(),
    [ManagerName.metricCategories]: new MetricCategoriesManager(),
    [ManagerName.reportedDataTableConfig]: new ReportedDataTableConfigManager(),
    [ManagerName.dashboard]: new DashboardManager(),
    [ManagerName.countries]: new CountriesManager(),
    [ManagerName.notificationsConfig]: new NotificationsConfigManager(),
    [ManagerName.feedback]: new FeedbackManager(),
    [ManagerName.investments]: new InvestmentManager(),
    [ManagerName.reportingEntity]: new ReportingEntityManager(),
    [ManagerName.activities]: new ActivityManager(),
    [ManagerName.recentActivities]: new RecentActivityManager(),
    [ManagerName.cdfis]: new CdfiManager(),
    [ManagerName.cdfiActivities]: new CdfiActivitiesManager(),
    [ManagerName.actionItems]: new ActionItemsManager(),
    [ManagerName.cdfiSubscribers]: new CdfiSubscribersManager(),
    [ManagerName.selectedCdfi]: new SelectedCdfiManager(),
    [ManagerName.analysts]: new AnalystsManager(),
    [ManagerName.allAnalysts]: new AllAnalystsManager(),
    [ManagerName.cdfiOrgDetails]: new CdfiOrgDetailsManager(),
    [ManagerName.cdfiRatingsDetails]: new CdfiRatingsManager(),
    [ManagerName.cdfiRatings]: new RatingsManager(),
    [ManagerName.cdfiContacts]: new CdfiContactsManager(),
    [ManagerName.cdfiSubscriptions]: new CdfiSubscriptionsManager(),
    [ManagerName.aerisLibraryDocs]: new AerisLibraryManager(),
    [ManagerName.aerisDashboardManager]: new AerisDashboardManager(),
    [ManagerName.aerisLibraryViewersManager]: new AerisLibraryViewersManager(),
    [ManagerName.aerisLibraryDocumentsAccessManager]:
      new AerisLibraryDocumentsAccessManager(),
    [ManagerName.subscribers]: new SubscriberManager(),
    [ManagerName.selectedSubscriber]: new SelectedSubscriberManager(),
    [ManagerName.subscriberActivities]: new SubscriberActivitiesManager(),
    [ManagerName.subscriberContacts]: new SubscriberContactsManager(),
    [ManagerName.subscriberOrgDetails]: new SubscriberOrgDetailsManager(),
    [ManagerName.subscriberSubscriptions]: new SubscriberSubscriptionsManager(),
    [ManagerName.delegatedSubscriptions]: new DelegatedSubscriptionsManager(),
    [ManagerName.documentTypes]: new DocumentTypeManager(),
    [ManagerName.activeUsers]: new ActiveUsersManager(),
    [ManagerName.customDataReports]: new CustomDataReportsManager(),
    [ManagerName.customDataReportsSubscriber]:
      new CustomDataReportsSubscriberManager(),
    [ManagerName.customDataReportsCdfi]: new CustomDataReportsCdfiManager(),
    [ManagerName.supportHistory]: new SupportHistoryManager(),
    [ManagerName.platformSettings]: new PlatformSettingsManager(),
    [ManagerName.supportRequestSubjects]: new SupportRequestSubjectsManager(),
    [ManagerName.lendingTypes]: new LendingTypesManager(),
    [ManagerName.targetBeneficiaries]: new TargetBenefeficiariesManager(),
    [ManagerName.areasServed]: new AreasServedManager(),
    [ManagerName.impactAreas]: new ImpactAreasManager(),
    [ManagerName.subImpactAreas]: new SubImpactAreasManager(),
    [ManagerName.organizationTypes]: new OrganizationTypesManager(),
  };

  manager = <K extends ManagerName>(name: K): ManagerType[K] => {
    return this.managers[name];
  };

  subscribe = (
    name: ManagerName,
    setterFn: (store: DataStore) => void,
  ): IReactionDisposer => {
    const mgr = this.manager(name);

    mgr.init();
    return autorun((reaction) => {
      if (setterFn) {
        setterFn(mgr.store);
      } else {
        reaction.dispose();
      }
    });
  };
}

export const dataMan = new DataMan();
