import { PageSectionWrapper } from 'components';
import React, { FC, useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CustomDataReportsView } from './CustomDataReportsView';
import { Row, Col, Typography, Card } from 'antd';
import {
  GRID_GUTTER,
  GRID_COL_THREE_QUARTERS_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
} from 'constants/ui';
import { MailOutlined } from '@ant-design/icons';
import { cardStyle } from './constants';
import { useCustomDataReportsSubscriber } from 'dataManagement/useCustomDataReports';
import { userStore, subscriberStore } from 'store';

const { Paragraph, Link } = Typography;

export const CustomDataReportsSubscriberDashboardFn: FC = () => {
  const { data } = useCustomDataReportsSubscriber(userStore.companyId);
  const { subscriberItem } = subscriberStore;

  return (
    <PageSectionWrapper title="Custom Data Reports" topTitle={subscriberItem?.name}>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN}>
          <CustomDataReportsView data={data ? data.customDataReports : []} />
        </Col>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Card style={cardStyle}>
              <Paragraph strong>Questions?</Paragraph>
              <Paragraph>
                For questions or to submit a report request, contact CDFI
                support.
              </Paragraph>
              <MailOutlined style={{ marginRight: 5 }} />
              <Link href="mailto:subscriptions@aerisinsight.com">
                subscriptions@aerisinsight.com
              </Link>
            </Card>
          </Row>
        </Col>
      </Row>
    </PageSectionWrapper>
  );
};

export const CustomDataReportsSubscriberDashboard = withRouter(
  CustomDataReportsSubscriberDashboardFn,
);
