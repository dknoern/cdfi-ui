import React, { FC, ReactNode, useMemo } from 'react';
import { Card, List } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import { Company, Portfolio, VoidFn } from 'types';
import { GraphMeta } from 'types/graphs';
import { useGraphsFor } from 'dataManagement';
import { ToggleChartHandler } from './types';
import { filterCharts } from './tools';
import styles from './AddChartCard.module.scss';

type AddChartCardProps = {
  onAdd: ToggleChartHandler;
  onClose: VoidFn;
  portfolioId: Portfolio['id'] | null;
  companyId: Company['id'] | null;
  allDashboardCharts: GraphMeta['id'][];
};

export const AddChartCard: FC<AddChartCardProps> = ({
  onAdd,
  onClose,
  companyId,
  portfolioId,
  allDashboardCharts,
}) => {
  const { data: allGraphs, isLoading } = useGraphsFor({
    portfolioId,
    companyId: companyId || 0,
  });

  const graphsList = useMemo<GraphMeta[]>(() => {
    if (!allGraphs || isLoading) return [];

    return filterCharts(allGraphs, allDashboardCharts);
  }, [allGraphs, isLoading, allDashboardCharts]);

  return (
    <Card className={styles.container}>
      <CloseOutlined className={styles.closeIcon} onClick={onClose} />
      <Scrollbars autoHeight>
        <List
          rowKey="id"
          dataSource={graphsList}
          loading={isLoading}
          renderItem={(item): ReactNode => (
            <List.Item
              className={styles.chartItem}
              onClick={(): void => onAdd(item.id)}
            >
              <span>{item.title}</span>
            </List.Item>
          )}
        />
      </Scrollbars>
    </Card>
  );
};
