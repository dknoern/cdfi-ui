import React, { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { ChangePasswordFormResult, ResetPasswordFormResult } from 'types/form';
import { FormLabelWithIcon } from 'components';
import { userStore } from 'store';
import { passwordFieldRules, resetCodeFieldRules } from './constants';
import { checkPasswordsMatching } from './tools';
import styles from './ChangePassword.module.scss';

const hint: React.ReactNode = (
  <>
    1. Password Length: 8 to 20 characters
    <br />
    2. Must contain 1 special character (
    {`e.g. = + - ^ $ * . [ ] { } ( ) ? " ! @ # % & /  , > < ' : ; | _ ~ `}
    )<br />
    3. Must contain at least 1 upper case character
    <br />
    4. Must contain at least 1 lower case character
    <br />
    5. Must contain at least 1 number
  </>
);

type ChangePasswordProps = {
  onFinish: (
    values: ResetPasswordFormResult | ChangePasswordFormResult,
  ) => void;
  isResetFlow?: boolean;
};

export const ChangePassword: FC<ChangePasswordProps> = ({
  onFinish,
  isResetFlow = false,
}) => {
  return (
    <Form layout="vertical" size="large" onFinish={onFinish} autoComplete="off">
      {isResetFlow && (
        <Form.Item
          label="Reset Code"
          name="resetCode"
          rules={resetCodeFieldRules}
        >
          <Input placeholder="Enter reset code" autoComplete="new-password" />
        </Form.Item>
      )}
      <Form.Item
        label={
          <FormLabelWithIcon
            text="New Password"
            description={hint}
            icon={InfoCircleFilled}
            className={styles.fieldLabel}
          />
        }
        name="new"
        rules={passwordFieldRules}
      >
        <Input.Password
          type="password"
          autoComplete="new-password"
          placeholder="Enter new password"
        />
      </Form.Item>
      <Form.Item
        label={
          <FormLabelWithIcon
            text="Repeat New Password"
            description={hint}
            icon={InfoCircleFilled}
            className={styles.fieldLabel}
          />
        }
        name="newRepeated"
        dependencies={['new']}
        rules={[
          ...passwordFieldRules,
          ({ getFieldValue }) => ({
            validator: (_, value): Promise<string | void> =>
              checkPasswordsMatching(getFieldValue('new'), value),
          }),
        ]}
      >
        <Input.Password
          type="password"
          autoComplete="new-password"
          placeholder="Repeat new password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          id="cancelPasswordUpdateBtn"
          type="link"
          htmlType="reset"
          size="large"
          onClick={() => userStore.resetUser()}
          style={{ textDecoration: 'underline' }}
        >
          Back to Login
        </Button>
        <Button
          id="changePasswordBtn"
          type="primary"
          htmlType="submit"
          size="large"
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
