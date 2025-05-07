import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';

export const CdfiSelectorInstructions: FC = observer(() => {
  return (
    <>
      <Typography.Paragraph>
        Use one or more filters on the left to view funds that match your criteria. Download Fact Sheet for a specific CDFI using 'Download Fact Sheet' button.
      </Typography.Paragraph>
    </>
  );
});
