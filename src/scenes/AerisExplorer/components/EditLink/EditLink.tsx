import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import styles from './EditLink.module.scss';

type EditLinkProps = {
  url: string;
  tooltip?: string;
  ariaLabel?: string;
};

export const EditLink = ({
  url,
  tooltip = 'Edit link',
  ariaLabel = 'Edit link',
}: EditLinkProps) => (
  <Link className={styles.lightBlue} to={url} aria-label={ariaLabel}>
    <Tooltip title={tooltip}>
      <EditFilled />
    </Tooltip>
  </Link>
);
