import React, { FC, useReducer, useMemo } from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table/interface';
import { TableProps } from 'antd/lib/table';
import { MetricSharePeriod, MetricType, WithClass } from 'types';
import { MetricRowItem, FilterState, ColumnWidth } from 'types/metricTableItem';
import { extractTags } from 'tools/tagsTool';
import { getPopupContainer } from 'tools/antConfig';
import { metricDependenciesStore } from 'store';
import { calcColumns, filtersReducer, unwrapTypes } from './tools';
import { metricColumns } from './constants';

/*
 * This component is used to create table with metrics data.
 * Need to provide list of columns name and dataSource to render.
 */

type MetricsTableProps = TableProps<MetricRowItem> &
  WithClass & {
    layout?: 'auto' | 'fixed';
    columnNamesList: string[];
    isLoading?: boolean;
    columnWidth?: ColumnWidth;
    showStatusIcon?: boolean;
  };

export const MetricsTable: FC<MetricsTableProps> = ({
  layout = 'auto',
  dataSource,
  columnNamesList,
  className,
  rowKey = 'id',
  isLoading,
  columnWidth,
  showStatusIcon = false,
  ...props
}) => {
  const {
    categories,
    subCategories,
    allTagCategories,
  } = metricDependenciesStore;

  const tags = useMemo(() => extractTags(allTagCategories || []), [
    allTagCategories,
  ]);

  const [filters, dispatchFilters] = useReducer(filtersReducer, {
    grandParentId: [],
    parentId: [],
    tags: [],
    frequency: [],
    type: [],
  });

  const metricColumnsFiltered = useMemo<ColumnType<MetricRowItem>[]>(() => {
    const defaultColumns = metricColumns.filter((column) =>
      columnNamesList.includes(column.dataIndex as string),
    );
    return calcColumns({
      defaultColumns,
      filters,
      cats: categories.filter((cat) =>
        dataSource?.find((data) => data.grandParentId === cat.id),
      ),
      subCats: subCategories.filter((subcat) =>
        dataSource?.find((data) => data.parentId === subcat.id),
      ),
      tags: tags.filter((tag) =>
        dataSource?.find((data) => data.tags?.includes(tag.id)),
      ),
      types: Object.keys(MetricType).filter((type) =>
        dataSource?.find((data) => data.typeConfig?.type === type),
      ) as MetricType[],
      frequencies: Object.keys(MetricSharePeriod).filter((frequency) =>
        dataSource?.find((data) => data.frequency === frequency),
      ) as MetricSharePeriod[],
      columnWidth,
      showStatusIcon,
    });
  }, [
    categories,
    filters,
    subCategories,
    tags,
    columnNamesList,
    columnWidth,
    dataSource,
    showStatusIcon,
  ]);

  const preparedData = useMemo<MetricRowItem[] | undefined>(
    () => (dataSource ? unwrapTypes(dataSource) : undefined),
    [dataSource],
  );

  return (
    <Table
      rowKey={rowKey}
      tableLayout={layout}
      pagination={false}
      showSorterTooltip={false}
      className={className}
      dataSource={preparedData}
      loading={isLoading}
      columns={metricColumnsFiltered}
      onChange={(pagination, toFilters): void => {
        dispatchFilters(toFilters as FilterState);
      }}
      getPopupContainer={getPopupContainer}
      {...props}
    />
  );
};
