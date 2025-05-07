import React, { ReactNode } from 'react';
import { Button, Tooltip, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { sortByString } from 'tools';
import { CustomDataReport, CustomDataReportData, UserSimple } from 'types';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';

const { Paragraph } = Typography;

function isExpired(expirationDate: string) {
  const date = moment(expirationDate, 'YYYY-MM-DD');
  return date.isBefore(moment());
}

export const makeCustomDataReportsColumns = (
  setDownloadCustomDataReportId: (value: number | undefined) => void,
): ColumnProps<CustomDataReportData>[] => {
  const handleCustomDataReportDownloadClick =
    (customDataReportId: number) => () => {
      setDownloadCustomDataReportId(customDataReportId);
    };

  return [
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
      title: 'Aeris Contact',
      dataIndex: 'contact',
      render: (user: UserSimple) => user?.firstName + ' ' + user?.lastName,
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        sortByString(a.contact?.firstName, b.contact?.firstName),
    },
    {
      title: 'Date Requested',
      dataIndex: 'dateRequested',
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        ('' + a.dateRequested).localeCompare(b.dateRequested),
    },
    {
      title: 'Date Delivered',
      dataIndex: 'dateGenerated',
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        ('' + a.dateGenerated).localeCompare(b.dateGenerated),
    },
    {
      title: 'Expiration Date *',
      dataIndex: 'expirationDate',
      sorter: (a: CustomDataReport, b: CustomDataReport): number =>
        ('' + a.expirationDate).localeCompare(b.expirationDate),
    },
    {
      title: 'Download',
      dataIndex: '',
      render: (value: any, report: CustomDataReport): ReactNode =>
        !isExpired(report.expirationDate) ? (
          <Button
            type="link"
            onClick={handleCustomDataReportDownloadClick(report.id)}
            name="download"
            value={report.id}
            icon={<DownloadOutlined />}
            title="Download custom data report"
          />
        ) : (
          <Paragraph style={{ fontStyle: 'italic' }}>This report has expired.</Paragraph>
        ),
    },
  ];
};
