import React from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const MultiplyIconSvg: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 18.1922L8.2016 9.83982L0.343643 1.83066L2.15349 0L9.98855 8.00915L17.8465 0L19.6564 1.83066L11.7984 9.83982L20 18.1922L18.1901 20L9.98855 11.6705L1.80985 20L0 18.1922Z"
      fill="currentColor"
    />
  </svg>
);

export const MultiplyIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props,
) => <Icon component={MultiplyIconSvg} {...props} />;
