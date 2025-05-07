import React, { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export const TabContent: FC = ({ children }) => {
  return (
    <Scrollbars autoHeight autoHeightMax="350px">
      {children}
    </Scrollbars>
  );
};
