import parsePhoneNumber from 'libphonenumber-js';

export const formatPhoneNumber = (phoneNumber: string): string => {
  const parsed = parsePhoneNumber(`${phoneNumber}`, 'US');
  return `+1 ${parsed?.formatNational()}` ?? phoneNumber;
};
