import React, {FC, useEffect, useState} from 'react';
import { PageSectionWrapper } from 'components';
import {subscriberStore, userStore} from "../../store";
import {useSubscribers, useSubscriberSubscriptions} from "../../dataManagement";
import {WithCompanyTypeProps} from "../Dashboard/scenes/CdfiDashboard/types";
import {
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_TWO_THIRDS_ROW_SPAN,
  GRID_GUTTER
} from "../../constants";
import {Row, Col, Typography, Card, Table} from 'antd';
import {FileDoneOutlined} from "@ant-design/icons";
import {Link as LinkReact} from "react-router-dom";
import styles from "./MyAccount.module.scss";
import {getSubscriberSubscription} from "../../dataManagement/operations/subscriberOperations";
import {SubscriberSubscriptionEditFormData, SubscriberSubscriptionsDTO} from "../../types";
import {columnsMyAccount} from "./makeColumns";
import {getDataSource} from "./makeDataSource";
import moment from "moment";
import {CurrentUserType} from "../../components/Layout/components/Profile";
import {getUser} from "../../dataManagement/operations/userOperations";

const { Paragraph, Link } = Typography;

export const MyAccount:  FC<WithCompanyTypeProps> = () => {
  const [subscriberSubscription, setSubscriberSubscription] = useState<SubscriberSubscriptionEditFormData>();
  const { data: subscribers } = useSubscribers();
  const { subscriberItem } = subscriberStore;
  const {data: subscriberSubscriptions}  = useSubscriberSubscriptions(subscriberItem?.id);
  const [userData, setUserData] = useState<CurrentUserType | null>(null);
  const id = userStore.info.userId;
  const startDate =
    subscriberSubscriptions?.subscriberSubscriptions.content.length !== 0
      ? subscriberSubscriptions?.subscriberSubscriptions.content[0].startDate
      : '';

  useEffect(() => {
    getUser(id).then((data) => {
      setUserData(data);
    });
  }, []);

  const isEmailReminders = userData && userData.emailReminders ? '' : 'not';
  const isNewFinancialReminders = userData && userData.newFinancialReminders ? '' : 'not';

  useEffect(() => {
    if (subscriberSubscriptions?.subscriberSubscriptions.content.length !== 0 && subscriberSubscriptions?.subscriberSubscriptions.content[0].id !== undefined) {
      // @ts-ignore
      getSubscriberSubscription(subscriberItem?.id, subscriberSubscriptions?.subscriberSubscriptions.content[0].id).then((result) => {
        return setSubscriberSubscription(result);
      })
    }
  }, [subscriberSubscriptions?.subscriberSubscriptions])

  const expirationDate = subscriberSubscriptions?.subscriberSubscriptions.content.length !== 0 ?
    subscriberSubscriptions?.subscriberSubscriptions.content[0].expirationDate : '';
  const columns = columnsMyAccount();
  const dataSource = subscriberSubscription ? getDataSource(subscriberSubscription) : [];

  const validDate = () => {
    if(expirationDate === '') {
      return false;
    }

    // @ts-ignore
    const inputDate = new Date(moment(expirationDate)).toISOString().slice(0, 10);
    const currentDate = new Date().toISOString().slice(0, 10);
    return moment(currentDate).isSameOrBefore(inputDate);
  }

  return subscriberSubscriptions ? (
    <PageSectionWrapper
      title="My Account"
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
          <div  className={styles.descriptions}>
            {validDate() ?
              <>
                <p>Current Subscription period is from {startDate} to&nbsp;{expirationDate}.</p>
                <p> You are {isEmailReminders} set up to receive email reminders when your Company's Aeris service subscription is going to
                  expire soon.</p>
                <p>You are {isNewFinancialReminders} set up to receive email reminders when one of the CDFIs in your
                  subscription releases new Quarterly or Audited financial data (if your subscription includes Aeris<sup>® </sup>
                  Performance Maps for that CDFI).
                </p>
              </> : !validDate() && subscriberSubscriptions?.subscriberSubscriptions.content.length === 0 ?
                <p>You don't have subscriptions. Please contact{' '}
                  <a href="mailto: support@aerisinsight.com">Aeris Subscription Support</a>
                  {' '}to discuss renewal options.
                </p> :
              <p>Your subscription expired on {expirationDate}. Please contact{' '}
                <a href="mailto: support@aerisinsight.com">Aeris Subscription Support</a>
                {' '}to discuss renewal options.
              </p>
            }
          </div>
          {validDate() ?
            <>
              <h2 className={styles.title}>Your organization is currently subscribed to the following Aeris services.</h2>
              <Table
                className={styles.myAccountTable}
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size={'small'}
              />
            </> : null
          }
        </Col>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Card className={styles.cardStyle}>
              <Paragraph strong>
                <FileDoneOutlined />
                Subscriptions
              </Paragraph>
              <Paragraph>
                For adding subscriptions, please contact
              </Paragraph>
              <Link href="mailto:subscriptions@aerisinsight.com">
                subscriptions@aerisinsight.com
              </Link>
            </Card>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Card className={styles.cardStyle}>
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
      </Row>
    </PageSectionWrapper>
  ) : null
}
