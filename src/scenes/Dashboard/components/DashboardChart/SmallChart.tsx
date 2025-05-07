import React, { FC, useCallback, useMemo, useState } from 'react';
import { Row, Col, Card, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, FrownOutlined } from '@ant-design/icons';
import { LineSvgProps, ResponsiveLine } from '@nivo/line';
import { BarSvgProps, ResponsiveBar } from '@nivo/bar';
import { PieSvgProps, ResponsivePie } from '@nivo/pie';
import { Company, Portfolio } from 'types';
import { GraphType, GraphMeta } from 'types/graphs';
import { GRID_GUTTER } from 'constants/ui';
import { ChartCreate } from 'forms';
import { getPopupContainer } from 'tools/antConfig';
import { store } from 'forms/ChartCreate/store';
import {
  ChartTooltip4Bar,
  ChartTooltip4Line,
  ChartTooltip4Pie,
} from 'components/ChartTooltip';
import { useGraphDeps } from 'dataManagement/useGraphDeps';
import { useAerisGraphDeps } from 'dataManagement/useAerisGraphDeps';

import {
  convertData4Line,
  convertData4Bar,
  convertData4Pie,
  removeCompanyData,
} from 'components/Chart/tools';
import { removeUnsuitableValues } from 'tools/graphTools';
import {
  lineConfig,
  barConfig,
  pieConfig,
  defaultChartUserConfig,
} from '../../constants';
import { prepareUserConfig } from './tools';
import { ChartModal } from './ChartModal';
import styles from './SmallChart.module.scss';

type SmallChartProps = {
  graphId: number;
  portfolioId?: Portfolio['id'];
  companyId?: Company['id'];
  onDeleteChart?: (id: GraphMeta['id']) => void;
};

export const SmallChart: FC<SmallChartProps> = ({
  graphId,
  portfolioId,
  companyId,
  onDeleteChart,
}) => {
  const [showChart, setShowChart] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    data: graphData,
    isLoading: isGraphLoading,
    hasError,
    reload,
  } = useAerisGraphDeps({
    graphId,
    companyId,
  });

  const handleEdit = useCallback(() => {
    store.setTemplateId(graphId);
    setShowChart(false);
    setShowEditModal(true);
  }, [graphId]);

  const menuItems = [
    {
      key: 1,
      name: 'View',
      onClick: (): void => setShowChart(true),
    },
  ];

  const userConfig = useMemo(() => {
    if (!graphData) return defaultChartUserConfig;

    return prepareUserConfig(
      graphData.type,
      graphData.formatChart ?? defaultChartUserConfig,
    );
  }, [graphData]);

  const smallChartComponent = useMemo(() => {
    if (!graphData) return null;

    const usedData = removeUnsuitableValues(removeCompanyData(graphData));

    switch (graphData.type) {
      case GraphType.LINE:
        return (
          <ResponsiveLine
            {...lineConfig}
            data={convertData4Line(usedData)}
            tooltip={ChartTooltip4Line}
            {...(userConfig as Partial<LineSvgProps>)}
          />
        );
      case GraphType.COLUMN:
      case GraphType.COLUMN_STACKED: {
        const { data, keys } = convertData4Bar(usedData);
        return (
          <ResponsiveBar
            {...barConfig}
            indexBy="period"
            keys={keys}
            data={data}
            tooltip={ChartTooltip4Bar}
            groupMode={
              usedData.type === GraphType.COLUMN ? 'grouped' : 'stacked'
            }
            {...(userConfig as Partial<BarSvgProps>)}
          />
        );
      }
      case GraphType.PIE:
        return (
          <ResponsivePie
            {...pieConfig}
            data={convertData4Pie(usedData)}
            {...(userConfig as Partial<PieSvgProps>)}
            tooltip={ChartTooltip4Pie}
          />
        );
      default:
        return null;
    }
  }, [graphData, userConfig]);

  if (!graphData || hasError) {
    return (
      <Card className={styles.smallChartContainer} loading={isGraphLoading}>
        <div className={styles.errorContainer}>
          <div>
            <FrownOutlined className={styles.errorIcon} />
          </div>
          <div>No Data</div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className={styles.smallChartContainer}>
        <Row gutter={[GRID_GUTTER, GRID_GUTTER / 2]} justify="space-between">
          <Col key="title" className={styles.titleWrapper}>
            <span className={styles.title}>{graphData.name}</span>
            <Dropdown
              overlay={
                <Menu>
                  {menuItems.map((item) => (
                    <Menu.Item
                      key={item.key}
                      onClick={(): void => {
                        if (item.onClick) item.onClick();
                      }}
                    >
                      {item.name}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={['click']}
              getPopupContainer={getPopupContainer}
              overlayClassName={styles.chartMenu}
            >
              <EllipsisOutlined className={styles.chartMenuIcon} />
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className={styles.chartBlock}>{smallChartComponent}</Col>
        </Row>
      </Card>
      <ChartModal
        visible={showChart}
        onCancel={(): void => setShowChart(false)}
        graph={graphData}
        isLoading={isGraphLoading}
        onEdit={handleEdit}
      />
      {showEditModal && (
        <ChartCreate
          graphId={graphId}
          onHide={(): void => {
            setShowEditModal(false);
          }}
          reload={reload}
        />
      )}
    </>
  );
};
