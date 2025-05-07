import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Form, Table } from 'antd';
import { Company, VoidFn } from 'types';
import { ReportingPeriod } from 'types/reportedData';
import { FormData4MVCR, UpdateValueFormData } from 'types/metricValue';
import { uiText } from 'constants/uiText';
import { Dialog } from 'tools';
import { useMetrics, useReportedData } from 'dataManagement';
import { useMetricValueChangeRequests } from 'dataManagement/useMetricValueChangeRequests';
import { getPopupContainer } from 'tools/antConfig';
import { metricDependenciesStore, userStore } from 'store';
import { tableCellRenderer } from '../TableCell/TableCell';
import styles from '../ReportedDataTable.module.scss';
import { subscribeToReportedDataTableConfigUpdates } from './tools/subscribeToReportedDataTableConfigUpdates';
import { FilterState, RequestConfig } from './types';
import { filtersInitialState } from './constants';
import {
  calculateOccupiedPeriods,
  filtersReducer,
  injectCats,
  makeColumns,
  makeExpandedRowKeys,
  makeRowClassName,
  savePeriodData,
  scrollValue,
} from './tools';
import { editValue, manageRequest } from './tools/handlers';
import { TableFooter } from './TableFooter';
import { ChangeValue } from './ChangeValue';
import { ManageRequest } from './ManageRequest';
import { NewPeriodConfig } from './NewPeriodConfig';
import { DeletePeriod } from './DeletePeriod';
import { newPeriodStore } from './newPeriodStore';
import { headerCellRenderer } from './PeriodHeaderCell';

type ReportedDataManagerProps = {
  companyId?: Company['id'];
};

const ReportedDataManagerFn: FC<ReportedDataManagerProps> = ({ companyId }) => {
  const history = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();
  const usedCompanyId = companyId ?? userStore.info.companyId;
  const { newPeriodConfig } = newPeriodStore;

  const { data: allMetricsData, isLoading: isMetricsLoading } = useMetrics();

  const {
    data: reportedData,
    isLoading: isReportedDataLoading,
    dataColumns,
    reload,
  } = useReportedData(usedCompanyId, {
    convertEmpty: false,
    loadEmpty: false,
  });

  const {
    data: pendingRequests,
    isLoading: isMVCRLoading,
  } = useMetricValueChangeRequests(companyId ?? null, true);

  const { categories: cats, subCategories: subCats } = metricDependenciesStore;

  // TODO remove category and subcategory filter after 100% giving up using it
  const [filters, dispatchFilters] = useReducer(
    filtersReducer,
    filtersInitialState,
  );

  const [
    updateValueFormData,
    setUpdateValueFormData,
  ] = useState<null | UpdateValueFormData>(null);

  const [
    selectedMetric4Request,
    setSelectedMetric4Request,
  ] = useState<null | FormData4MVCR>(null);

  const [periodToDelete, setPeriodToDelete] = useState<ReportingPeriod | null>(
    null,
  );

  const resetAll = useCallback<VoidFn>(() => {
    newPeriodStore.reset();
    form.resetFields();
    setUpdateValueFormData(null);
    setSelectedMetric4Request(null);
    dispatchFilters(filtersInitialState);
  }, [form]);

  // flush data before unloading component
  useEffect(() => newPeriodStore.reset, []);

  useEffect(resetAll, [usedCompanyId]);

  const startEditValue = useCallback(
    editValue(allMetricsData || [], setUpdateValueFormData),
    [allMetricsData],
  );

  const startRequestReview = useCallback(
    manageRequest(pendingRequests || [], setSelectedMetric4Request),
    [pendingRequests],
  );

  const startPeriodRemove = useCallback((period) => {
    setPeriodToDelete(period);
  }, []);

  const savePeriodDataHandler = useCallback(() => {
    if (!newPeriodConfig) return;

    savePeriodData({
      newPeriodConfig,
      newPeriodData: newPeriodStore.newPeriodData,
      companyId,
    })
      .then(() => {
        newPeriodStore.reset();
        form.resetFields();
        reload();
      })
      .catch();
  }, [companyId, newPeriodConfig, reload, form]);

  const onFinishReportingDataForm = useCallback<VoidFn>(() => {
    if (!newPeriodConfig) return;

    Dialog.confirm({
      title: uiText('dataInput', 'confirmSavePeriodDataTitle'),
      content: uiText(
        'dataInput',
        userStore.isFM
          ? 'confirmSavePeriodDataTextFM'
          : 'confirmSavePeriodDataTextPC',
      ),
      onOk: savePeriodDataHandler,
    });
  }, [savePeriodDataHandler, newPeriodConfig]);

  useEffect(() => {
    const { metricId, period, manageRequest: isMVCRflow } =
      (location.state as RequestConfig & { manageRequest?: boolean }) ?? {};

    if (
      !isMVCRflow ||
      !metricId ||
      !period ||
      !pendingRequests ||
      !pendingRequests.length
    )
      return;

    startRequestReview({
      metricId,
      period,
    });
  }, [startRequestReview, location.state, pendingRequests]);

  const cellRenderer = useMemo(() => {
    return tableCellRenderer({
      startEditValue,
      startRequestReview,
      changeData: newPeriodStore.changePeriodData,
      reloadReport: reload,
    });
  }, [reload, startEditValue, startRequestReview]);

  // TODO remove category and subcategory filter after 100% giving up using it
  const columns = useMemo(
    () =>
      makeColumns({
        filters,
        cats,
        subCats,
        newPeriodConfig,
        dataColumns,
        userRole: userStore.role,
      }),
    [filters, cats, subCats, newPeriodConfig, dataColumns],
  );

  const tableFooter = useMemo(() => {
    if (!newPeriodConfig) return undefined;

    return (): React.ReactNode => (
      <TableFooter
        onCancel={(): void => {
          newPeriodStore.reset();
          form.resetFields();
        }}
      />
    );
  }, [newPeriodConfig, form]);

  useEffect(() => {
    newPeriodStore.setOccupiedPeriods(calculateOccupiedPeriods(dataColumns));
  }, [dataColumns]);

  // we need to inject categories to show tree view
  const data = useMemo(() => {
    return userStore.isFM
      ? injectCats(reportedData, cats, subCats)
      : reportedData;
  }, [reportedData, cats, subCats]);

  // and use row keys to expand categories
  const allRowKeys = useMemo<React.Key[]>(
    () => (userStore.isFM ? makeExpandedRowKeys(reportedData) : []),
    [reportedData],
  );
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  useEffect(() => {
    setExpandedRowKeys(allRowKeys);
  }, [allRowKeys]);

  useEffect(() => subscribeToReportedDataTableConfigUpdates(reload), [reload]);

  return (
    <>
      <Form form={form} onFinish={onFinishReportingDataForm} preserve={false}>
        <Table
          expandedRowKeys={expandedRowKeys}
          onExpandedRowsChange={setExpandedRowKeys}
          components={{
            header: { cell: headerCellRenderer(startPeriodRemove) },
            body: { cell: cellRenderer },
          }}
          columns={columns}
          dataSource={data || undefined}
          loading={isReportedDataLoading || isMetricsLoading || isMVCRLoading}
          rowKey={(record): React.Key =>
            record.metricId || (record.rowKey as string)
          }
          rowClassName={makeRowClassName}
          pagination={false}
          showSorterTooltip={false}
          footer={tableFooter}
          className={styles.table}
          getPopupContainer={getPopupContainer}
          scroll={scrollValue(dataColumns)}
          onChange={(pagination, toFilters): void => {
            dispatchFilters(toFilters as FilterState);
          }}
          expandable={{ defaultExpandAllRows: true }}
        />
      </Form>
      <ChangeValue
        formData={updateValueFormData}
        onCancel={(): void => setUpdateValueFormData(null)}
        onFinish={(): void => {
          setUpdateValueFormData(null);
          reload();
        }}
        companyId={usedCompanyId}
      />
      <ManageRequest
        metric={selectedMetric4Request}
        onCancel={(): void => {
          setSelectedMetric4Request(null);
          history.replace({ pathname: location.pathname, state: {} });
        }}
        onFinish={(): void => {
          setSelectedMetric4Request(null);
          reload();
        }}
      />
      <NewPeriodConfig />
      <DeletePeriod
        period={periodToDelete}
        onCancel={(): void => {
          setPeriodToDelete(null);
        }}
        onFinish={(): void => {
          setPeriodToDelete(null);
          reload();
        }}
      />
    </>
  );
};

export const ReportedDataManager = observer(ReportedDataManagerFn);
