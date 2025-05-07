import { ColumnProps } from 'antd/lib/table';
import { UserSimple } from 'types';
import moment from 'moment';
import { SupportHistory } from 'types/supportHistory';

export const makeSupportHistoryColumns = (): ColumnProps<SupportHistory>[] => {
  return [
    {
      title: 'Date',
      dataIndex: 'dateRequested',
      render: (date: any) => moment(date).format('MM/DD/YYYY hh:mm A'),
      sorter: (a: SupportHistory, b: SupportHistory): number =>
        ('' + a.dateRequested).localeCompare(b.dateRequested),
      defaultSortOrder: "descend"
    },
    {
      title: 'Name',
      dataIndex: 'requester',
      render: (user: UserSimple) => user?.firstName + ' ' + user?.lastName,
      sorter: (a: SupportHistory, b: SupportHistory): number =>
        ('' + a.requester?.firstName).localeCompare(b.requester?.firstName),
    },
    {
      title: 'Request Subject',
      dataIndex: 'subject',
      sorter: (a: SupportHistory, b: SupportHistory): number =>
        ('' + a.subject).localeCompare(b.subject),
    },
    {
      title: 'Request Details',
      dataIndex: 'inquiry',
      sorter: (a: SupportHistory, b: SupportHistory): number =>
        ('' + a.inquiry).localeCompare(b.inquiry),
    },
  ];
};
