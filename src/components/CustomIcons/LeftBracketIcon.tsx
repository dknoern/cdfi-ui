import React from 'react';
import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const LeftBracketIconSvg: React.FC = () => (
  <svg
    width="8"
    height="28"
    viewBox="0 0 8 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 13.893C0 11.8338 0.276345 9.88157 0.829035 8.03629C1.38173 6.18211 2.19293 4.52849 3.26265 3.07545C4.33238 1.6135 5.4645 0.588348 6.65902 0L7.30086 1.89876C6.04393 2.85259 5.02324 4.31009 4.23878 6.27125C3.46323 8.2235 3.0398 10.461 2.96848 12.9838L2.95511 14.1337C2.95511 16.8348 3.33397 19.2461 4.09169 21.3677C4.85832 23.4804 5.92805 25.0895 7.30086 26.1948L6.65902 28C5.4645 27.4117 4.32792 26.382 3.24928 24.9112C2.17956 23.4492 1.36835 21.8001 0.815664 19.9637C0.271888 18.1184 0 16.0949 0 13.893Z"
      fill="currentColor"
    />
  </svg>
);

export const LeftBracketIcon: React.FC<Partial<CustomIconComponentProps>> = (
  props,
) => <Icon component={LeftBracketIconSvg} {...props} />;
