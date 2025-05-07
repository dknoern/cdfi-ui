import React, { FC, Fragment, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Typography, Form, Row, Col, Table } from 'antd';
import { FormProps } from 'antd/lib/form';
import {
  NotificationsConfig,
  LibraryFolder4Notifications,
  User,
  SelectOptions,
} from 'types';
import { typography } from 'constants/typography';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
} from 'constants/ui';
import { FormPrimaryLabel } from 'components';
import { notificationsCols } from './constants';
import { Group1, Group2, Group3 } from './components/formGroups';
import styles from './NotificationsForm.module.scss';

const { Text, Title } = Typography;

const { notificationForYourselfHint, notificationsSetupTitle } = typography(
  'portfolioCompanyCreation',
);

type FormDataType = Pick<NotificationsConfig, 'forPC'>;
type NotificationsFormProps = FormProps & {
  userNotificationsFolders: LibraryFolder4Notifications[];
  onTableItemChange?: (name: string, parentFolderName: string) => void;
  contacts: Partial<User>[];
  editable?: boolean;
};

const NotificationsFormFn: FC<NotificationsFormProps> = ({
  userNotificationsFolders,
  onTableItemChange,
  contacts,
  editable = true,
  ...formProps
}) => {
  const contactOptions = useMemo(
    () =>
      contacts
        .filter((item) => !!item.email)
        .map((item) => ({
          label: item.email,
          value: item.email,
        })) as SelectOptions<string>,
    [contacts],
  );

  return (
    <>
      <Title level={4}>{notificationsSetupTitle}</Title>
      <br />
      <Form<FormDataType>
        labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
        {...formProps}
      >
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              label={
                <FormPrimaryLabel
                  num={1}
                  text="Notifications for Reporting Entity contacts"
                />
              }
              className={styles.formItemWithoutBottomMargin}
            >
              <Group1 editable={editable} contactOptions={contactOptions} />
              <Group2 editable={editable} contactOptions={contactOptions} />
              <Group3 editable={editable} contactOptions={contactOptions} />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
              label={
                <FormPrimaryLabel num={2} text="Notifications for yourself" />
              }
              className={styles.formItemWithoutBottomMargin}
            >
              <Text className={styles.text} type="secondary">
                {(notificationForYourselfHint as string)
                  .split('. ')
                  .map((item) => (
                    <Fragment key={item}>
                      {item} <br />
                    </Fragment>
                  ))}
              </Text>
              <br />
              <Table
                id="notificationsTable"
                pagination={false}
                dataSource={(userNotificationsFolders || []).map(
                  (item: LibraryFolder4Notifications) => ({
                    ...item,
                    update: onTableItemChange,
                  }),
                )}
                columns={notificationsCols as any}
                rowKey={(record): string =>
                  `${record.name}-${record.parentFolderName}`
                }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export const NotificationsForm = observer(NotificationsFormFn);
