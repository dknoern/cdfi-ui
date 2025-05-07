import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ColumnType, TableRowSelection } from 'antd/lib/table/interface';
import { Form, Table } from 'antd';
import { typography } from 'constants/typography';
import { GraphMeta, GraphType } from 'types/graphs';
import { formStore } from 'forms/PortfolioSetup/formStore';
import { stepContext } from 'forms/PortfolioSetup/context';
import { formName } from 'forms/PortfolioSetup/constants';
import { generateFormId } from 'tools/formTools';
import { getPopupContainer } from 'tools/antConfig';
import { useGraphsFor } from 'dataManagement';
import { StepTitle } from '../../components';
import { chartColumns } from './constants';
import styles from './TablesAndCharts.module.scss';

const { chartTitle } = typography('portfolioCreation');

export const TablesAndCharts: FC = () => {
  const [selected, setSelected] = useState<React.Key[]>([]);
  const { state, dispatch: dispatchStep } = useContext(stepContext);
  const { data: charts, isLoading: isChartsLoading } = useGraphsFor({
    portfolioId: 0,
    companyId: 0,
  });

  useEffect(() => {
    if (formStore.selectedCharts && formStore.selectedCharts.length > 0) {
      setSelected(formStore.selectedCharts);
    }
  }, []);

  const columns = useMemo<ColumnType<GraphMeta>[]>(() => {
    if (!charts) return [];
    return chartColumns(
      Object.keys(GraphType).filter((type) =>
        charts?.find((chart) => chart.graphType === type),
      ) as GraphType[],
    );
  }, [charts]);

  useEffect(() => {
    dispatchStep({ type: 'available', step: 3 });
  }, [dispatchStep]);

  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys);
      formStore.updateData({ charts: selectedRowKeys as GraphMeta['id'][] });
    },
    selectedRowKeys: selected,
  };

  const handleNextClick = useCallback(() => {
    dispatchStep({ type: 'goToStep', step: state.step + 1 });
  }, [dispatchStep, state.step]);

  return (
    <Form id={generateFormId(formName, state.step)} onFinish={handleNextClick}>
      <StepTitle>{chartTitle}</StepTitle>
      <Table
        id="chartsTable"
        rowKey="id"
        pagination={false}
        showSorterTooltip={false}
        className={styles.table}
        loading={isChartsLoading}
        dataSource={charts ?? []}
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ y: 600 }}
        getPopupContainer={getPopupContainer}
      />
    </Form>
  );
};
