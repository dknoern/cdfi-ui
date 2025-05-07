import React, { FC, useMemo } from 'react';
import { Col, Divider, Form, Input, Row, Select } from 'antd';
import { User } from 'types';
import { FormData } from 'types/contactSupport';
import { GRID_GUTTER, GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { MIN_LENGTH_TEXT, MAX_LENGTH_TEXTAREA } from 'constants/validation';
import { fieldNames } from 'constants/forms/fieldNames';
import { PhoneInput } from 'components/PhoneInput';
import {
  emailFieldRules,
  minLength,
  maxLength,
  nameFieldRules,
  phoneFieldRules,
  required,
  restrictWhitespace,
} from 'tools/formRules';
import { categories, formId } from './constants';
import styles from './ContactSupport.module.scss';

type ContactSupportProps = {
  userInfo?: Pick<User, 'name' | 'surname' | 'email'>;
  onFinish: (values: FormData) => void;
};

export const ContactSupportForm: FC<ContactSupportProps> = ({
  userInfo,
  onFinish,
}) => {
  const isLogged = useMemo(() => !!userInfo, [userInfo]);

  const usedCats = useMemo(
    () => categories[userInfo ? 'logged' : 'notLogged'],
    [userInfo],
  );

  return (
    <Form
      id={formId}
      layout="vertical"
      size="large"
      onFinish={onFinish}
      initialValues={{ [fieldNames.misc.ACCOUNT_ID]: 0 }}
    >
      {!isLogged && (
        <>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item
                name={fieldNames.user.NAME}
                label="Name"
                rules={[required(), ...nameFieldRules]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
            </Col>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item
                name={fieldNames.user.SURNAME}
                label="Last Name"
                rules={[required(), ...nameFieldRules]}
              >
                <Input placeholder="Enter Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name={fieldNames.user.EMAIL}
            label="Email"
            rules={[required(), ...emailFieldRules]}
          >
            <Input placeholder="Enter Email" required autoComplete="email" />
          </Form.Item>
        </>
      )}
      {!!userInfo && (
        <>
          <Row>
            <Col flex={1}>
              <dl className={styles.userInfo}>
                <dt>Your name:</dt>
                <dd>{userInfo.name}</dd>
                <dt>Your email:</dt>
                <dd>{userInfo.email}</dd>
              </dl>
            </Col>
          </Row>
          <Divider className={styles.divider} />
        </>
      )}
      <Form.Item
        name={fieldNames.user.PHONE}
        label="Phone"
        rules={[required(), ...phoneFieldRules]}
      >
        <PhoneInput placeholder="Enter phone" />
      </Form.Item>
      {isLogged && (
        <Form.Item name={fieldNames.misc.ACCOUNT_ID} label="Account" rules={[]}>
          <Select
            options={[
              { label: 'Current account', value: 0 },
              { label: 'Not account specific', value: -1 },
            ]}
          />
        </Form.Item>
      )}
      <Form.Item
        name={fieldNames.misc.CATEGORY_NAME}
        label="Category"
        rules={[required()]}
      >
        <Select placeholder="Select Category" options={usedCats} />
      </Form.Item>
      <Form.Item
        name={fieldNames.misc.DESCRIPTION}
        label="Description"
        rules={[
          required(),
          restrictWhitespace(),
          minLength(MIN_LENGTH_TEXT),
          maxLength(MAX_LENGTH_TEXTAREA),
        ]}
      >
        <Input.TextArea placeholder="Describe Your problem" />
      </Form.Item>
    </Form>
  );
};
