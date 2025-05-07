import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { userFieldsRules } from 'constants/forms';
import { required } from 'tools/formRules';
import { SubmitUsernameFormValues } from '../types';

type SubmitUsernameFormProps = {
  onFinish: (values: SubmitUsernameFormValues) => void;
};

export const SubmitEmailForm: FC<SubmitUsernameFormProps> = ({ onFinish }) => {
  return (
    <Form
      layout="vertical"
      size="large"
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[required(), ...userFieldsRules.username]}
      >
        <Input placeholder="Enter Username" autoComplete="username" />
      </Form.Item>
      <Form.Item>
        <Link to="/login">
          <Button id="backToLoginBtn" type="link">
            Back to Login
          </Button>
        </Link>
        <Button
          id="submitEmailBtn"
          type="primary"
          htmlType="submit"
          size="large"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
