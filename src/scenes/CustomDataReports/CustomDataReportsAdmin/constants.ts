export const tableTabs: Record<string, string> = {
  external: 'EXTERNAL',
  internal: 'INTERNAL',
};

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

export const sendToClientWarningText =
  'For External Clients, clicking "Send to Client" will \
  make the report available to the client for Download, and \
  send an email notification to the "Requester", the "Aeris \
  Contact" and the "Copied To" recipients listed.';
