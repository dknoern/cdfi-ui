import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';

export const TabComparisonInstructions: FC = observer(() => {
  return (
    <>
      <Typography.Paragraph>
        Here you can view the Comparisons that your organization has created in
        the past 12 months. You can also create a new Comparison by following
        the prompts on this page to select a peer group and a portfolio segment
        from the existing selections.
      </Typography.Paragraph>
      <Typography.Paragraph>
        The Aeris Explorer provides two graphic views of Comparisons:
      </Typography.Paragraph>
      <Typography.Paragraph>
        1. The Median View : in this view you will see the median KPI of the
        portfolio segment against the bottom, median, and top quartiles of the
        peer group.
      </Typography.Paragraph>
      <Typography.Paragraph>
        2. The CDFI Bar Graph View : in this view you will see the performance
        of each CDFI in your portfolio segment against the bottom, median and
        top quartiles of the peer group. Note that this view is only available
        for portfolio segments of 10 or less CDFIs due to presentation
        limitations.
      </Typography.Paragraph>
      <Typography.Paragraph>
        The default view is a table format.
      </Typography.Paragraph>
      <Typography.Paragraph>
        All views can be exported to Excel.
      </Typography.Paragraph>
    </>
  );
});
