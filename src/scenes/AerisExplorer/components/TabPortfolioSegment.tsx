import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Col, Row, Table } from 'antd';
import { GRID_COL_FULL_ROW_SPAN } from '../../../constants';
import styles from '../AerisExplorer.module.scss';
import { aerisExplorerPeerGroupStore, userStore } from '../../../store';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PeerPortfolioPermissions, GroupType } from '../../../types/peerGroups';
import { getAerisExplorerColumns } from '../columns';
import { toJS } from 'mobx';

type PortfolioProps = {
  subscriberId: number | undefined;
  cdfiId: number | undefined;
};

export const TabPortfolioSegment: FC<PortfolioProps> = observer(
  (props: PortfolioProps) => {
    const { subscriberId, cdfiId } = props;
    const defaultUrlSuffix =
      cdfiId || subscriberId
        ? `${cdfiId ? 'cdfi' : 'subscriber'}/${cdfiId || subscriberId}`
        : '';

    const [loadingExplorerPage, setLoadingExplorerPage] = useState(false);
    const [urlSuffix, setUrlSuffix] = useState(defaultUrlSuffix);
    const { getPeerGroups, peerGroupsAndPortfolioSegments } =
      aerisExplorerPeerGroupStore;

    const loadPeerGroupData = useCallback((): void => {
      getPeerGroups(cdfiId, subscriberId, false).then(() =>
        setLoadingExplorerPage(false),
      );
    }, [cdfiId, subscriberId]);

    const rowClassName = (record: PeerPortfolioPermissions) => {
      return record.data.archived ? styles.lightGrey : '';
    };

    useEffect(() => {
      setLoadingExplorerPage(true);
      loadPeerGroupData();
    }, [loadPeerGroupData]);

    return (
      <div>
        <Row>
          <Col
            span={GRID_COL_FULL_ROW_SPAN}
            className={styles.alignContentRight}
          >
            <div className={styles.buttonNav}>
              {(userStore.isAerisAdmin ||
                userStore.isStaff ||
                userStore.isSubscriber) && (
                <Button
                  type="default"
                  title="Create New Portfolio Segment"
                  icon={<PlusCircleOutlined />}
                >
                  <Link
                    className={styles.lightBlue}
                    to={`/create-peer-or-portfolio/${GroupType.PORTFOLIO_SEGMENT}/CREATE/${urlSuffix}`}
                  >
                    Create New Portfolio Segment
                  </Link>
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Table
          rowClassName={rowClassName}
          loading={loadingExplorerPage}
          columns={getAerisExplorerColumns(
            subscriberId,
            cdfiId,
            loadPeerGroupData,
            GroupType.PORTFOLIO_SEGMENT,
          )}
          dataSource={toJS(peerGroupsAndPortfolioSegments)?.filter(
            (portfolio) =>
              portfolio.data.groupType === GroupType.PORTFOLIO_SEGMENT,
          )}
        />
      </div>
    );
  },
);
