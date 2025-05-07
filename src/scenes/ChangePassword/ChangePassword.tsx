import React, { useCallback, FC } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import { User } from 'types';
import { ChangePasswordFormResult, ResetPasswordFormResult } from 'types/form';
import { ServicePageLayout } from 'components';
import { userStore } from 'store';
import { ChangePassword as ChangePasswordForm } from 'forms';
import { typography } from 'constants/typography';
import { setPassword, resetPassword } from './tools';

const { Title, Paragraph } = Typography;

const {
  changePasswordTitle,
  changePasswordDescription,
  resetPasswordTitle,
  resetPasswordDescription,
} = typography('authentication');

export const ChangePassword: FC = () => {
  const history = useHistory();

  const { username } = useParams<{ username: User['username'] }>();

  const saveHandler = useCallback(
    (values: ResetPasswordFormResult | ChangePasswordFormResult) => {
      if (username) {
        resetPassword(
          username,
          values.new,
          (values as ResetPasswordFormResult).resetCode,
        )
          .then(() =>
            history.replace({
              pathname: `/login`,
              state: { username },
            }),
          )
          .catch((e) => {
            // do nothing
          });
      } else {
        setPassword({
          username: userStore.username,
          oldPassword: userStore.password ?? '',
          newPassword: values.new,
        });
      }
    },
    [username, history],
  );

  return (
    <ServicePageLayout>
      <Title>{username ? resetPasswordTitle : changePasswordTitle}</Title>
      <Paragraph>
        {username ? resetPasswordDescription : changePasswordDescription}
      </Paragraph>
      <ChangePasswordForm onFinish={saveHandler} isResetFlow={!!username} />
    </ServicePageLayout>
  );
};
