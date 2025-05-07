import React from 'react';
import { CdfiSubscription, RatingReport } from 'types';

type RatingReportWithKey = RatingReport & {
  key: React.Key;
};

export type CdfiSubscriptionTableData = CdfiSubscription & {
  children: RatingReportWithKey[];
  key: React.Key;
};
let counter = 100;
export const transformCdfiSubscriptionsToTableData = (
  cdfiSubscriptions: CdfiSubscription[],
): CdfiSubscriptionTableData[] => {
  const tableDataWithKeys = cdfiSubscriptions.map(
    (subscription: CdfiSubscription, i: number): CdfiSubscriptionTableData => {
      const children = subscription.reports.map(
        (report): RatingReportWithKey => {
          return { key: counter++, ...report };
        },
      );
      return { children: children, key: counter++, ...subscription };
    },
  );

  return tableDataWithKeys;
};
