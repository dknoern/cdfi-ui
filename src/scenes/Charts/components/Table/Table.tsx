import React, { FC, useMemo } from 'react';
import { Investment } from 'types';
import { GraphPreviewViewWithMetricData } from 'types/graphs';
import {
  extractMetricEquationItemsForCompany,
  extractMetricEquationItemsForPortfolio,
} from 'tools/graphTools';
import { EquationsTable } from '../EquationsTable';
import { makeColumns } from './tools';

type TableProps = {
  data: GraphPreviewViewWithMetricData | null;
  isLoading: boolean;
  companies?: Pick<Investment, 'id' | 'name'>[];
};

export const Table: FC<TableProps> = ({ data, isLoading, companies }) => {
  const tableColumns = useMemo(() => {
    if (!data || isLoading) return [];

    return makeColumns(data);
  }, [data, isLoading]);

  const tableData = useMemo(() => {
    if (!data || isLoading) return [];

    const extractDataFn = companies
      ? extractMetricEquationItemsForPortfolio
      : extractMetricEquationItemsForCompany;

    return extractDataFn(data, companies ?? []);
  }, [companies, data, isLoading]);

  return (
    <EquationsTable
      isLoading={isLoading}
      data={tableData}
      columns={tableColumns}
      forPortfolio={!!companies}
    />
  );
};
