import React, { ReactNode } from 'react';
import { TagsList } from 'components/TagsList';
import { TagTableItem } from 'types/tagTableItem';

export const renderCompanies = (
  value: string,
  record: TagTableItem,
): ReactNode => <TagsList items={record.companies} />;

export const renderMetrics = (
  value: string,
  record: TagTableItem,
): ReactNode => <TagsList items={record.metrics} />;

export const renderTag = (value: string, record: TagTableItem): ReactNode =>
  record.tag.name;

export const renderTagCategory = (
  value: string,
  record: TagTableItem,
): ReactNode => (record.tag.category.parent ? record.tag.category.name : '');

export const renderTagGroup = (
  value: string,
  record: TagTableItem,
): ReactNode =>
  record.tag.category.parent
    ? record.tag.category.parent.name
    : record.tag.category.name;
