import React, { ReactElement } from 'react';
import { Company, Contact } from 'types/company';
import { uiText } from 'constants/uiText';
import { formatPhoneNumber } from 'tools';
import styles from '../components/ContactFundManager.module.scss';

const has = (contact: Contact) => (fieldName: keyof Contact): boolean => {
  return !!contact[fieldName] && (contact[fieldName] as string).trim() !== '';
};
export const extractContact = (company: Company): Contact | undefined => {
  const availableToShow = company.contacts.filter(
    (item) => has(item)('name') && (has(item)('phone') || has(item)('email')),
  );

  if (!availableToShow.length) return undefined;

  const primary = availableToShow.find((item) => item.primary);

  return primary || availableToShow[0];
};

export const placeHold = (message: string): ReactElement => {
  return <div className={styles.contactsList}>{uiText('misc', message)}</div>;
};

export const renderPhoneCallLink = (phone: string): ReactElement => {
  return <a href={`tel:${phone}`}>{formatPhoneNumber(phone)}</a>;
};
