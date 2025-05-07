import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';

export const TabPortfolioSegmentInstructions: FC = observer(() => {
  return (
    <>
      <Typography.Paragraph>
        You can compare a portfolio segment consisting of (1) an individual CDFI
        or (2) a group of CDFIs against the peer group of your choice,
      </Typography.Paragraph>
      <Typography.Paragraph>
        Here you can view the list of portfolio segments that your organization
        has created and saved in the past 12 months. If none of them fits your
        purpose, you can create a new portfolio segment in one of two ways:
      </Typography.Paragraph>
      <Typography.Paragraph>
        • Using the “Clone” icon next to an existing portfolio segment, bring the
        portfolio segment up, edit it as you need and save under a different
        name; or
      </Typography.Paragraph>
      <Typography.Paragraph>
        • Using the “Create New Portfolio Segment” button, navigate to the next
        page and create a new portfolio segment from scratch.
      </Typography.Paragraph>
    </>
  );
});
