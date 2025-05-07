export const sanitizePeriodStr = (periodStr: string): string => {
  return periodStr.toLocaleLowerCase().replace(' ', '');
};
