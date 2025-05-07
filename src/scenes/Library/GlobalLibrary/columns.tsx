import React, { MouseEventHandler, ReactElement } from 'react';
import { Button, Tooltip } from 'antd';
import {
  DeleteFilled,
  DislikeFilled,
  LikeFilled,
  EyeOutlined,
  SlidersOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styles from '../../../components/LibraryTable/LibraryTable.module.scss';
import {
  ColumnGeneratorAerisLibrary,
  OperationName,
} from '../../../forms/shared/Contacts/types';
import { setIcon } from '../tools';
import moment from 'moment';
import { thumbsTooltip } from './constants';
import { userStore } from '../../../store';

export const libraryColumns: ColumnGeneratorAerisLibrary = (handle) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const operationName = e.currentTarget.name as OperationName;
    handle(operationName, Number(e.currentTarget.value));
  };

  return [
    {
      width: 400,
      title: 'Tools & Resources',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      width: 100,
      title: 'Folder Completion',
      dataIndex: 'dueType',
      key: 'dueType',
      render: (dueType): ReactElement => <>{setIcon(dueType)}</>,
    },
    {
      width: 75,
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated}
          {record.dueType && record.dueType !== 'NOT_REQUIRED' && !dateCreated && (
            <Button
              onClick={clickHandler}
              type="default"
              name="upload"
              value={record.id}
              icon={<UploadOutlined />}
            >
              Upload
            </Button>
          )}
        </>
      ),
    },
    {
      width: 25,
      title: '',
      dataIndex: 'dateCreated',
      key: 'delete',
      align: 'center',
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated ? (
            <div className={styles.deleteIconAerisLib}>
              <Button
                icon={<DeleteFilled />}
                onClick={clickHandler}
                type="default"
                name="delete"
                value={record.id}
              />
            </div>
          ) : null}
        </>
      ),
    },
  ];
};

export const libraryCdfiColumns: ColumnGeneratorAerisLibrary = (handle) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const operationName = e.currentTarget.name as OperationName;
    handle(operationName, Number(e.currentTarget.value));
  };

  return [
    {
      width: 400,
      title: '',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      width: 100,
      title: 'Action Requested',
      dataIndex: 'dueType',
      key: 'dueType',
      align: 'center',
      render: (dueType): ReactElement => <>{setIcon(dueType)}</>,
    },
    {
      width: 75,
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated}
          {record.dueType &&
          record.dueType !== 'NOT_REQUIRED' &&
          !dateCreated &&
          !userStore.isSubscriber ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="upload"
              value={record.id}
              icon={<UploadOutlined />}
            >
              Upload
            </Button>
          ) : null}
        </>
      ),
    },
    {
      width: 100,
      dataIndex: '',
      key: 'isInitialsRequired',
      render: (isInitialsRequired, record): ReactElement => (
        <>
          {record.isInitialsRequired &&
          !userStore.isSubscriber &&
          record.id !== 46 ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="affirmAsCurrent"
              value={record.id}
            >
              Affirm as Current
            </Button>
          ) : (
            <>
              {record.needToShowInitials && !record.isInitialsRequired ? (
                <p>
                  {record.initialsRecord?.initials} (
                  {moment(record.initialsRecord?.dateStamp).format(
                    'MM/DD/YYYY',
                  )}
                  )
                </p>
              ) : null}
            </>
          )}
        </>
      ),
    },
    {
      width: 100,
      dataIndex: '',
      key: 'isNoteRequired',
      render: (isNoteRequired, record): ReactElement => (
        <>
          {record.isNoteRequired && !userStore.isSubscriber ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="addNote"
              value={record.id}
            >
              Add a Note
            </Button>
          ) : null}
        </>
      ),
    },
    {
      width: 25,
      align: 'center',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (dateCreated, record): ReactElement => (
        <>
          {record.isNote ? (
            <div className={styles.deleteIconAerisLib}>
              <Button
                icon={<EyeOutlined />}
                onClick={clickHandler}
                type="default"
                name="viewNote"
                value={record.id}
              />
            </div>
          ) : null}
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'dateCreated',
      key: 'delete',
      align: 'center',
      width: 50,
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated && !record.isNote && !userStore.isSubscriber ? (
            <div className={styles.deleteIconAerisLib}>
              <Button
                icon={<DeleteFilled />}
                onClick={clickHandler}
                type="default"
                name="delete"
                value={record.id}
              />
            </div>
          ) : null}
        </>
      ),
    },
  ];
};

export const libraryContractorCdfiColumns: ColumnGeneratorAerisLibrary = (handle) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const operationName = e.currentTarget.name as OperationName;
    handle(operationName, Number(e.currentTarget.value));
  };

  return [
    {
      title: '',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Action Requested',
      dataIndex: 'dueType',
      key: 'dueType',
      align: 'center',
      render: (dueType): ReactElement => <>{setIcon(dueType)}</>,
      width: 150,
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
      width: 110,
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated}
          {record.dueType && record.dueType !== 'NOT_REQUIRED' && !dateCreated && (
            <Button
              onClick={clickHandler}
              type="default"
              name="upload"
              value={record.id}
              icon={<UploadOutlined />}
            >
              Upload
            </Button>
          )}
        </>
      ),
    },
    {
      dataIndex: '',
      key: 'isInitialsRequired',
      align: 'center',
      width: 150,
      render: (isInitialsRequired, record): ReactElement => (
        <>
          {record.isInitialsRequired && record.id !== 46 ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="affirmAsCurrent"
              value={record.id}
            >
              Affirm as Current
            </Button>
          ) : (
            <>
              {record.needToShowInitials && !record.isInitialsRequired ? (
                <p>
                  {record.initialsRecord?.initials} (
                  {moment(record.initialsRecord?.dateStamp).format(
                    'MM/DD/YYYY',
                  )}
                  )
                </p>
              ) : null}
            </>
          )}
        </>
      ),
    },
    {
      dataIndex: '',
      key: 'isNoteRequired',
      width: 100,
      render: (isNoteRequired, record): ReactElement => (
        <>
          {record.isNoteRequired ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="addNote"
              value={record.id}
            >
              Add a Note
            </Button>
          ) : null}
        </>
      ),
    },
    {
      align: 'center',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
      width: 50,
      render: (approvedBy, record): ReactElement => {
        const node =
          record.parentId === 'AERIS - Report' && record.approvedBy ? (
            <Tooltip
              placement="left"
              color={thumbsTooltip.approvedColor}
              title={thumbsTooltip.approved}
            >
              <Button
                className={styles.thumbs}
                icon={<LikeFilled />}
                onClick={clickHandler}
                value={record.id}
                name="disapproveDoc"
              />
            </Tooltip>
          ) : (
            <Tooltip
              placement="left"
              color={thumbsTooltip.disapprovedColor}
              title={thumbsTooltip.disapproved}
            >
              <Button
                className={`${styles.thumbs} ${styles.lightOpacity}`}
                icon={<DislikeFilled />}
                onClick={clickHandler}
                value={record.id}
                name="approveDoc"
              />
            </Tooltip>
          );

        return (
          <>
            {record.parentId === 'AERIS - Report' &&
              record.name !== 'Annual Review' &&
              record.name !== 'Full Analysis' &&
              record.name !== 'FYE Update' &&
              node}
          </>
        );
      },
    },
    {
      align: 'center',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      width: 50,
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated &&
          !record.isNote &&
          (record.parentId === 'Quarterly Financials' || record.documentTypeName === 'Annual Supplemental Data') ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="map"
              value={record.key}
              className={styles.mapperIcon}
              icon={<SlidersOutlined />}
            />
          ) : null}
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'dateCreated',
      key: 'delete',
      align: 'center',
      width: 50,
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated && !record.isNote ? (
            <div className={styles.deleteIconAerisLib}>
              <Button
                icon={<DeleteFilled />}
                onClick={clickHandler}
                type="default"
                name="delete"
                value={record.id}
              />
            </div>
          ) : record.isNote ? (
            <div className={styles.deleteIconAerisLib}>
              <Button
                icon={<EyeOutlined />}
                onClick={clickHandler}
                type="default"
                name="viewNote"
                value={record.id}
              />
            </div>
          ) : null}
        </>
      ),
    },
  ];
};

export const libraryAdminCdfiColumns: ColumnGeneratorAerisLibrary = (
  handle,
) => {
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    const operationName = e.currentTarget.name as OperationName;
    handle(operationName, Number(e.currentTarget.value));
  };

  return [
    {
      title: '',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Action Requested',
      dataIndex: 'dueType',
      key: 'dueType',
      align: 'center',
      render: (dueType): ReactElement => <>{setIcon(dueType)}</>,
      width: 150,
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      align: 'center',
      width: 110,
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated}
          {record.dueType && record.dueType !== 'NOT_REQUIRED' && !dateCreated && (
            <Button
              onClick={clickHandler}
              type="default"
              name="upload"
              value={record.id}
              icon={<UploadOutlined />}
            >
              Upload
            </Button>
          )}
        </>
      ),
    },
    {
      dataIndex: '',
      key: 'isInitialsRequired',
      align: 'center',
      width: 150,
      render: (isInitialsRequired, record): ReactElement => (
        <>
          {record.isInitialsRequired && record.id !== 46 ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="affirmAsCurrent"
              value={record.id}
            >
              Affirm as Current
            </Button>
          ) : (
            <>
              {record.needToShowInitials && !record.isInitialsRequired ? (
                <p>
                  {record.initialsRecord?.initials} (
                  {moment(record.initialsRecord?.dateStamp).format(
                    'MM/DD/YYYY',
                  )}
                  )
                </p>
              ) : null}
            </>
          )}
        </>
      ),
    },
    {
      dataIndex: '',
      key: 'isNoteRequired',
      width: 100,
      render: (isNoteRequired, record): ReactElement => (
        <>
          {record.isNoteRequired ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="addNote"
              value={record.id}
            >
              Add a Note
            </Button>
          ) : null}
        </>
      ),
    },
    {
      align: 'center',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
      width: 50,
      render: (approvedBy, record): ReactElement => {
        const node =
          record.parentId === 'AERIS - Report' && record.approvedBy ? (
            <Tooltip
              placement="left"
              color={thumbsTooltip.approvedColor}
              title={thumbsTooltip.approved}
            >
              <Button
                className={styles.thumbs}
                icon={<LikeFilled />}
                onClick={clickHandler}
                value={record.id}
                name="disapproveDoc"
              />
            </Tooltip>
          ) : (
            <Tooltip
              placement="left"
              color={thumbsTooltip.disapprovedColor}
              title={thumbsTooltip.disapproved}
            >
              <Button
                className={`${styles.thumbs} ${styles.lightOpacity}`}
                icon={<DislikeFilled />}
                onClick={clickHandler}
                value={record.id}
                name="approveDoc"
              />
            </Tooltip>
          );

        return (
          <>
            {record.parentId === 'AERIS - Report' &&
              record.name !== 'Annual Review' &&
              record.name !== 'Full Analysis' &&
              record.name !== 'FYE Update' &&
              node}
          </>
        );
      },
    },
    {
      align: 'center',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      width: 50,
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated &&
          !record.isNote &&
          (record.parentId === 'Quarterly Financials' || record.documentTypeName === 'Annual Supplemental Data') ? (
            <Button
              onClick={clickHandler}
              type="default"
              name="map"
              value={record.key}
              className={styles.mapperIcon}
              icon={<SlidersOutlined />}
            />
          ) : null}
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'dateCreated',
      key: 'delete',
      align: 'center',
      width: 50,
      render: (dateCreated, record): ReactElement => (
        <>
          {dateCreated && !record.isNote ? (
            <div className={styles.deleteIconAerisLib}>
              <Button
                icon={<DeleteFilled />}
                onClick={clickHandler}
                type="default"
                name="delete"
                value={record.id}
              />
            </div>
          ) : record.isNote ? (
            <div className={styles.deleteIconAerisLib}>
              <Button
                icon={<EyeOutlined />}
                onClick={clickHandler}
                type="default"
                name="viewNote"
                value={record.id}
              />
            </div>
          ) : null}
        </>
      ),
    },
  ];
};
