import React, { ReactNode, ReactElement } from 'react';
import { EditFilled, WarningFilled, UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { ActionItem, Activity } from '../../../../types';
import { sortByString } from '../../../../tools';
import { ActionValue } from './constants';
import styles from '../../../../forms/AdminForms/CdfiEdit/CdfiForm.module.scss';
import { cdfiStore, userStore } from 'store';

export const cdfiDefaultDashboardColumns = (
  history: any,
  setShowUploadModal: (value: boolean) => void,
  setDocumentTypeId: (value: any) => void,
  setYear: (value: number) => void,
  setQuarter: (value: number) => void,
): ColumnProps<ActionItem>[] => {
  const { setCdfiId, cdfiId } = cdfiStore;

  const onEditDataClick =
    (cdfiId: number, year: number, quarter: number) => () => {
      setCdfiId(cdfiId);
      if (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) {
        history.push(`/edit-data/${year}/${quarter}/${cdfiId}`);
      } else {
        history.push(`/cdfi/${cdfiId}/edit-data/${year}/${quarter}`);
      }
    };

  const onUploadClick =
    (cdfiId: number, documentTypeId: number, year: number, quarter: number) =>
    () => {
      setCdfiId(cdfiId);
      setShowUploadModal(true);
      setDocumentTypeId(documentTypeId);
      setYear(year);
      setQuarter(quarter);
    };

  const formatSummary = (
    title: string,
    days: number,
    quarter: string,
  ): ReactElement => {
    let dueStr: ReactElement | string = '';
    if (days < -1) {
      dueStr = (
        <>
          was due
          {<span className={styles.warningColor}> {Math.abs(days)} days </span>}
          ago
        </>
      );
    } else if (days === -1) {
      dueStr = 'was due yesterday';
    } else if (days === 0) {
      dueStr = 'is due today';
    } else if (days === 1) {
      dueStr = 'is due tomorrow';
    } else {
      dueStr = (
        <>
          is due in {<span className={styles.warningColor}> {days} days </span>}
        </>
      );
    }

    let idxDue = -1;
    let titleStr = '';

    if (title.indexOf('was due') > -1) {
      idxDue = title.indexOf('was due');
      titleStr = title.substring(0, idxDue);
    } else if (title.indexOf('is due') > -1) {
      idxDue = title.indexOf('is due');
      titleStr = title.substring(0, idxDue);
    } else {
      titleStr = title;
    }

    return (
      <>
        <WarningFilled className={styles.warningColor} /> {titleStr} {dueStr}
      </>
    );
  };

  const getEditButton = (
    action: string,
    year: number,
    quarter: number,
    documentTypeId: number,
  ): ReactElement => {
    if (action === ActionValue.QUARTERLY_UPLOAD) {
      return (
        <>
          <Button
            title="Upload Data"
            className={styles.editButton}
            onClick={onUploadClick(cdfiId, documentTypeId, year, quarter)}
            name="upload"
            icon={<UploadOutlined />}
          >
            Upload
          </Button>
        </>
      );
    } else if (action === ActionValue.ENTER_WEBFORM) {
      return (
        <>
          <Button
            title="Edit Data"
            className={styles.editButton}
            onClick={onEditDataClick(cdfiId, year, quarter)}
            name="edit-data"
            icon={<EditFilled />}
          >
            Edit Data
          </Button>
        </>
      );
    } else {
      return <></>;
    }
  };

  return [
    {
      width: 250,
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      sorter: (a, b): number => sortByString(a.action, b.action),
    },
    {
      title: 'Summary',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b): number => sortByString(a.title, b.title),
      render: (value, record): ReactNode => (
        <>{formatSummary(record.title, record.daysUntilDue, record.quarter)}</>
      ),
    },
    {
      width: 150,
      title: '',
      dataIndex: 'actions',
      align: 'center',
      render: (value, record): ReactNode => (
        <>
          {getEditButton(
            record.action,
            record.fiscalYear,
            record.fiscalQuarter,
            record.documentTypeId,
          )}
        </>
      ),
    },
  ];
};

export const cdfiDefaultDashboardActivityColumns: ColumnProps<Activity>[] = [
  {
    width: 250,
    title: 'Organization Name',
    dataIndex: 'company',
    key: 'company',
    sorter: (a, b): number => sortByString(a.company, b.company),
  },
  {
    title: 'Activity Summary',
    dataIndex: 'plainSummary',
    key: 'plainSummary',
    sorter: (a, b): number => sortByString(a.plainSummary, b.plainSummary),
    render: (plainSummary: string) => (
      <div className={styles.activitySummary}>{plainSummary}</div>
    ),
  },
];
