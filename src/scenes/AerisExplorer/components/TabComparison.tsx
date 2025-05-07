import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Col, Row, Table } from 'antd';
import { GRID_COL_FULL_ROW_SPAN } from '../../../constants';
import styles from '../AerisExplorer.module.scss';
import { aerisExplorerPeerGroupStore, userStore } from '../../../store';
import { PlusCircleOutlined } from '@ant-design/icons';
import { getComparisonsTableColumns } from '../columns';
import { toJS } from 'mobx';
import { CreateComparisonView } from './CreateComparisonView/CreateComparisonView';
import {ComparisonPermissions} from "../../../types/peerGroups";

type ComparisonProps = {
  subscriberId: number | undefined;
  cdfiId: number | undefined;
};

export const TabComparison: FC<ComparisonProps> = observer(
  (props: ComparisonProps) => {
    const [compViewCreateIsVisible, setCompViewCreateIsVisisble] =
      useState(false);
    const [loadingComparisonTable, setLoadingComparisonTable] = useState(false);

    const { cdfiId, subscriberId } = props;

    const { getComparisons, comparisons } = aerisExplorerPeerGroupStore;

    const rowClassName = (record: ComparisonPermissions) => {
      return record.data.archived ? styles.lightGrey : '';
    };

    useEffect(() => {
      if (cdfiId || subscriberId) {
        setLoadingComparisonTable(true);
        getComparisons(subscriberId || cdfiId).then(() =>
          setLoadingComparisonTable(false),
        );
      }
    }, [cdfiId, subscriberId]);

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
                  title="Create New Comparison"
                  icon={<PlusCircleOutlined />}
                  onClick={() => setCompViewCreateIsVisisble(true)}
                >
                  Create New Comparison
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Table
          rowClassName={rowClassName}
          loading={loadingComparisonTable}
          columns={getComparisonsTableColumns(subscriberId, cdfiId)}
          dataSource={toJS(comparisons)}
        />
        <CreateComparisonView
          isVisible={compViewCreateIsVisible}
          onCancel={() => setCompViewCreateIsVisisble(false)}
          subscriberId={subscriberId}
          cdfiId={cdfiId}
        />
      </div>
    );
  },
);
