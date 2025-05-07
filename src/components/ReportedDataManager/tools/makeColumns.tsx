import React, { ReactNode } from 'react';
import { ColumnType } from 'antd/lib/table/interface';
import { ColumnProps, TableProps } from 'antd/lib/table';
import { MetricCategory, MetricSubCategory } from 'types';
import { PersonRole } from 'types/auth';
import { DataItem, ReportingPeriod } from 'types/reportedData';
import {
  HEADER_HEIGHT,
  GRID_GUTTER,
  TABLE_HEADER_HEIGHT_DEFAULT,
} from 'constants/ui';
import { FilterState } from 'scenes/Dashboard/types';
import { calcFilterCats, calcFilterSubCats } from 'tools';
import {
  defaultColumns,
  defaultColumnKeys,
  DATA_COLUMN_WIDTH_DEFAULT,
  MetricColumnCode,
} from 'components/ReportedDataManager/constants';
import { renderWithTooltip } from 'tools/renderHelpers';

interface MainColumnsProps {
  filters: FilterState;
  cats: MetricCategory[];
  subCats: MetricSubCategory[];
  userRole: PersonRole;
}

interface MainColumnsMaker {
  ({ filters, cats, subCats, userRole }: MainColumnsProps): ColumnProps<
    DataItem
  >[];
}

// TODO remove category and subcategory filter after 100% giving up using it
const makeMainColumns: MainColumnsMaker = ({
  filters,
  cats,
  subCats,
  userRole,
}) => {
  return defaultColumns
    .filter((col) =>
      defaultColumnKeys.get(userRole)?.includes(col.key as MetricColumnCode),
    )
    .map((col) => {
      switch (col.key) {
        case MetricColumnCode.NAME:
          return {
            ...col,
            render: (value, record): ReactNode =>
              renderWithTooltip(value, record.question),
          };
        case MetricColumnCode.CATEGORY:
          return {
            ...col,
            filters: calcFilterCats(cats, subCats, filters.subcategory),
          };
        case MetricColumnCode.SUBCATEGORY:
          return {
            ...col,
            filters: calcFilterSubCats(subCats, filters.category),
          };
        default:
          return col;
      }
    });
};

interface ColumnsMaker {
  (
    props: MainColumnsProps & {
      dataColumns: ColumnType<DataItem>[];
      newPeriodConfig: ReportingPeriod | null;
    },
  ): ColumnType<DataItem>[];
}
export const makeColumns: ColumnsMaker = ({
  dataColumns,
  newPeriodConfig,
  userRole,
  filters,
  cats,
  subCats,
}) => {
  const result: ColumnType<DataItem>[] = makeMainColumns({
    userRole,
    filters,
    cats,
    subCats,
  });

  if (newPeriodConfig) {
    const title = `${newPeriodConfig.year} Q${newPeriodConfig.quarter}`;
    const dataIndex = 'newValue';
    result.push({
      dataIndex,
      title,
      render: (text): ReactNode => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
      width: DATA_COLUMN_WIDTH_DEFAULT,
      onCell: (record) => {
        return {
          isNewCell: true,
          record,
          dataIndex,
          title,
          quarter: newPeriodConfig.quarter,
          period: newPeriodConfig,
        };
      },
    });
  }

  result.push(...dataColumns);

  return result;
};

export const scrollValue = (
  dataColumns: ColumnProps<DataItem>[] | undefined,
): TableProps<DataItem>['scroll'] => {
  const scroll: TableProps<DataItem>['scroll'] = {
    y:
      window.innerHeight -
      HEADER_HEIGHT -
      GRID_GUTTER * 2 -
      TABLE_HEADER_HEIGHT_DEFAULT,
  };
  if (Array.isArray(dataColumns) && dataColumns.length > 0) {
    scroll.x = dataColumns.length * DATA_COLUMN_WIDTH_DEFAULT + 200;
  }
  return scroll;
};
