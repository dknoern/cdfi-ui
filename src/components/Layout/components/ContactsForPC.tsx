import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Company, Contact } from 'types/company';
import { useCompanies } from 'dataManagement';
import {
  placeHold,
  extractContact,
  renderPhoneCallLink,
} from '../tools/pcContactsTools';
import styles from './ContactFundManager.module.scss';

interface ContactItem {
  company: Company;
  contact?: Contact;
}

const ContactsForPCFn: FC = () => {
  const { data: companies, isLoading } = useCompanies(true);

  if (isLoading) placeHold('fmContactsLoading');

  const items: ContactItem[] = (companies ?? [])
    .map((item) => ({ company: item, contact: extractContact(item) }))
    .filter((item) => !!item.contact);

  if (!items.length) placeHold('fmContactsEmpty');

  return (
    <ul className={styles.contactsList}>
      {items.map((contactItem) => (
        <li key={contactItem.company.id}>
          <span>
            {contactItem.contact?.name} {contactItem.contact?.surname}
          </span>
          <span className={styles.company}> ({contactItem.company.name})</span>
          {!!contactItem.contact?.email && (
            <>
              <br />
              <a
                href={`mailto:${contactItem.contact?.email}`}
                className={styles.email}
              >
                {contactItem.contact?.email}
              </a>
            </>
          )}
          {!!contactItem.contact?.phone && (
            <>
              <br />
              {renderPhoneCallLink(contactItem.contact?.phone)}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
export const ContactsForPC = observer(ContactsForPCFn);
