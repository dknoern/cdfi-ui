import React, { FC, useState, useMemo, useEffect, useCallback } from 'react';
import { Row, Col, Button, Space, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { GraphMeta, ChartExportSettings } from 'types/graphs';
import { GRID_GUTTER } from 'constants/ui';
import { useGraphsFor } from 'dataManagement';
import { ExportDataButton } from 'components';
import { ChartCreate } from 'forms';
import { workDataStore } from 'store';
import { store } from 'forms/ChartCreate/store';
import { useGraphDeps } from 'dataManagement/useGraphDeps';
import {
  Content,
  GraphSelector,
  TitleBar,
  Table,
  DeleteChart,
} from './components';
import styles from './Charts.module.scss';

enum CreateFormState {
  Hidden = 'hidden',
  Edit = 'edit',
  Create = 'create',
}

const ChartsFn: FC = () => {
  const [activeGraphId, setActiveGraphId] = useState<
    GraphMeta['id'] | undefined
  >();
  const [createFormState, setCreateFormState] = useState<CreateFormState>(
    CreateFormState.Hidden,
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    viewModeConfig: { companyId, portfolioId },
    portfolio,
  } = workDataStore;
  const {
    data: graphs,
    reload: reloadGraphs,
    isLoading: isAllChartsLoading,
  } = useGraphsFor({
    portfolioId,
    companyId: companyId ?? 0,
  });
  const {
    data: graphData,
    isLoading: isGraphDataLoading,
    hasError: isGraphDataError,
    reload: reloadGraphData,
  } = useGraphDeps({
    graphId: activeGraphId ?? 0,
    companyId: companyId ?? undefined,
    portfolioId: portfolioId ?? undefined,
  });

  useEffect(() => {
    setActiveGraphId(undefined);
  }, [companyId, portfolioId]);

  useEffect(() => {
    if (createFormState === CreateFormState.Edit && activeGraphId) {
      store.setTemplateId(activeGraphId);
    }
  }, [activeGraphId, createFormState]);

  const graph = useMemo<undefined | GraphMeta>(() => {
    if (!Array.isArray(graphs) || !activeGraphId) return undefined;

    return graphs.find((item) => item.id === activeGraphId);
  }, [graphs, activeGraphId]);

  const graph2EditId = useMemo(() => {
    return createFormState === CreateFormState.Edit
      ? (activeGraphId as GraphMeta['id'])
      : null;
  }, [activeGraphId, createFormState]);

  const handleGraphsReload = (): void => {
    setActiveGraphId(undefined);
    reloadGraphs();
  };

  const handleGraphDataReload = useCallback((): void => {
    if (graph2EditId) reloadGraphData();
    if (!graph2EditId) reloadGraphs();
  }, [graph2EditId, reloadGraphData, reloadGraphs]);

  const graphsUsed = useMemo(() => (graphs ? graphs.slice() : []), [graphs]);

  const exportSettings = useMemo<ChartExportSettings>(
    () => ({
      pcId: companyId || 0,
      portfolioId: portfolioId || 0,
      graphId: activeGraphId,
    }),
    [companyId, portfolioId, activeGraphId],
  );

  const showCreateForm = createFormState !== CreateFormState.Hidden;

  return (
    <>
      <Row>
        <Col>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="graphId" className={styles.graphSelectLabel}>
            Select a Data Table / Chart
          </label>
        </Col>
      </Row>
      <Row justify="space-between" gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col>
          <Space size="large">
            <GraphSelector
              id="graphId"
              items={graphsUsed}
              selected={activeGraphId || undefined}
              onSelect={setActiveGraphId}
              isLoading={isAllChartsLoading}
            />
            <ExportDataButton
              mode={companyId ? 'companyChart' : 'portfolioChart'}
              exportSettings={exportSettings}
              id="exportChartsButton"
              text="Export Charts Data"
              graphType={graph?.graphType}
            />
          </Space>
        </Col>
        <Col>
          <Button
            key="addNew"
            type="default"
            id="addNewBtn"
            icon={<PlusOutlined />}
            className={styles.addBtn}
            onClick={(): void => {
              setCreateFormState(CreateFormState.Create);
            }}
          >
            Create New Data Table / Chart
          </Button>
        </Col>
      </Row>
      {!isGraphDataError && !isGraphDataLoading && !!graph && (
        <>
          <Divider className={styles.divider} />
          <div className={styles.contentItem}>
            <TitleBar
              graph={graph}
              onEditClick={(): void => setCreateFormState(CreateFormState.Edit)}
              onDeleteClick={(): void => {
                setShowDeleteModal(true);
              }}
            />
            <Content data={graphData} isLoading={isGraphDataLoading} />
            <Table
              data={graphData}
              isLoading={isGraphDataLoading}
              companies={!companyId ? portfolio?.investments : undefined}
            />
          </div>
        </>
      )}
      {showCreateForm && (
        <ChartCreate
          graphId={graph2EditId}
          onHide={(): void => {
            setCreateFormState(CreateFormState.Hidden);
          }}
          reload={handleGraphDataReload}
        />
      )}
      <DeleteChart
        graph={graph}
        visible={showDeleteModal}
        onClose={(): void => {
          setShowDeleteModal(false);
        }}
        companyId={companyId}
        reload={handleGraphsReload}
      />
    </>
  );
};

export const Charts = observer(ChartsFn);
