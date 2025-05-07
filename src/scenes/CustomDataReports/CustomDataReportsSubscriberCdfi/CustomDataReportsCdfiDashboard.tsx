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
import { useCustomDataReportsCdfi } from 'dataManagement/useCustomDataReports';
import { cdfiStore, userStore } from 'store';
import { LogoHeader } from './components/LogoHeader';
import { useCdfis } from 'dataManagement';
import { useCdfiLogo } from 'tools/useCdfiLogo';

const { Paragraph, Link } = Typography;

export const CustomDataReportsCdfiDashboardFn: FC = () => {
  const { data } = useCustomDataReportsCdfi(userStore.companyId);
  const { cdfiId } = cdfiStore;
  const { data: cdfis } = useCdfis();
  const cdfiName = cdfis?.find((item) =>
  item.id == cdfiId ? item.name : '',
)?.name;

  const logo = useCdfiLogo(cdfiId);
  return (
    <PageSectionWrapper 
      title="Custom Data Reports"
      topTitle={<LogoHeader imgPath={logo} subTitle={cdfiName} />}  
       >
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
              <Link href="mailto:info@aerisinsight.com">
                info@aerisinsight.com
              </Link>
            </Card>
          </Row>
        </Col>
      </Row>
    </PageSectionWrapper>
  );
};

export const CustomDataReportsCdfiDashboard = withRouter(
  CustomDataReportsCdfiDashboardFn,
);
