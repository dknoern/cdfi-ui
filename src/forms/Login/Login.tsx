import React, { FC, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FormProps } from 'antd/lib/form/Form';
import { Form, Input, Button } from 'antd';
import { LoginFormResult } from 'types/form';
import { required, minLength, restrictWhitespace } from 'tools/formRules';
import { uiStore } from 'store';
import { UI_STORE_FLOW_NAME as CONTACT_SUPPORT_FLOW_NAME } from 'components/ContactSupport';
import { aerisEmail } from 'constants/aerisEmail';

const activateContactSupportFlow = (): void => {
  uiStore.activateFlow(CONTACT_SUPPORT_FLOW_NAME);
};

type LoginProps = {
  onFinish: (values: LoginFormResult) => void;
  username?: string;
};

export const Login: FC<LoginProps> = ({ onFinish, username }) => {
  const [canProceed, setCanProceed] = useState(true);

  const handleFieldsChange = useCallback(
    (
      changedValues: FormProps['fields'],
      allValues: Required<FormProps>['fields'],
    ) => {
      const [username, password] = allValues.map((item) =>
        (item.value || '').trim(),
      );

      setCanProceed(username && password);
    },
    [],
  );

  return (
    <>
      <Form
        layout="vertical"
        onFieldsChange={handleFieldsChange}
        onFinish={onFinish}
        requiredMark={false}
        initialValues={username ? { email: username } : undefined}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[required(), minLength(), restrictWhitespace()]}
        >
          <Input
            placeholder="Enter Username"
            required
            autoComplete="username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[required(), minLength(), restrictWhitespace()]}
        >
          <Input.Password
            placeholder="Enter Password"
            required
            autoComplete="current-password"
            visibilityToggle
          />
        </Form.Item>
        <Form.Item>
          <Link to="/resetPassword">
            <Button id="forgotPasswordBtn" type="link">
              Forgot Password?
            </Button>
          </Link>

          <Button id="contactSupportBtn" type="link">
            <a href={`mailto: ${aerisEmail}`}>Contact Aeris Support</a>
          </Button>
        </Form.Item>
        <Form.Item name="loginButton">
          <Button
            id="loginButton"
            type="primary"
            htmlType="submit"
            disabled={!canProceed}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
