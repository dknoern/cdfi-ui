import React from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const RightBracketIconSvg: React.FC = () => (
  <svg
    width="8"
    height="28"
    viewBox="0 0 8 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 14.107C8 16.1662 7.72366 18.1184 7.17097 19.9637C6.61828 21.8179 5.80707 23.4715 4.73735 24.9245C3.66762 26.3865 2.5355 27.4117 1.34098 28L0.699142 26.1012C1.95607 25.1474 2.97676 23.6899 3.76122 21.7287C4.53677 19.7765 4.96021 17.539 5.03152 15.0162L5.04489 13.8663C5.04489 11.1652 4.66603 8.7539 3.90831 6.63228C3.14168 4.51958 2.07195 2.91054 0.699144 1.80516L1.34098 1.3252e-06C2.5355 0.588348 3.67208 1.61796 4.75072 3.08883C5.82044 4.55078 6.63165 6.19994 7.18434 8.03629C7.72811 9.88157 8 11.9051 8 14.107Z"
      fill="currentColor"
    />
  </svg>
);

export const RightBracketIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props,
) => <Icon component={RightBracketIconSvg} {...props} />;
