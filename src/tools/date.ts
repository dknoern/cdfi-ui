import { datePickerOptions } from 'constants/date';

export const momentFormat2Unicode = (format: string): string => {
  return datePickerOptions.find((item) => item.value === format)
    ?.unicodeFormat as string;
};

export const unicodeFormat2moment = (format: string): string => {
  return datePickerOptions.find((item) => item.unicodeFormat === format)
    ?.value as string;
};
