export const parseDate = (
  millis: number,
): Record<'day' | 'month' | 'year', number> => {
  const date = new Date(millis);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return { day, month, year };
};

// expected input: in unix ms
// output:  MM/DD/YYYY h:mm
export const formatDateTime = (timestamp: string | number): string => {
  const dateString = new Date(timestamp).toISOString();

  const [year, month, day] = dateString.split('T')[0].split('-');
  const [hours, minutes] = dateString.split('T')[1].split(':');

  return `${month}/${day}/${year} ${hours}:${minutes}`;
};

