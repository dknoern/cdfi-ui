import React, { ReactNode } from 'react';
import {
  Notification,
  NotificationType,
  FileUploadedMeta,
  DataInputMeta,
  MetricValueChangeRequestMeta,
  MetricReportResponseMeta,
  MetricReportRequestMeta,
  AllRequiredDataProvidedMeta,
  Portfolio,
} from 'types';
import { SorterFn, VoidFn } from 'types/misc';
import { desc, sortByField } from 'tools/sort';
import { userStore } from 'store';
import { MVCRStore } from 'store/MVCRStore';
import { RedirectFn } from './types';
import styles from './NeedsAttention.module.scss';

const highlight = (value: string | number): ReactNode => {
  return <span className={styles.highlightedText}>{value.toString()}</span>;
};

export const formatMessage = (notification: Notification): ReactNode => {
  const { type, message: defaultMessage, sender, metaData } = notification;
  let meta;

  try {
    switch (type) {
      case NotificationType.FILE_UPLOADED:
        meta = metaData as FileUploadedMeta;
        return (
          <>
            {highlight(sender.name)} has uploaded file{' '}
            {highlight(meta.document)} to {highlight(meta.folder)} folder for{' '}
            {highlight(`${meta.year}Q${meta.quarter}`)} period.
          </>
        );
      case NotificationType.DATA_INPUT:
        meta = metaData as DataInputMeta;
        if (meta.metrics.length === 2) {
          return (
            <>
              {highlight(sender.name)} has entered data for metrics{' '}
              {highlight(meta.metrics[0])} and {highlight(meta.metrics[1])} for{' '}
              {highlight(`${meta.year}Q${meta.quarter}`)} period.
            </>
          );
        }
        if (meta.metrics.length > 2) {
          return (
            <>
              {highlight(sender.name)} has entered data for metric{' '}
              {highlight(meta.metrics[0])} and{' '}
              {highlight(meta.metrics.length - 1)} more for{' '}
              {highlight(`${meta.year}Q${meta.quarter}`)} period.
            </>
          );
        }
        return (
          <>
            {highlight(sender.name)} has entered data for metric{' '}
            {highlight(meta.metrics[0])} for{' '}
            {highlight(`${meta.year}Q${meta.quarter}`)} period.
          </>
        );
      case NotificationType.METRIC_VALUE_CHANGE_REQUEST:
        meta = metaData as MetricValueChangeRequestMeta;
        return (
          <>
            {highlight(sender.name)} has requested a change for metric{' '}
            {highlight(meta.metricName)} for{' '}
            {highlight(`${meta.year}Q${meta.quarter}`)} period.
          </>
        );
      case NotificationType.METRIC_VALUE_CHANGE_REQUEST_REVIEWED:
        meta = metaData as MetricValueChangeRequestMeta;
        return (
          <>
            {highlight(sender.name)} has {meta.status.toLowerCase()} a change
            for metric {highlight(meta.metricName)} for{' '}
            {highlight(`${meta.year}Q${meta.quarter}`)} period.
          </>
        );
      case NotificationType.METRIC_REPORT_REQUEST:
        meta = metaData as MetricReportRequestMeta;
        if (meta.metrics.length === 2) {
          return (
            <>
              {highlight(sender.name)} has requested metrics
              {highlight(meta.metrics[0])} and {highlight(meta.metrics[1])}.
            </>
          );
        }
        if (meta.metrics.length > 2) {
          return (
            <>
              {highlight(sender.name)} has requested metric{' '}
              {highlight(meta.metrics[0])} and{' '}
              {highlight(meta.metrics.length - 1)} more.
            </>
          );
        }
        return (
          <>
            {highlight(sender.name)} has requested metric{' '}
            {highlight(meta.metrics[0])}.
          </>
        );
      case NotificationType.METRIC_REPORT_RESPONSE:
        meta = metaData as MetricReportResponseMeta;
        if (meta.metrics.length === 2) {
          return (
            <>
              {highlight(sender.name)} has {meta.status.toLowerCase()} metrics
              {highlight(meta.metrics[0])} and {highlight(meta.metrics[1])}.
            </>
          );
        }
        if (meta.metrics.length > 2) {
          return (
            <>
              {highlight(sender.name)} has {meta.status.toLowerCase()} metric{' '}
              {highlight(meta.metrics[0])} and{' '}
              {highlight(meta.metrics.length - 1)} more.
            </>
          );
        }
        return (
          <>
            {highlight(sender.name)} has {meta.status.toLowerCase()} metric{' '}
            {highlight(meta.metrics[0])}.
          </>
        );
      case NotificationType.ALL_REQUIRED_DATA_PROVIDED:
        meta = metaData as AllRequiredDataProvidedMeta;
        return (
          <>
            {highlight(sender.name)} has provided all required data for{' '}
            {highlight(`${meta.year}Q${meta.quarter}`)} period.
          </>
        );
      default:
        return defaultMessage;
    }
  } catch (error) {
    return defaultMessage;
  }
};

export const onNotificationClick = (
  notification: Notification,
  redirect: RedirectFn,
  portfolioId: Portfolio['id'] | undefined,
  pathname: string,
): VoidFn => {
  const { type, sender, metaData } = notification;
  const { isFM, isPremium, isAerisAdmin: isAdmin } = userStore;
  let meta;
  let url = '';
  let state: any;

  try {
    switch (type) {
      case NotificationType.FILE_UPLOADED:
        if (isFM && isPremium) {
          url = `/libraries/portfolio/${portfolioId}/company/${sender.id}`;
        } else if (isFM) {
          url = `/libraries/company/${sender.id}`;
        } else if (!isAdmin) {
          url = '/libraries/';
        }
        break;
      case NotificationType.DATA_INPUT:
        if (isFM && isPremium) {
          url = `/dashboard/portfolio/${portfolioId}/company/${sender.id}`;
        } else if (isFM) {
          url = `/dashboard/company/${sender.id}`;
        } else if (!isAdmin) {
          url = '/dashboard/';
        }
        break;
      case NotificationType.METRIC_VALUE_CHANGE_REQUEST:
      case NotificationType.METRIC_VALUE_CHANGE_REQUEST_REVIEWED:
        meta = metaData as MetricValueChangeRequestMeta;
        if (type === NotificationType.METRIC_VALUE_CHANGE_REQUEST) {
          const { year, quarter, metricId } = meta;
          state = {
            metricId,
            period: { year, quarter },
            manageRequest: true,
          };
        }
        if (isFM && isPremium) {
          url = `/dashboard/portfolio/${portfolioId}/company/${sender.id}`;
        } else if (isFM) {
          url = `/dashboard/company/${sender.id}`;
        } else if (!isAdmin) {
          url = '/datainput';
        }
        break;
      case NotificationType.METRIC_REPORT_REQUEST:
        url = 'metrics';
        break;
      case NotificationType.METRIC_REPORT_RESPONSE:
        if (isFM && isPremium) {
          url = `/metrics/portfolio/${portfolioId}/company/${sender.id}`;
        } else if (isFM) {
          url = `/metrics/company/${sender.id}`;
        }
        break;
      default:
        return (): void => {};
    }

    return (): void => {
      if (
        type === NotificationType.METRIC_VALUE_CHANGE_REQUEST &&
        (pathname.includes('datainput') ||
          (isFM && pathname.includes('dashboard')))
      ) {
        MVCRStore.reload();
      }
      // need time to update store
      setTimeout(() => {
        redirect(url, state);
      }, 0);
    };
  } catch (e) {
    return (): void => {};
  }
};

export const beautifyDate = (dateUnix: number): string => {
  const currentDate = new Date();
  const date = new Date(dateUnix);

  const diffMinutes = Math.round(
    Math.abs(currentDate.getTime() - date.getTime()) / (1000 * 60),
  );
  if (diffMinutes < 1) {
    return 'just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}min`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays}d`;
  }

  const diffWeeks = Math.round(diffDays / 7);
  if (diffWeeks < 4) {
    return `${diffWeeks}w`;
  }

  const diffMonths = Math.round(diffWeeks / 4);
  if (diffMonths < 12) {
    return `${diffMonths}m`;
  }

  const diffYears = Math.round(diffDays / 365);
  return `${diffYears}y`;
};

export const sortFn: SorterFn = desc(sortByField('sentDate'));
