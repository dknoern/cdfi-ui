import jwtDecode from 'jwt-decode';
import { APIError } from 'types/apiError';
import { userStore, uiStore } from '../store';
import { Log } from './Log';
import { apiProcessor } from './apiProcessor';
const BEFORE_TOKEN_RENEW = 5 * 60 * 1000; // delay in miliseconds
const ACTIVITY_LISTENED_TIME = 15 * 60 * 1000; // delay in miliseconds
const TOKEN_RENEW_ENABLED = true;

const tokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(+new Date() / 1000);

    return exp <= currentTime;
  } catch (e) {
    return true;
  }
};

class AuthTools {
  storeUserInfo = (token) => {
    const decoded = jwtDecode(token);
    userStore.setExp(decoded.exp);
    userStore.setUserInfo(
      Object.assign({ firstLogin: !!decoded.firstLogin }, decoded),
    );
  };

  authorize = async (token) => {
    try {
      this.storeUserInfo(token);

      return true;
    } catch (error) {
      return false;
    }
  };

  unAuthorize = () =>
    new Promise((resolve) => {
      userStore.resetUser();
      resolve(true);
    });

  getLocalToken = () => {
    const token = window.localStorage.getItem('apiToken');
    if (!token) return undefined;
    return token;
  };

  getLocalRefreshToken = () => {
    const refreshToken = window.localStorage.getItem('apiRefreshToken');
    if (!refreshToken) return undefined;
    return refreshToken;
  };

  authorizeLocal = () => {
    const token = this.getLocalToken();

    if (token) {
      if (tokenExpired(token)) {
        userStore.resetUser();
        return;
      }

      try {
        const refreshToken = this.getLocalRefreshToken();
        this.storeUserInfo(token);
        userStore.setToken(token);
        userStore.setRefreshToken(refreshToken);
        this.setTokenRenewer(userStore.exp);
      } catch (error) {
        Log.log('[authorizeLocal] bad token');
        userStore.resetUser();
      }
    }
  };

  logout = () => {
    uiStore.addLoading('LOGOUT');
    userStore.resetUser();
    setTimeout(() => window.location.reload(), 100);
  };

  listenToTokenChanges = () => {
    window.addEventListener(
      'storage',
      (event) => {
        if (event.key === 'apiToken' && event.oldValue && !event.newValue)
          this.logout();
      },
      { once: true },
    );
  };

  storeTokensData = (tokens) => {
    this.storeUserInfo(tokens.token);
    userStore.setToken(tokens.token);
    userStore.setRefreshToken(tokens.refreshToken);
  };

  fetchAuthTokens = (username, password) => {
    const uri = `${apiProcessor.APIURI}/api/login`;
    return fetch(uri, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      Log.log('[getToken] response', response);
      if (response.status === 200) {
        return response.json().then((result) => result);
      }
      if (response.status === 401) {
        throw new APIError('Wrong username or password', response);
      }

      throw new APIError('Server error', response);
    });
  };

  renewTokens = () => {
    const uri = `${apiProcessor.APIURI}/api/refresh-token`;
    return fetch(uri, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`,
      },
      body: JSON.stringify({ "refreshToken": `${userStore.refreshToken}`}),
    }).then((response) => {
      if (response.status === 200) {
        return response.json().then((result) => {
          this.storeTokensData(result);
          return;
        });
      }
      if (response.status === 401) {
        this.logout();
        throw new APIError('Wrong auth token', response);
      }
      if (response.status === 404) {
        this.logout();
        throw new APIError('Temp response error', response);
      }
      throw new APIError('Server error', response);
    });
  };

  setTokenRenewer = (exp) => {
    if (userStore.userInfo.impersonatingName || !userStore.isLogged) return;
    const delayTime = exp * 1000 - Date.now() - BEFORE_TOKEN_RENEW;

    setTimeout(() => {
      const lastClickDiffer = exp * 1000 - userStore.timeClick;
      if (lastClickDiffer <= ACTIVITY_LISTENED_TIME) {
        Log.log('Token renewer run', ACTIVITY_LISTENED_TIME - lastClickDiffer);
        this.renewTokens().then(() => {
          this.setTokenRenewer(userStore.exp);
        });
      } else {
        userStore.setRefreshTokenModalVisibility(true);
      }
    }, delayTime);

    Log.log('Token renewer set');
  };

  authenticate = (email, password) =>
    new Promise((resolve, reject) => {
      uiStore.addLoading('login');
      userStore.setLoginPair(email, password);
      userStore.setClickTime(new Date());

      this.fetchAuthTokens(email, password)
        .then((tokens) => {
          this.storeTokensData(tokens);
          this.setTokenRenewer(userStore.exp);
          resolve(true);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          uiStore.endLoading('login');
        });
    });
}

export const authTools = new AuthTools();
