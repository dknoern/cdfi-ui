import React, { ReactNode } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { sortByBoolean } from 'tools';
import { CdfiSubscription, RatingReport, VoidFn } from 'types';
import { Button, Tooltip } from 'antd';
import {
  EyeOutlined,
  ReadOutlined,
  FundOutlined,
  AuditOutlined,
  DownloadOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { downloadStaticDocumentParameter } from 'dataManagement/operations/documentOperations';
import {cdfiStore, subscriberStore, userStore} from 'store';

export const createSubscriptionsColumns = (
  reload: VoidFn,
  history: any,
): ColumnProps<CdfiSubscription>[] => {
  const downloadToolTipText = 'Download this report.';
  const downloadedToolTipText = 'Download this report again.';
  const cantDownloadedToolTipText =
    "You don't have permission to download this report.";

  const onDownloadClick = (documentId: number) => () => {
    downloadStaticDocumentParameter(
      'cdfiSubscriptionsDownload',
      documentId.toString(),
      'cdfiSubscriptionsDownload',
    ).then(reload);
  };

  const { setCdfiId } = cdfiStore;
  const { subscriberId} = subscriberStore;

  const onViewCdfiClick = (cdfiId: number) => () => {
    setCdfiId(cdfiId);
    history.push(`/cdfi/${cdfiId}`);
  };

  const onLibraryClick = (cdfiId: number) => () => {
    setCdfiId(cdfiId);
    history.push(`/cdfi/${cdfiId}/library`);
  };

  const onPerformanceMapsClick = (cdfiId: number) => () => {
    setCdfiId(cdfiId);
    history.push(`/cdfi/${cdfiId}/performance-maps`);
  };

  const onAerisExplorerClick = (cdfiId: number) => () => {
    setCdfiId(cdfiId);
    if (userStore.isSubscriber) {
      history.push(`/aerisExplorer/cdfi/${cdfiId}`);
    } else {
      history.push(`/aerisExplorer/subscriber/${subscriberId}/cdfi/${cdfiId}`);
    }
  };

  const getHasBeenDownloadedIcon = (report: RatingReport): ReactNode => {
    return (
      <Tooltip
        title={
          report.documentId === 0
            ? cantDownloadedToolTipText
            : report.hasBeenDownloaded
            ? downloadedToolTipText
            : downloadToolTipText
        }
      >
        <span>
          {report.hasBeenDownloaded ? (
            <Button
              type="link"
              onClick={onDownloadClick(getDocumentId(report))}
              disabled={report.documentId === 0}
            >
              <CheckOutlined />
            </Button>
          ) : (
            <Button
              type="link"
              onClick={onDownloadClick(getDocumentId(report))}
              disabled={report.documentId === 0}
            >
              <DownloadOutlined />
            </Button>
          )}
        </span>
      </Tooltip>
    );
  };
  const getReportDateRender = (report: RatingReport): ReactNode => {
    return (
      <span>
        {report.reportDate} {getHasBeenDownloadedIcon(report)}
      </span>
    );
  };
  const getDocumentId = (report: RatingReport): number => {
    return report.documentId;
  };

  return [
    {
      key: 'cdfiName',
      dataIndex: 'cdfiName',
      width: 230,
      title: 'CDFI',
      sorter: (a, b): number => ('' + a.cdfiName).localeCompare(b.cdfiName),
    },
    {
      key: 'ratingStatus',
      dataIndex: 'isRated',
      title: 'Rating Status',
      width: 110,
      sorter: (a, b): number => sortByBoolean(a.isRated, b.isRated),
      render: (value, row): ReactNode => (
        <span>{row.cdfiId ? (value ? 'Rated' : 'Not Rated') : ''}</span>
      ),
    },
    {
      key: 'ratingReport',
      dataIndex: 'ratingReport',
      title: 'Rating Report',
      width: 100,
      render: (value, row): ReactNode => {
        return (
          <p>
            {row.reports[0]?.ratingReport === undefined
              ? ''
              : row.reports[0]?.ratingReport}
          </p>
        );
      },
    },
    {
      key: 'reportDate',
      dataIndex: 'reportDate',
      title: 'Report Date',
      width: 130,
      render: (value, row): ReactNode => {
        return row.reports.length > 0 ? (
          <span>
            {getReportDateRender(row.reports[0] as unknown as RatingReport)}
          </span>
        ) : (
          ''
        );
      },
    },
    {
      key: 'aerisExplorer',
      dataIndex: 'hasPeerGroupAccess',
      title: 'Aeris® Explorer',
      width: 100,
      align: 'center',
      sorter: (a, b): number =>
        sortByBoolean(a.hasPeerGroupAccess, b.hasPeerGroupAccess),
      render: (value: boolean, row): ReactNode => (
        <Tooltip title="View this CDFI's Aeris® Explorer" placement="left">
          <span>
            {value ? (
              <Link
                onClick={onAerisExplorerClick(row.cdfiId)}
                to="#"
                style={{ color: 'black' }}
              >
                <AuditOutlined />
              </Link>
            ) : (
              ''
            )}
          </span>
        </Tooltip>
      ),
    },
    {
      key: 'performanceMap',
      dataIndex: 'hasFinancialsAccess',
      title: 'Performance Map',
      width: 100,
      align: 'center',
      sorter: (a, b): number =>
        sortByBoolean(a.hasFinancialsAccess, b.hasFinancialsAccess),
      render: (value: boolean, row): ReactNode => (
        <Tooltip title="View this CDFI's Performance Map">
          <span>
            {value ? (
              <Link
                onClick={onPerformanceMapsClick(row.cdfiId)}
                to="#"
                style={{ color: 'black' }}
              >
                <FundOutlined />
              </Link>
            ) : (
              ''
            )}
          </span>
        </Tooltip>
      ),
    },
    {
      key: 'performanceMap',
      dataIndex: 'hasLibraryAccess',
      title: 'Library',
      width: 80,
      align: 'center',
      sorter: (a, b): number =>
        sortByBoolean(a.hasLibraryAccess, b.hasLibraryAccess),
      render: (value: boolean, row): ReactNode => (
        <Tooltip title="View this CDFI's Library">
          <span>
            {value ? (
              <Link
                onClick={onLibraryClick(row.cdfiId)}
                to="#"
                style={{ color: 'black' }}
              >
                <ReadOutlined />
              </Link>
            ) : (
              ''
            )}
          </span>
        </Tooltip>
      ),
    },
    {
      key: 'viewThisCdfi',
      dataIndex: 'tbd',
      title: 'Org Details',
      width: 60,
      align: 'center',
      render: (value, row): ReactNode => (
        <Tooltip title="View this CDFI's Organization Details" placement="left">
          <span>
            {row.cdfiId ? (
              <Link
                onClick={onViewCdfiClick(row.cdfiId)}
                to="#"
                style={{ color: 'black' }}
              >
                <EyeOutlined />
              </Link>
            ) : (
              ''
            )}
          </span>
        </Tooltip>
      ),
    },
  ];
};

export const cardStyle = {
  height: '100%',
  minHeight: 200,
  width: '100%',
  minWidth: 300,
  margin: '5px',
};
