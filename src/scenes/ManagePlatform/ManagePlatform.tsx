import { PageSectionWrapper } from 'components';
import React, { FC, ReactNode } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Card, Button, Typography } from 'antd';
import { GRID_GUTTER } from 'constants/ui';
import styles from './ManagePlatform.module.scss';
import { useHistory } from 'react-router-dom';
import { managePlatformCardContents } from './constants';
import { useAppConfig } from '../../useAppConfig';

const { Paragraph } = Typography;

export const smallCardStyle = {
  minHeight: 200,
  height: '100%',
};

const platformCard = (
  title: string,
  content: any,
  onClick: () => void,
  buttonKey: string,
  buttonDisabled: boolean,
) => (
  <Col xs={24} lg={12} xl={8} xxl={6} key={buttonKey}>
    <Card style={smallCardStyle}>
      {format(title, content)}
      <Button
        className={styles.button}
        type="primary"
        key={buttonKey}
        onClick={onClick}
        disabled={buttonDisabled}
      >
        Manage
      </Button>
    </Card>
  </Col>
);

const format = (title: string, content: ReactNode) => (
  <>
    <Paragraph strong>{title}</Paragraph>
    <Paragraph>{content}</Paragraph>
  </>
);

export const ManagePlatformFn: FC = () => {
  const history = useHistory();
  const { METRIC_AGGREGATION_ENABLED } = useAppConfig();
  const onButtonClick = (path: string, history: any) => () => {
    history.push('/' + path);
  };

  return (
    <PageSectionWrapper title="MANAGE PLATFORM">
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        {managePlatformCardContents(METRIC_AGGREGATION_ENABLED).map((content) =>
          platformCard(
            content.title,
            content.description,
            onButtonClick(content.path, history),
            content.key,
            content.disabled,
          ),
        )}
      </Row>
    </PageSectionWrapper>
  );
};

export const ManagePlatform = withRouter(ManagePlatformFn);
