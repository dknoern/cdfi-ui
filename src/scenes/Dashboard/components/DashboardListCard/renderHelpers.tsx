import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Company, Tag as TagType } from 'types';
import { TagsList } from 'components';
import { LinkMaker } from './types';
import styles from './DashboardListCard.module.scss';

export const renderNameValue = (getLink: LinkMaker) => (
  value: string,
  record: Company,
): ReactNode => {
  return <Link to={getLink(record)}>{record.name}</Link>;
};

export const renderTagValue = (tags: TagType[]): ReactNode => {
  return (
    <div className={styles.tagContainer}>
      <TagsList items={tags} type="custom" />
    </div>
  );
};
