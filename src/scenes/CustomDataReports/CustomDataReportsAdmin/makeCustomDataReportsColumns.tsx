import React, { ReactNode } from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { DeleteFilled, EditFilled, FileOutlined } from '@ant-design/icons';
import { sortByString } from 'tools';
import { CustomDataReport, UserSimple } from 'types';
import { ColumnProps } from 'antd/lib/table';
import { getStatusLabel } from './constants';
import { CustomDataReportFormData } from './CustomDataReportCreateForm';
import { getCustomDataReport } from 'dataManagement/operations/customDataReportsOperations';

const { Paragraph } = Typography;

export const makeCustomDataReportsColumns = (
  setEditingCustomDataReportId: (value: number | undefined) => void,
  setDeleteCustomDataReportId: (value: number | undefined) => void,
  setShowEditReportRequestModal: (value: boolean) => void,
  setEditingCustomReportDataEdit: (
    subscription: CustomDataReportFormData | undefined,
  ) => void,
  setDownloadCustomDataReportId: (value: number | undefined) => void,
  setIsSendToClientEnabled: (value: boolean) => void,
): ColumnProps<CustomDataReport>[] => {
  const handleCustomDataReportEditClick =
    (customDataReportId: number, isSendToClientEnabled: boolean) => () => {
      setEditingCustomDataReportId(customDataReportId);
      setShowEditReportRequestModal(true);
      getCustomDataReport(customDataReportId).then((data) => {
        setEditingCustomReportDataEdit(data);
      });
      setIsSendToClientEnabled(isSendToClientEnabled);
    };

  const handleCustomDataReportDeleteClick =
    (customDataReportId: number) => () => {
      setDeleteCustomDataReportId(customDataReportId);
    };

  const handleCustomDataReportDownloadClick =
    (customDataReportId: number) => () => {
      setDownloadCustomDataReportId(customDataReportId);
    };

  return [
    {
      title: 'Requester',
      dataIndex: 'requester',
      render: (user: UserSimple) => (
        <Tooltip
          title={
            'CDFI user, Subscriber user, or Internal user who gets Custom Data Reports'
          }
        >
          {user?.firstName + ' ' + user?.lastName}
        </Tooltip>
      ),
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        sortByString(a.requester?.firstName, b.requester?.firstName),
    },
    {
      title: 'Aeris Contact',
      dataIndex: 'contact',
      render: (user: UserSimple) => user?.firstName + ' ' + user?.lastName,
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        sortByString(a.contact?.firstName, b.contact?.firstName),
    },
    {
      title: 'Aeris Generator',
      dataIndex: 'generator',
      render: (user: UserSimple) =>
        user ? user?.firstName + ' ' + user?.lastName : '',
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        ('' + a.generator?.firstName).localeCompare(b.generator?.firstName),
    },
    {
      title: 'Report Name',
      dataIndex: 'name',
      render: (name: string) => (
        <Tooltip
          title={
            'This is the name of the report being sent to the Requester. The Report Name will be viewable to them in their Aeris Cloud portal.'
          }
        >
          {name}
        </Tooltip>
      ),
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        ('' + a.name).localeCompare(b.name),
    },
    {
      title: 'Purpose and Description',
      dataIndex: 'description',
      render: (description: string) => (
        <Tooltip title={'Brief description of what the Client has requested'}>
          {description}
        </Tooltip>
      ),
    },
    {
      title: 'Date Requested',
      dataIndex: 'dateRequested',
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        ('' + a.dateRequested).localeCompare(b.dateRequested),
    },
    {
      title: 'Date Generated',
      dataIndex: 'dateGenerated',
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        ('' + a.dateGenerated).localeCompare(b.dateGenerated),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => getStatusLabel(status),
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        sortByString(a.status, b.status),
    },
    {
      title: '',
      dataIndex: '',
      render: (value: any, report: CustomDataReport): ReactNode => (
        <>
          {report.status === 'COMPLETED' && report.name ? (
            <Button
              type="link"
              onClick={handleCustomDataReportDownloadClick(report.id)}
              name="download"
              value={report.id}
              icon={<FileOutlined />}
              title="Download custom data report"
            />
          ) : null}
          <Button
            type="link"
            onClick={handleCustomDataReportEditClick(
              report.id,
              report.status === 'COMPLETED' && report.name !== undefined,
            )}
            name="edit"
            value={report.id}
            icon={<EditFilled />}
            title="Edit custom data report"
          />
          {report.status !== 'SENT_TO_REQUESTER' ? (
            <Button
              type="link"
              onClick={handleCustomDataReportDeleteClick(report.id)}
              name="delete"
              value={report.id}
              icon={<DeleteFilled />}
              title="Delete custom data report"
            />
          ) : null}
        </>
      ),
    },
  ];
};
