import { ColumnProps } from 'antd/lib/table';
import { Activity } from './activity';

export interface ActionItemBase {
  id: string;
  title: string;
  daysUntilDue: number;
  quarter: string;
  action: string;
  fiscalYear: number;
  fiscalQuarter: number;
  documentTypeId: number;
}

export type ActionItem = ActionItemBase;

export type CdfiActionItemFormData = Pick<
  ActionItem,
  'id' | 'title' | 'daysUntilDue' | 'quarter' | 'action'
>;

export type OperationName = 'edit';

export type CdfiDashboardActionPerformer = (
  operationName: OperationName,
  id: ActionItem['id'],
  currentValue: ActionItem[],
) => void;

export type CdfiActionItemActionHandlerCaller = (
  operationName: OperationName,
  id: ActionItem['id'],
) => void;

export type ColumnGeneratorCdfiDashboard = (
  handleCaller: CdfiActionItemActionHandlerCaller,
  isCreateView?: boolean,
) => ColumnProps<ActionItem>[];

export type ColumnGeneratorCdfiActivityDashboard =
  () => ColumnProps<Activity>[];
