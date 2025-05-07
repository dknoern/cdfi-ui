import React from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const MinusIconSvg: React.FC = () => (
  <svg
    width="20"
    height="2"
    viewBox="0 0 20 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 2H0V0H20V2Z" fill="currentColor" />
  </svg>
);

export const MinusIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props,
) => <Icon component={MinusIconSvg} {...props} />;
