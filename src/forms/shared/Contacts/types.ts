import { ColumnProps } from 'antd/lib/table';
import {
  CdfiContact,
  REContact,
  TransformedItem,
  SubscriberContact,
  SubscriberSubscriptionEditFormData,
} from 'types';

export type TableItem = Omit<CdfiContact, 'name' | 'surname'> & {
  fullName: string;
};

export type TableItemSubscriberContact = Omit<
  SubscriberContact,
  'name' | 'surname'
> & {
  fullName: string;
};

export type TableItemSubscriberSubscription = Omit<
  SubscriberSubscriptionEditFormData,
  | 'isRatingReports'
  | 'cdfiCountRatingReports'
  | 'isPerformanceMaps'
  | 'cdfiCountPerformanceMaps'
  | 'isPeerGroups'
  | 'isShowPeerMetrics'
  | 'isFactSheets'
  | 'isLibrary'
  | 'cdfis'
>;

export type UserActionHandler = (
  id: REContact['id'],
  currentValue: REContact[],
) => void;

export type ColumnGenerator = (
  handleCaller: UserActionHandlerCaller,
  isCreateView?: boolean,
) => ColumnProps<TableItem>[];

export type ColumnGeneratorSubscriberContact = (
  handleCaller: SubscriberContactActionHandlerCaller,
  isCreateView?: boolean,
) => ColumnProps<TableItemSubscriberContact>[];

export type ColumnGeneratorSubscriberSubscription = (
  handleCaller: SubscriberSubscriptionActionHandlerCaller,
  isCreateView?: boolean,
) => ColumnProps<TableItemSubscriberSubscription>[];

export type OperationName =
  | 'setPrimary'
  | 'toggleActive'
  | 'edit'
  | 'delete'
  | 'map'
  | 'upload'
  | 'affirmAsCurrent'
  | 'addNote'
  | 'viewNote'
  | 'impersonate'
  | 'approveDoc'
  | 'disapproveDoc';

export type UserActionHandlerCaller = (
  operationName: OperationName,
  id: REContact['id'],
) => void;

export type SubscriberContactActionHandlerCaller = (
  operationName: OperationName,
  id: SubscriberContact['id'],
) => void;

export type SubscriberSubscriptionActionHandlerCaller = (
  operationName: OperationName,
  id: SubscriberSubscriptionEditFormData['id'],
) => void;

export type UserActionPerformer = (
  operationName: OperationName,
  id: REContact['id'],
  currentValue: REContact[],
) => void;

export type CdfiContactActionPerformer = (
  operationName: OperationName,
  id: CdfiContact['id'],
  currentValue: CdfiContact[],
) => void;

export type LibraryActionPerformer = (
  operationName: OperationName,
  id: TransformedItem['id'],
  reviewId: TransformedItem['reviewId'],
  currentValue: TransformedItem[],
) => void;

export type AerisUserActionHandlerCaller = (
  operationName: OperationName,
  id: TransformedItem['id'],
  currentValue?: TransformedItem,
) => void;

export type ColumnGeneratorAerisLibrary = (
  handleCaller: AerisUserActionHandlerCaller,
  isCreateView?: boolean,
  expandIcon?: any,
) => ColumnProps<TransformedItem>[];

export type SubscriberContactActionPerformer = (
  operationName: OperationName,
  id: SubscriberContact['id'],
  currentValue: SubscriberContact[],
) => void;

export type SubscriberSubscriptionActionPerformer = (
  operationName: OperationName,
  id: SubscriberSubscriptionEditFormData['id'],
  currentValue: SubscriberSubscriptionEditFormData[],
) => void;
