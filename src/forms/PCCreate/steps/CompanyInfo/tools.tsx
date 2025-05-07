import React, { ReactNode } from 'react';
import { CompanyInfoBase } from 'types';
import { EMPTY_VALUE_PLACEHOLDER } from 'constants/forms';

const addressIsEmpty = (address: CompanyInfoBase['address']): boolean => {
  return ['city', 'country', 'state', 'street', 'zipCode'].every(
    (item) =>
      !address[item as keyof CompanyInfoBase['address']] ||
      address[item as keyof CompanyInfoBase['address']].trim().length < 1,
  );
};

export const renderAddress = (
  address: CompanyInfoBase['address'],
): ReactNode => {
  if (addressIsEmpty(address)) {
    return EMPTY_VALUE_PLACEHOLDER;
  }

  const { street, city, state, country, zipCode } = address;

  const lines: React.ReactNode[] = [];
  if (street) lines.push(street);
  if (city || state || country) {
    if (lines.length) lines.push(<br key={`br${lines.length}`} />);
    lines.push(
      [city, state, country]
        .filter((item) => item.trim().length > 0)
        .join(', '),
    );
  }
  if (zipCode) {
    if (lines.length) lines.push(<br key={`br${lines.length}`} />);
    lines.push(zipCode);
  }
  return lines;
};
