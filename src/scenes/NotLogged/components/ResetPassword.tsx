import React, { useCallback, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import { typography } from 'constants/typography';
import { ServicePageLayout } from 'components';
import { SubmitUsernameFormValues } from '../types';
import { initiatePasswordReset } from '../tools';
import { SubmitEmailForm } from './SubmitEmailForm';

const { Title, Paragraph } = Typography;

const { resetPasswordTitle, submitUsernamelDescription } = typography(
  'authentication',
);

export const ResetPassword: FC = () => {
  const history = useHistory();

  const submitHandler = useCallback(
    (values: SubmitUsernameFormValues) => {
      initiatePasswordReset(values.username)
        .then(() =>
          history.push({
            pathname: `/changePassword/${values.username}`,
          }),
        )
        .catch((e) => {
          history.replace({
            pathname: `/login`,
            state: values.username,
          })
        });
    },
    [history],
  );

  return (
    <ServicePageLayout>
      <Title>{resetPasswordTitle}</Title>
      <Paragraph>{submitUsernamelDescription}</Paragraph>
      <SubmitEmailForm onFinish={submitHandler} />
    </ServicePageLayout>
  );
};
