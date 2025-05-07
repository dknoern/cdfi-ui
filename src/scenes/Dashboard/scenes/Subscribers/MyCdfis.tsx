import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link as LinkReact } from 'react-router-dom';
import { PageSectionWrapper } from 'components';
import {Table, Col, Row, Typography, Card, Spin, Input, Space} from 'antd';
import { userStore, subscriberStore } from 'store';
import {FileDoneOutlined, SearchOutlined} from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import {useCdfiSubscriptions, useSubscribers} from 'dataManagement';
import {
  GRID_GUTTER,
  GRID_COL_THREE_QUARTERS_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
} from 'constants/ui';
import {TitleCDFIEnum} from 'types';
import { WithCompanyTypeProps } from './types';
import { cardStyle, createSubscriptionsColumns } from './constants';
import { transformCdfiSubscriptionsToTableData } from './tools';
import { observer } from "mobx-react";
import styles from './MyCdfis.module.scss';
import {handleFilter} from "../../../../tools/searchBarTools/handleFilter";

export const MyCdfis: FC<WithCompanyTypeProps> = observer(() => {
  const history = useHistory();
  const { data: subscribers } = useSubscribers();
  const { subscriberId, subscriber } = subscriberStore;
  const id = (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor)? subscriberId : userStore.info.companyId;
  const { data, reload } = useCdfiSubscriptions(id);
  const subScriptions = data ? data.cdfiSubscriptions : undefined;

  const { Paragraph, Link } = Typography;

  const tableDataWithKeys = subScriptions
    ? transformCdfiSubscriptionsToTableData(subScriptions)
    : undefined;

  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const title = userStore.isSubscriber ? TitleCDFIEnum.MY_CDFIS : TitleCDFIEnum.SUBSCRIBER_CDFIS;
  const subscriberName = subscribers?.find((item) =>
    item.id == subscriberId ? item.name : '',
  )?.name;

  function addIndexAsKey(data: any[]) {
    return data.map((subscriber, index) => ({ key: index, ...subscriber }));
  }

  const contactsWithIndex = addIndexAsKey(subScriptions ? subScriptions : []);

  const [filterValue, setFilterValue] = useState('');
  const [filtered, setFiltered] = useState(contactsWithIndex);

  useEffect(() => {
    setFiltered(handleFilter(filterValue, contactsWithIndex));
  }, [filterValue, subScriptions ]);

  return (
    <PageSectionWrapper
      topTitle={title !== TitleCDFIEnum.SUBSCRIBER_CDFIS ? userStore.isSubscriber ? subscriber?.name : subscriberName : ''}
      title={title}
    >
      <Space className={styles.tableSearchBar}>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist();
            setFilterValue(e.target.value.toLowerCase());
          }}
          placeholder='Search...'
          allowClear
          suffix={<SearchOutlined />}
        />
      </Space>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col
          span={userStore.isSubscriber ? GRID_COL_THREE_QUARTERS_ROW_SPAN : ''}
        >
          {(tableDataWithKeys && tableDataWithKeys?.length === 0) ||
          (tableDataWithKeys && tableDataWithKeys?.length > 0) ? (
            <Table
              className={styles.subscriptionsTable}
              // @ts-ignore
              dataSource={filtered ? filtered : []}
              columns={createSubscriptionsColumns(reload, history)}
              pagination={{ showSizeChanger: true }}
              size={'small'}
              showSorterTooltip
            />
          ) : (
            <span>
              <Paragraph>Loading CDFIs...</Paragraph>
              <Paragraph>
                <Spin indicator={loadingIcon} />
              </Paragraph>
            </span>
          )}
        </Col>
        {userStore.isSubscriber && (
          <Col span={GRID_COL_QUARTER_ROW_SPAN}>
            <Row gutter={[GRID_GUTTER, 0]}>
              <Card style={cardStyle}>
                <Paragraph strong>
                  <FileDoneOutlined />
                  Subscriptions
                </Paragraph>
                <Paragraph>
                To make changes to your Aeris subscription, please contact
                </Paragraph>
                <Link href="mailto:subscriptions@aerisinsight.com">
                  subscriptions@aerisinsight.com
                </Link>
              </Card>
            </Row>
            <Row gutter={[GRID_GUTTER, 0]}>
              <Card style={cardStyle}>
                <Paragraph strong>Select a New CDFI</Paragraph>
                <Paragraph>
                To add additional CDFIs to your subscription, please use the CDFI Selector.
                </Paragraph>
                <LinkReact
                  to="/cdfiSelector"
                  className={styles.link}
                >
                  Go to CDFI Selector
                </LinkReact>
              </Card>
            </Row>
          </Col>
        )}
      </Row>
    </PageSectionWrapper>
  );
});
