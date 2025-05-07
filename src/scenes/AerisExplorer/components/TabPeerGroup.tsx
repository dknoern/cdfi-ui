import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Checkbox, Col, Row, Table, notification  } from 'antd';
import {GRID_COL_HALF_ROW_SPAN, uiText} from '../../../constants';
import { CheckCircleOutlined, PlusCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from '../AerisExplorer.module.scss';
import { aerisExplorerPeerGroupStore, userStore } from '../../../store';
import { Link } from 'react-router-dom';
import { GroupType } from '../../../types/peerGroups';
import { getAerisExplorerColumns } from '../columns';
import { toJS } from 'mobx';
import { useCdfiOrgDetails } from '../../../dataManagement';
import { CheckboxProps } from 'antd/es/checkbox';
import {notifyUser} from "../../../tools";

type PeerGroupProps = {
  subscriberId: number | undefined;
  cdfiId: number | undefined;
};

export const TabPeerGroup: FC<PeerGroupProps> = observer(
  (props: PeerGroupProps) => {
    const { subscriberId, cdfiId } = props;

    const { data } = useCdfiOrgDetails(cdfiId);

    const defaultUrlSuffix =
      cdfiId || subscriberId
        ? `${cdfiId ? 'cdfi' : 'subscriber'}/${cdfiId || subscriberId}`
        : '';

    const [showGlobal, setShowGlobal] = useState(cdfiId === undefined);
    const [loadingExplorerPage, setLoadingExplorerPage] = useState(false);
    const [urlSuffix, setUrlSuffix] = useState(defaultUrlSuffix);

    const { getPeerGroups, refreshGlobalPeerGroups, peerGroupsAndPortfolioSegments } = aerisExplorerPeerGroupStore;

    const loadPeerGroupData = useCallback((): void => {
      getPeerGroups(cdfiId, subscriberId, showGlobal).then(() =>
        setLoadingExplorerPage(false),
      );
    }, [cdfiId, subscriberId, showGlobal, getPeerGroups]);

    useEffect(() => {
      setLoadingExplorerPage(true);
      loadPeerGroupData();
    }, [loadPeerGroupData]);

    const onGlobalFilterChange: CheckboxProps['onChange'] = (e: any) => {
      setShowGlobal(e.target.checked);
      setLoadingExplorerPage(true);
      getPeerGroups(cdfiId, subscriberId, e.target.checked).then(() =>
        setLoadingExplorerPage(false),
      );
    };

    const handleRefreshGlobalPeerGroups = async () => {
      setLoadingExplorerPage(true);
      try {
        await refreshGlobalPeerGroups();
        loadPeerGroupData();
        notifyUser.ok('peerGroups', 'updateOk');
      } catch (error) {
        console.error('Error refreshing global peer groups:', error);
        notifyUser.error(uiText('peerGroups', 'updateError'));
      } finally {
        setLoadingExplorerPage(false);
      }
    };

    return (
      <div>
        <Row>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            {subscriberId !== undefined && cdfiId === undefined && (
              <Checkbox checked={showGlobal} onChange={onGlobalFilterChange}>
                <CheckCircleOutlined
                  style={{ verticalAlign: 0 }}
                  className={styles.checkmark_green}
                />{' '}
                {!showGlobal ? 'Show' : 'Hide'} standard Peer Groups created by
                Aeris
              </Checkbox>
            )}
          </Col>
          <Col
            span={GRID_COL_HALF_ROW_SPAN}
            className={styles.alignContentRight}
          >
            <div className={styles.buttonNav}>
              {userStore.isAerisAdmin && (
                <Button
                  type="default"
                  title="Refresh Global Peer Groups"
                  icon={<ReloadOutlined />}
                  onClick={handleRefreshGlobalPeerGroups}
                  style={{ marginRight: '8px' }}
                >
                  Refresh Global Peer Groups
                </Button>
              )}
              {(userStore.isAerisAdmin || userStore.isStaff || userStore.isSubscriber) && (
                <Button
                  type="default"
                  title="Create New Peer Group"
                  icon={<PlusCircleOutlined />}
                >
                  <Link
                    className={styles.lightBlue}
                    to={`/create-peer-or-portfolio/${GroupType.PEER_GROUP}/CREATE/${urlSuffix}`}
                  >
                    Create New Peer Group
                  </Link>
                </Button>
              )}
            </div>
          </Col>

        </Row>
        <Table
          loading={loadingExplorerPage}
          columns={getAerisExplorerColumns(
            subscriberId,
            cdfiId,
            loadPeerGroupData,
            GroupType.PEER_GROUP,
          )}
          dataSource={toJS(peerGroupsAndPortfolioSegments)?.filter(
            (peer) => peer.data.groupType === GroupType.PEER_GROUP,
          )}
        />
      </div>
    );
  },
);
