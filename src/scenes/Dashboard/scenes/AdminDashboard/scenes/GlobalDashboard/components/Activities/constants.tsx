
export const recentActivityColumns: Record<string, any>[] = [
  {
    title: 'Company',
    dataIndex: 'company'
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    render: (text : string, record: any) => record.firstName + ' ' +  record.lastName 
  },
  {
    title: 'Activity Summary',
    dataIndex: 'plainSummary',
  },
];
