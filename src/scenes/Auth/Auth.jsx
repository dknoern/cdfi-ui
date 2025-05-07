import React from 'react';
import PropTypes from 'prop-types';
import { Log, authTools } from 'tools';
import { userStore } from 'store';

export class Auth extends React.PureComponent {
  componentDidMount = () => {
    const {
      history,
      match: {
        params: { token },
      },
    } = this.props;

    if (token) {
      Log.log('[Auth] try to auth with token', token);

      const wasLogged = userStore.isLogged;
      authTools.authorize(token).then((loginResult) => {
        Log.log('[Auth] loginResult', loginResult);

        if (loginResult) {
          userStore.setToken(token);
        } else {
          authTools.logout();
        }
        history.push('/');
        if (wasLogged) {
          setTimeout(() => window.location.reload(), 100);
        }
      });
    }
  };

  render() {
    return 'Authenticating...';
  }
}
Auth.defaultProps = {
  match: {
    params: {
      token: null,
    },
  },
};
Auth.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }),
};
