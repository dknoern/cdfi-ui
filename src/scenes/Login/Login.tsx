import React, { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography } from 'antd';
import { LoginFormResult } from 'types/form';
import { ServicePageLayout } from 'components';
import { Login as LoginForm } from 'forms';
import styles from './Login.module.scss';
import { processLogin } from './tools';
import Logo from 'assets/images/aeris-cloud-logo.png';
import { userStore } from 'store';

const { Paragraph } = Typography;

export const Login: FC = () => {
  const location = useLocation<{ username: string }>();

  const handleLogin = useCallback((values: LoginFormResult) => {
    const { username, password } = values;
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    processLogin({ username: trimmedUsername, password: trimmedPassword });
    userStore.setRefreshTokenModalVisibility(false);
  }, []);

  const copyright = `2012-${new Date().getFullYear()} Aeris Insight, Inc. All Rights Reserved.`;

  return (
    <ServicePageLayout>
      <img src={Logo} alt="Aeris Cloud logo" className={styles.logo} />
      <LoginForm
        onFinish={handleLogin}
        username={location.state && location.state.username}
      />
      <p className={styles.footnote}>{copyright}</p>
    </ServicePageLayout>
  );
};
