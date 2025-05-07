import React, { FC } from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const LevelDeeperSvg: FC = () => (
  <svg width="11" height="22" fill="none">
    <path
      d="M10 21H1V1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const LevelDeeperIcon: FC<Partial<CustomIconComponentProps>> = (
  props,
) => <Icon component={LevelDeeperSvg} {...props} />;
