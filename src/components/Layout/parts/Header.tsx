import React, { FC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout, Row, Col } from 'antd';
import { GRID_COL_THIRD_ROW_SPAN } from 'constants/ui';
import { UserControls } from '../components';
import styles from './Header.module.scss';

const { Header: HeaderAnt } = Layout;

export const HeaderFn: FC<RouteComponentProps> = ({ location, history }) => {
  return (
    <HeaderAnt className={styles.header}>
      <Row
        justify="space-between"
        align="middle"
        className={styles.headerContentContainer}
      >
        <Col span={GRID_COL_THIRD_ROW_SPAN * 2}></Col>
        <Col>
          <UserControls />
        </Col>
      </Row>
    </HeaderAnt>
  );
};

export const Header = withRouter(observer(HeaderFn));
