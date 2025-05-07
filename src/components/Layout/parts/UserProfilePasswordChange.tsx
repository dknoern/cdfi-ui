import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Row } from 'antd';
import { required, minLength, restrictWhitespace } from 'tools/formRules';
import styles from './UserProfilePasswordChange.module.scss';
import { authTools } from 'tools';
import { FormLabelWithIcon } from 'components/FormLabelWithIcon';
import { InfoCircleFilled } from '@ant-design/icons';
import { passwordFieldRules } from 'forms/ChangePassword/constants';
import { checkPasswordsMatching } from 'forms/ChangePassword/tools';
import { ChangePasswordFormResult, LoginFormResult } from 'types/form';
import { UserManager } from 'dataManagement/managers/UserManager';
import { dataMan } from 'dataManagement';
import { ManagerName } from 'dataManagement/managers';
import { CurrentUserType } from '../components/Profile';

const mgr = dataMan.manager(ManagerName.users) as UserManager;

type UserProfilePasswordChangeProps = {
  username: string | undefined;
  setShowPwChangeForm: (arg: boolean) => void;
  setUserData: (arg: CurrentUserType | null) => void;
};

export const UserProfilePasswordChange = ({
  username,
  setShowPwChangeForm,
  setUserData,
}: UserProfilePasswordChangeProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const checkedUsername = username ? username : '';

  const ChangedSuccessMsg = () => (
    <div className={styles.changedSuccessMsg}>
      <h1>Success!</h1> Log back in <br /> with your new password.
    </div>
  );

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

  const checkCurrentPassword = (values: LoginFormResult) => {
    authTools
      .authenticate(username, values.password)
      .then((res) => {
        setAuthenticated(res);
        setOldPassword(values.password);
      })
      .catch((err) => {
        message.error(err.message, 1.5);
        setAuthenticated(false);
      });
  };

  const changePassword = (values: ChangePasswordFormResult) => {
    if (oldPassword === values.newRepeated)
      return message.error('Must be a different password.');
    const trimmedPswd = values.newRepeated.trim();
    mgr
      .updatePassword(oldPassword, trimmedPswd, checkedUsername)
      .then(() => {
        setAuthenticated(false);
        setShowPwChangeForm(false);
        setUserData(null);
        message.success({
          content: <ChangedSuccessMsg />,
          className: styles.msgContainer,
          duration: 1.5,
        });
        setTimeout(() => authTools.logout(), 2000);
      })
      .catch((err) => message.error(err));
  };

  useEffect(() => {
    setOldPassword('');
  }, [authenticated]);

  return (
    <>
      {!authenticated && (
        <Row className={styles.scaleIn}>
          <Form id="checkPassword" onFinish={checkCurrentPassword}>
            <Row>Enter current password</Row>
            <Row>
              <Form.Item
                name="password"
                rules={[required(), minLength(), restrictWhitespace()]}
              >
                <Input.Password
                  required
                  autoComplete="current-password"
                  visibilityToggle
                />
              </Form.Item>
              <Button
                htmlType="submit"
                form="checkPassword"
                className={styles.submitPwBtn}
              >
                Submit Password
              </Button>
            </Row>
          </Form>
        </Row>
      )}

      {authenticated && (
        <Form
          className={styles.scaleIn}
          id="Change Password"
          onFinish={changePassword}
        >
          <Row>
            {' '}
            <FormLabelWithIcon
              text="New Password"
              description={hint}
              icon={InfoCircleFilled}
              className={styles.fieldLabel}
            />
          </Row>
          <Row>
            <Form.Item name="new" rules={passwordFieldRules}>
              <Input.Password
                type="password"
                autoComplete="new-password"
                placeholder="Enter new password"
              />
            </Form.Item>
          </Row>
          <Row>
            {' '}
            <FormLabelWithIcon
              text="Repeat New Password"
              description={hint}
              icon={InfoCircleFilled}
              className={styles.fieldLabel}
            />
          </Row>
          <Row>
            <Form.Item
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
            <Row>
              <Button
                htmlType="submit"
                form="Change Password"
                className={styles.submitPwBtn}
              >
                Change Password
              </Button>
            </Row>
          </Row>
          <Row>
            <span className={styles.chngPwMsg}>
              You will be logged out after changing your password.
            </span>
          </Row>
        </Form>
      )}
    </>
  );
};
