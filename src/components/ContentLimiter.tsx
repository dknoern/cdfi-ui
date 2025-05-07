import React, { FC } from 'react';

export const ContentLimiter: FC = ({ children }) => {
  return <div style={{ overflow: 'hidden' }}>{children}</div>;
};
