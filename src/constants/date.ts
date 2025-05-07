// based on moment
export const datePickerOptions = [
  {
    value: 'M/D/YYYY',
    label: '5/24/2021',
    unicodeFormat: 'M/d/yyyy',
    description: 'American style',
  },
  {
    value: 'MM/DD/YYYY',
    label: '05/24/2021',
    unicodeFormat: 'MM/dd/yyyy',
    description: 'American style with leading zeros',
  },
  {
    value: 'MMMM D YYYY',
    label: 'April 21 2021',
    unicodeFormat: 'MMMM d yyyy',
    description: 'April 21 2021',
  },
  {
    value: 'DD/MM/YYYY',
    label: '24/05/2021',
    unicodeFormat: 'dd/MM/yyyy',
    description: 'European style',
  },
  {
    value: 'YYYY/MM/DD',
    label: '2021/05/24',
    unicodeFormat: 'yyyy/MM/dd',
    description: 'European style reversed',
  },
  {
    value: 'DD-MM-YYYY',
    label: '21-04-2021',
    unicodeFormat: 'dd-MM-yyyy',
    description: 'ISO, 21-04-2021',
  },
];

// used for DatePicker
export const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';
export const SUBSCRIPTION_DATE_FORMAT = 'MM-DD-YYYY';
