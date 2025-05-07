import { generatePath } from 'react-router-dom';
import { cdfiStore } from 'store';
import { subscriberStore } from 'store';

const { setCdfiId } = cdfiStore;
const { viewModeConfig : cdfiConfig } = cdfiStore;
const { setSubscriberId } = subscriberStore;
const { viewModeConfig: subscriberConfig } = subscriberStore;

export const provitionlRoutes = (path: string) => {
  if (path === '/dashboard') {
    setCdfiId(null);
    setSubscriberId(null);
  }
  if (
    path === '/manage/cdfi/:id' ||
    '/manage/cdfi/:id/org-details' ||
    '/manage/cdfi/:id/subscribers' ||
    '/manage/cdfi/:id/ratings' ||
    '/manage/cdfi/:id/financials' ||
    '/manage/cdfi/:id/performance-maps' ||
    '/manage/cdfi/:id/library' ||
    '/manage/cdfi/:id/graphs' ||
    '/manage/cdfi/:id/metrics' ||
    '/manage/subscriber/:id' ||
    '/manage/cdfi/:id/mapper' ||
    '/manage/cdfi/:id/supplemental'
  ) {
    // TODO: Investigate why pulling the cdfiId from the store is null at 1st load
    // Using viewModeConfig instead before refactoring this code

    let idNumber = cdfiConfig.cdfiId;
    if (path.includes('manage/subscriber')) {
      idNumber = subscriberConfig.subscriberId;
    }

    const id = idNumber?.toString();
    return id ? generatePath(path, { id }) : path;
  }
  return path;
};
