export const status = [
  { value: 'NEW', label: 'New' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'SENT_TO_REQUESTER', label: 'Sent to Requester' },
];

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'NEW':
      return 'New';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'COMPLETED':
      return 'Completed';
    case 'SENT_TO_REQUESTER':
      return 'Sent to Requester';
    default:
      return '';
  }
};

export const cardStyle = {
  height: '100%',
  minHeight: 200,
  width: '100%',
  minWidth: 300,
  margin: '5px',
  marginTop: '40px'
};
