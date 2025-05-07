import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { WithClass } from 'types';
import styles from './Breadcrumbs.module.scss';

type BreadcrumbsProps = {
  items: { name: string; id: number; link?: string }[];
} & WithClass;

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  className = '',
}) => {
  return (
    <Breadcrumb className={`${styles.breadcrumb} ${className}`}>
      {items.map((item) => (
        <Breadcrumb.Item key={item.id}>
          {item.link ? (
            <Link to={item.link}>{item.name}</Link>
          ) : (
            <>{item.name}</>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
