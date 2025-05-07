import React, { FC, useCallback, useMemo } from 'react';
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Card, Table } from 'antd';
import { Portfolio, Company } from 'types';
import { DashboardCardType } from 'scenes/Dashboard/types';
import { cardUrlParts } from 'scenes/Dashboard/constants/cardUrlParts';
import { getColumns, companyLinkMaker } from './tools';
import styles from './DashboardListCard.module.scss';

type DashboardListCardProps = {
  item: Portfolio | Company;
  isLoading?: boolean;
  type: DashboardCardType;
} & RouteComponentProps;

const DashboardListCardFn: FC<DashboardListCardProps> = ({
  item,
  isLoading,
  type,
  match,
}) => {
  const portfolioLink = `${cardUrlParts[type]}/${item.id}`;

  const getLink = useCallback(
    companyLinkMaker(match.url, portfolioLink, type),
    [match.url, portfolioLink, type],
  );

  const columns = useMemo(() => {
    return getColumns(getLink, type);
  }, [getLink, type]);

  const content = useMemo(() => {
    return (
      <Table
        className={styles.table}
        columns={columns}
        dataSource={(
          (item as Portfolio)?.investments || (item as Company)?.investmentsInfo
        )?.map((company) => ({
          ...company,
          key: company.id,
          investmentStartDate: company.investmentLife.start,
        }))}
        pagination={{ showSizeChanger: true }}
      />
    );
  }, [columns, item]);

  const history = useHistory();

  const goToDash = useCallback(() => {
    history.push(portfolioLink);
  }, [history, portfolioLink]);

  return (
    <Card bordered={false} loading={isLoading} className={styles.listCard}>
      {type === DashboardCardType.PORTFOLIO && (
        <div className={styles.listCardTitle}>
          <Button type="link" onClick={goToDash}>
            {item.name}
          </Button>
        </div>
      )}
      {content}
    </Card>
  );
};

export const DashboardListCard = withRouter(DashboardListCardFn);
