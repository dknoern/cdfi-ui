import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';

type TabIntroInstructionsProps = {
  explorerEnabled: boolean;
};

export const TabIntroInstructions: FC<TabIntroInstructionsProps> = observer(
  (props: TabIntroInstructionsProps) => {
    return (
      <>
        {!props.explorerEnabled && (
          <Typography.Paragraph>
            Your current subscription does not provide access to Aeris® Explorer
            reports. Please contact{' '}
            <a href="mailto:subscriptions@aerisinsight.com">
              subscriptions@aerisinsight.com
            </a>
            to add this service to your account.
          </Typography.Paragraph>
        )}
        {props.explorerEnabled && (
          <>
            <Typography.Paragraph>
              Aeris® Explorer is a CDFI loan funds analytics tool, which enables
              subscribers to compare KPI historical trends of one or more CDFI
              loan funds against a peer group. Comparisons in charts and graphs
              or in tables can be exported as Excel worksheets for further
              analysis offline.
            </Typography.Paragraph>
            <Typography.Paragraph>
              Since the business models and operating environments of individual
              CDFI loan funds are diverse, comparisons should not be regarded as
              benchmarks.
            </Typography.Paragraph>
            <Typography.Paragraph>Use the tabs below to</Typography.Paragraph>
            <Typography.Paragraph>
              • Select or create a peer group to use for comparison,
            </Typography.Paragraph>
            <Typography.Paragraph>
              • Select or create a portfolio segment of one or more CDFI loan
              funds that you wish to compare,
            </Typography.Paragraph>
            <Typography.Paragraph>
              • Run and save your comparison for review and analysis
            </Typography.Paragraph>
          </>
        )}
      </>
    );
  },
);
