import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';

export const CreatePortfolioSegmentInstructions: FC = observer(() => {
  return (
    <>
      <Typography.Paragraph>
        Select one or more filters to refine the list of CDFIs. From the list of CDFIs, select the CDFIs you want to include in your new Portfolio Segment.
      </Typography.Paragraph>
    </>
  );
});
