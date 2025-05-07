import { MetricRecord } from 'types/metricTableItem';
import { AssignedMetric } from 'types/metric';
import { Contact } from 'types/company';
import { reportedDataTableConverters } from 'dataConverters/reportedDataTableConfig';
import { initialValues as reportingConfigDefaultValue } from '../steps/ReportedDataTableSetup/constants';
import { FormStep, PortfolioCompanyCreate } from '../types';

// converts store data into Save model
export const storeData2SaveModel = (
  storeData: any,
): Partial<PortfolioCompanyCreate> => {
  const general = storeData[FormStep.generalInfo] as any;
  const metrics = storeData[FormStep.customizeMetrics] as any;
  const reportingConfig = storeData[FormStep.reportingConfig] as any;
  const notifications = storeData[FormStep.notificationsSetup] as any;
  const library = storeData[FormStep.librarySetup] as any;

  return {
    general: {
      name: general?.name,
      description: general?.description,
      fiscalYearEnd: general?.fiscalYearEnd,
      investment: general?.investment ?? 0,
      investmentLife: {
        start: general?.investmentLife?.start,
        maturity: general?.investmentLife?.maturity,
      },
      contacts: [
        {
          primary: true,
          ...general?.primaryContact,
        },
        ...(general?.additionalContacts ?? [])
          .filter((item: Contact) => item.name && item.email)
          .map((item: Contact) => ({ ...item, id: undefined })),
      ],
      investmentType: general?.investmentType,
      tags: general?.tags ?? [],
      address: general?.address,
      reportingStartDate: general?.reportingStartDate,
    },
    requestedMetrics: metrics
      ? metrics.filter(
          (item: AssignedMetric & { isNew?: boolean }) => !item.isNew,
        )
      : undefined,
    createdMetrics: metrics
      ? metrics
          .filter((item: MetricRecord & { isNew?: boolean }) => item.isNew)
          .map((item: MetricRecord & { isNew: boolean }) => {
            const { isNew, id, key, ...metric } = item;
            return metric;
          })
      : undefined,
    reportingConfig: reportedDataTableConverters.client2Server(
      reportingConfig ?? reportingConfigDefaultValue,
    ),
    notifications: {
      ...notifications,
      forPC: {
        initial: {
          ...notifications?.forPC?.initial,
          email:
            (general?.additionalContacts ?? []).find(
              (item: Contact) =>
                item.id === notifications?.forPC?.initial?.email,
            )?.email ?? general?.primaryContact?.email,
        },
        pastDue: {
          ...notifications?.forPC?.pastDue,
          email:
            (general?.additionalContacts ?? []).find(
              (item: Contact) =>
                item.id === notifications?.forPC?.pastDue?.email,
            )?.email ?? general?.primaryContact?.email,
        },
        upcoming: {
          ...notifications?.forPC?.upcoming,
          email:
            (general?.additionalContacts ?? []).find(
              (item: Contact) =>
                item.id === notifications?.forPC?.upcoming?.email,
            )?.email ?? general?.primaryContact?.email,
        },
      },
    },
    library: library
      ? {
          templateId: library.templateId,
          createFolders: (library.createFolders ?? []).map((folder: any) => ({
            name: folder.name,
            frequency: folder.frequency,
            description: folder.description,
          })),
          createSubFolders: [],
        }
      : undefined,
  };
};
