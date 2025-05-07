import React, { FC, useMemo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card, Row } from 'antd';
import {
  FMCompanyCard,
  Investment,
  PCCompanyCard,
  Portfolio,
  ReportingEntityCard,
} from 'types';
import { GRID_GUTTER } from 'constants/ui';
import {
  CardColumn,
  CardParent,
  DashboardCardType,
} from 'scenes/Dashboard/types';
import { cardUrlParts } from 'scenes/Dashboard/constants/cardUrlParts';
import { getCardColumns, getCardTags } from './tools';
import { KPICol, TagsBlock } from './DashboardItemCardContents';
import styles from './DashboardItemCard.module.scss';

type DashboardItemCardProps = {
  item:
    | Portfolio
    | PCCompanyCard
    | FMCompanyCard
    | ReportingEntityCard
    | Investment;
  isLoading?: boolean;
  type: DashboardCardType;
  parent?: CardParent;
} & RouteComponentProps;

const DashboardItemCardFn: FC<DashboardItemCardProps> = ({
  item,
  isLoading,
  type,
  history,
  parent,
}) => {
  const columns = useMemo((): CardColumn[] => {
    return getCardColumns(item, type);
  }, [item, type]);

  const tags = useMemo(() => {
    if (!item || type === DashboardCardType.FUND_MANAGER_COMPANY) return [];

    return getCardTags(item);
  }, [item, type]);

  const content = useMemo(
    () => (
      <>
        <Row
          justify="space-around"
          align="top"
          gutter={[GRID_GUTTER, GRID_GUTTER]}
        >
          <KPICol
            cardType={type}
            title={columns[0].title}
            text={columns[0].text}
          />
          <KPICol
            cardType={type}
            title={columns[1].title}
            text={columns[1].text}
          />
          {type === DashboardCardType.INVESTMENT && (
            <KPICol
              cardType={type}
              title={columns[2].title}
              text={columns[2].text}
            />
          )}
        </Row>
        {type !== DashboardCardType.FUND_MANAGER_COMPANY && (
          <TagsBlock cardType={type} tags={tags} />
        )}
      </>
    ),
    [columns, tags, type],
  );

  return (
    <Card
      onClick={(): void => {
        const url = `/dashboard${
          parent ? `/${cardUrlParts[parent.type]}/${parent.id}` : ''
        }/${cardUrlParts[type]}/${item.id}`;

        history.push(url);
      }}
      bordered={false}
      title={item.name}
      loading={isLoading}
      className={styles.card}
    >
      {content}
    </Card>
  );
};
export const DashboardItemCard = withRouter(DashboardItemCardFn);
