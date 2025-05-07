import React, { FC, useEffect, useState } from 'react';
import { PageSectionWrapper } from '../../../../components';
import { cdfiStore } from 'store';
import { useCdfiOrgDetails } from '../../../../dataManagement';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from './LogoHeader';
import { Metric } from '../../../../types';
import { Input, Space, Table, Button, Checkbox, Spin } from 'antd';
import { FileExcelOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './SupplementalDashboard.module.scss';
import { ColumnType } from 'antd/lib/table';
import { useCdfiMetrics } from '../../../../dataManagement/useCdfiMetrics';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppConfig } from '../../../../useAppConfig';

interface SupplementalProps {
  data: Metric[];
}

type MetricData = Metric & {
  key: React.Key;
};

function addIndexAsKey(metrics: Metric[] | null): MetricData[] {
  return (metrics ?? []).map((metric, index) => ({ key: index, ...metric }));
}

function getDistinctPeriods(metrics: Metric[] | null): string[] {
  return Array.from(
    new Set(
      (metrics ?? []).flatMap(
        (metric: Metric): string[] =>
          metric.values?.map(
            (value) => `${value.periodEndDate}`,
          ) ?? [],
      ),
    ),
  )
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

export const SupplementalDashboard: FC<SupplementalProps> = (props) => {
  const dataset = 'Supplemental';
  const { cdfiId, getCdfiMetricExcelReport } = cdfiStore;
  const logo = useCdfiLogo(cdfiId);
  const [loadingCdfiExcelReport, setLoadingCdfiExcelReport] = useState(false);
  const [showAllYears, setShowAllYears] = useState(false);
  const { data: cdfiData } = useCdfiOrgDetails(cdfiId);
  const { data: metrics } = useCdfiMetrics(cdfiId, dataset, showAllYears);
  const distinctPeriods = getDistinctPeriods(metrics);
  const metricsWithIndex = addIndexAsKey(metrics);
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Metric[]>(metricsWithIndex);

  const handleFilter = (
    searchTerm: string,
    metricsArray: MetricData[],
  ): MetricData[] => {
    if (searchTerm === '') {
      return metricsArray;
    }
    return metricsArray.filter(
      (metric) =>
        metric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metric.accountCode.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const onChangeActive = (value: CheckboxChangeEvent) => {
    getChecked(value.target.checked);
    setShowAllYears(!checked);
  };

  const onExportClick = () => {
    setLoadingCdfiExcelReport(true);
    getCdfiMetricExcelReport(cdfiId, dataset, showAllYears).then(() => {
      setLoadingCdfiExcelReport(false);
    });
  };

  useEffect(() => {
    setFilteredData(handleFilter(filterValue, addIndexAsKey(metrics)));
  }, [filterValue, metrics]);

  const [checked, getChecked] = useState(
    showAllYears !== undefined ? showAllYears : false,
  );

  console.log(distinctPeriods);
  const columns: ColumnType<Metric>[] = [
    {
      title: 'Metric',
      dataIndex: 'accountCode',
      fixed: 'left',
      width: 350,
      render: (text: string, record: Metric) =>
        `${record.accountCode} - ${record.name}`,
    },
    ...distinctPeriods.map((period) => ({
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div>{period}</div>
          </div>
        );
      },
      dataIndex: period,
      width: 90,
      render: (text: string, record: Metric) => {
        const metricValue = record.values?.find((value) =>
          period.includes(value.periodEndDate),
        );
        const parsedValue = metricValue
          ? parseFloat(metricValue.value)
              .toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits:
                  parseFloat(metricValue.value) < 100 ? 2 : 0,
              })
              .replace(/(\.\d*?[1-9])0+|\.0*$/, '')
          : '';
        return parsedValue === '0' ? '-' : parsedValue;
      },
    })),
  ];

  return (
    <PageSectionWrapper
      title="Supplemental Data"
      ratings
      topTitle={<LogoHeader imgPath={logo} subTitle={cdfiData?.cdfi.name} />}
    >
      {loadingCdfiExcelReport ? (
        <div className={styles.spinLoadingFile}>
          <Spin spinning />
        </div>
      ) : null}
      <Space className={styles.tableSearchBar}>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            setFilterValue(e.target.value.toLowerCase());
          }}
          placeholder="Search metric..."
          allowClear
          suffix={<SearchOutlined />}
        />
        <Button onClick={onExportClick}>
          <FileExcelOutlined /> Export as Excel workbook
        </Button>
        <Checkbox
          checked={checked}
          onChange={(value): void => onChangeActive(value)}
        >
          All Years
        </Checkbox>
      </Space>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        showSorterTooltip={false}
        size="small"
        className={styles.table}
        scroll={{ x: 'max-content', y: 'calc(100vh - 300px)' }}
      />
    </PageSectionWrapper>
  );
};
