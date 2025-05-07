import React from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const PlusIconSvg: React.FC = () => (
  <svg
    width="19"
    height="20"
    viewBox="0 0 19 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5661 8.79245H19V10.9057H10.5661V20H8.26253V10.9057H0V8.79245H8.26253V0H10.5661V8.79245Z"
      fill="currentColor"
    />
  </svg>
);

export const PlusIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props,
) => <Icon component={PlusIconSvg} {...props} />;
