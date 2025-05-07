import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CompanyType, PersonRole } from 'types';
import {
  ContentLimiter,
  LinkButton,
  PageSectionWrapper,
} from '../../../../components';
import { noData } from './tools/tools';
import { WithCompanyTypeProps } from './types';
import { useSubscriberOrgDetails, deleteSubscriber } from 'dataManagement';
import { Card, Row, Col, Typography } from 'antd';
import { GRID_GUTTER } from 'constants/ui';
import { configStore, subscriberStore } from 'store';
import styles from './SubscriberOrganizationDetails.module.scss';
import { smallCardStyle, largeCardStyle, contentText } from './constants';
import { formatPhoneNumber } from 'tools/formatPhoneNumber';
import { userStore } from 'store';
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons/lib/icons';

const { Paragraph } = Typography;
const { Link: TypographyLink } = Typography;

export const SubscriberOrganizationDetails: FC<WithCompanyTypeProps> = () => {
  const { subscriberId } = subscriberStore;

  const { data, resetStore } = useSubscriberOrgDetails(subscriberId);
  const subscriber = data ? data.subscriber : undefined;
  const isAdmin = userStore.info.auth === 'ADMIN';
  const isSubscriber =
    userStore.info.auth === PersonRole.ANALYST &&
    userStore.info.companyType === CompanyType.INVESTOR;
  const { subscriberDeleteEnabledValue } = configStore;

  const smallCard = (title: string, content: any) => (
    <Col xs={24} lg={12} xl={8} xxl={6}>
      <Card style={smallCardStyle}>{format(title, content)}</Card>
    </Col>
  );

  const format = (title: string, content: ReactNode) => (
    <>
      <Paragraph strong>{title}</Paragraph>
      <Paragraph>{content ? content : noData(contentText.noData)}</Paragraph>
    </>
  );

  const accountStatus = (
    <Paragraph className={styles.accountStatus}>
      <span className={subscriber?.isActive ? styles.on : '$'}></span>
      Account {subscriber?.isActive ? 'Active' : 'Inactive'}
    </Paragraph>
  );

  const editCard = (
    <Col lg={24} xl={8} xxl={6}>
      <Card bordered={false} style={{ backgroundColor: 'transparent' }}>
        <Paragraph strong>Edit Organization Details</Paragraph>
        <Paragraph>
          To update any information for your organization, please contact Aeris
          Support.
        </Paragraph>
        <TypographyLink href="mailto:info@aerisinsight.com">
          info@aerisinsight.com
        </TypographyLink>
      </Card>
    </Col>
  );

  const preferencesCard = (
    <div className={styles.preferencesCard}>
      <Paragraph>
        {subscriber?.hideActivity ? <CheckOutlined /> : <CloseOutlined />}
        Hide Activity
      </Paragraph>
      <Paragraph>
        {subscriber?.reportAllRows ? <CheckOutlined /> : <CloseOutlined />}
        All Report Rows
      </Paragraph>
    </div>
  );

  const address = (
    <>
      {subscriber?.address} {subscriber?.address2}
      <br />
      {subscriber?.city}, {subscriber?.state} {subscriber?.zip}
    </>
  );

  const history = useHistory();

  const editSubscriber = () => {
    history.push(`/manage/subscriber/${subscriberId}/update-subscriber`);
  };

  const editButton = (
    <LinkButton
      key="customizeReportedDataTable"
      icon={<EditOutlined />}
      onClick={(): void => {
        editSubscriber();
      }}
    />
  );

  // Delete button should not be available in production -
  // only for development and testing purposes
  // The delete button will only appear if subscriberDeleteEnabledValue
  // from the config store is true
  const onDeleteSubscriber = useCallback(() => {
    deleteSubscriber(subscriberId);
    history.push('/dashboard');
  }, []);

  const deleteButton = (
    <LinkButton
      key="deleteSubscriberButton"
      icon={<DeleteOutlined />}
      onClick={(): void => {
        onDeleteSubscriber();
      }}
    />
  );

  const phoneExtension = subscriber?.phoneExtension
    ? ` Ext ${subscriber?.phoneExtension}`
    : '';

  useEffect(() => {
    return function cleanup() {
      resetStore();
    };
  }, []);

  return (
    <>
      {subscriber && (
        <ContentLimiter>
          <PageSectionWrapper
            topTitle={subscriber?.name}
            title={`Organization Details: ${subscriber?.name}`}
            titleEllipsis
            configurationButtons={[isAdmin ? editButton : null]}
            className={styles.organizationDashboard}
          >
            <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
              <Col xs={24} md={12} lg={12} xl={8}>
                {isAdmin ? accountStatus : null}
                <Card style={largeCardStyle}>
                  <Row justify="space-between">
                    <Col span={12}>
                      {subscriber?.address && subscriber?.city
                        ? format('Address', address)
                        : noData(contentText.noAddress)}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      {format('Phone', [
                        subscriber?.phone
                          ? formatPhoneNumber(subscriber?.phone!)
                          : noData(contentText.noNumber),
                        phoneExtension,
                      ])}
                    </Col>
                    <Col span={12}>
                      {format(
                        'Fax',
                        subscriber?.fax
                          ? formatPhoneNumber(subscriber?.fax)
                          : noData(contentText.noNumber),
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      {format(
                        'Website',
                        subscriber?.website
                          ? subscriber?.website
                          : noData(contentText.noWebsite),
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={12} lg={12} xl={16}>
                <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
                  {smallCard('Preferences', preferencesCard)}
                  {isSubscriber && editCard}
                </Row>
              </Col>
            </Row>
            {subscriberDeleteEnabledValue && isAdmin && (
              <Row>
                <Paragraph style={{ paddingBottom: '30px' }}>
                  {deleteButton}
                </Paragraph>
              </Row>
            )}
          </PageSectionWrapper>
        </ContentLimiter>
      )}
    </>
  );
};
