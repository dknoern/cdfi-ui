import { comparer, IReactionDisposer, reaction } from 'mobx';
import { VoidFn } from 'types';
import { dataMan, ManagerName } from 'dataManagement/managers';

const reportedDataTableConfigMan = dataMan.manager(
  ManagerName.reportedDataTableConfig,
);

export const subscribeToReportedDataTableConfigUpdates = (
  onValueChange: VoidFn,
): IReactionDisposer =>
  reaction(() => reportedDataTableConfigMan.store.data, onValueChange, {
    equals: (prev, next) =>
      (!prev && next) || // This prevents refreshing when the config loads for the first time
      comparer.shallow(prev, next),
  });
