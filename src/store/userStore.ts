import { observable, action, decorate, computed } from 'mobx';
import { CompanyType, UserRole } from 'types';
import { PersonRole, UserInfo } from 'types/auth';

class UserStore {
  password: string | null = null;

  email: string | null = null;

  token: string | null = null;

  refreshToken: string | null = null;

  companyId = 0;

  exp: number = 0;

  timeClick: Date | null = null;

  refreshTokenModalVisibility: boolean = false;

  userInfo: UserInfo | {} = {};

  setToken = (token: string): void => {
    if (!token) {
      window.localStorage.removeItem('apiToken');
      this.token = null;
      this.setRefreshTokenModalVisibility(false);
    } else {
      window.localStorage.setItem('apiToken', token);
      this.token = token;
    }
  };

  setRefreshToken = (token: string): void => {
    if (!token) {
      window.localStorage.removeItem('apiRefreshToken');
      this.refreshToken = token;
    } else {
      window.localStorage.setItem('apiRefreshToken', token);
      this.refreshToken = token;
    }
  };
  userStore: any;

  setExp = (exp: number): void => {
    this.exp = exp;
  };

  setClickTime = (time: Date): void => {
    this.timeClick = time;
  };

  setRefreshTokenModalVisibility = (isModalVisible: boolean): void => {
    this.refreshTokenModalVisibility = isModalVisible;
    window.localStorage.setItem('isModalVisible', isModalVisible.toString());
  };

  getRefreshTokenModalVisibility = (): boolean => {
    return window.localStorage.getItem('isModalVisible') == 'true';
  };

  resetUser = (): void => {
    this.setRefreshTokenModalVisibility(false);
    window.localStorage.removeItem('apiToken');
    window.localStorage.removeItem('apiRefreshToken');
    this.token = null;
    this.refreshToken = null;
    this.password = null;
    this.email = null;
    this.companyId = 0;
    this.userInfo = {};
  };

  setUserInfo = (data: UserInfo): void => {
    this.userInfo = data;
    this.companyId = data.companyId;
  };

  setLoginPair = (email: string, password: string): void => {
    this.email = email;
    this.password = password;
  };

  get isLogged(): boolean {
    return this.token !== null;
  }

  get isAerisAdmin(): boolean {
    return (
      (this.userInfo as UserInfo).auth === PersonRole.ADMIN &&
      (this.userInfo as UserInfo).companyType === CompanyType.CARS
    );
  }

  get isAerisAnalyst(): boolean {
    return (
      (this.userInfo as UserInfo).auth === PersonRole.ANALYST &&
      (this.userInfo as UserInfo).companyType === CompanyType.CARS
    );
  }

  get isCdfi(): boolean {
    return (
      (this.userInfo as UserInfo).auth === PersonRole.ANALYST &&
      (this.userInfo as UserInfo).companyType === CompanyType.CDFI
    );
  }

  get isSubscriber(): boolean {
    return (
      (this.userInfo as UserInfo).auth === PersonRole.ANALYST &&
      (this.userInfo as UserInfo).companyType === CompanyType.INVESTOR
    );
  }

  get isContractor(): boolean {
    return (
      (this.userInfo as UserInfo).auth === PersonRole.CONTRACTOR &&
      (this.userInfo as UserInfo).companyType === CompanyType.CARS
    );
  }

  get isStaff(): boolean {
    return (
      (this.userInfo as UserInfo).auth === PersonRole.STAFF &&
      (this.userInfo as UserInfo).companyType === CompanyType.CARS
    );
  }

  get userRole(): UserRole {
    if (this.isAerisAdmin) {
      return UserRole.AERIS_ADMIN;
    } else if (this.isAerisAnalyst) {
      return UserRole.AERIS_ANALYST;
    } else if (this.isCdfi) {
      return UserRole.CDFI;
    } else if (this.isSubscriber) {
      return UserRole.SUBSCRIBER;
    } else if (this.isStaff) {
      return UserRole.AERIS_STAFF;
    } else if (this.isContractor) {
      return UserRole.CONTRACTOR;
    } else {
      return UserRole.UNKNOWN;
    }
  }

  get isFMUser(): boolean {
    return (this.userInfo as UserInfo).auth === PersonRole.FUND_MANAGER_USER;
  }

  get isFMAdmin(): boolean {
    return (this.userInfo as UserInfo).auth === PersonRole.FUND_MANAGER_ADMIN;
  }

  get isFM(): boolean {
    return this.isFMUser || this.isFMAdmin;
  }

  get isSupport(): boolean {
    return (this.userInfo as UserInfo).auth === PersonRole.SUPPORT;
  }

  get isPC(): boolean {
    return (this.userInfo as UserInfo).auth === PersonRole.PORTFOLIO_USER;
  }

  get isPremium(): boolean {
    return (this.userInfo as UserInfo).premium;
  }

  get role(): PersonRole {
    return (this.userInfo as UserInfo).auth;
  }

  get isFirstLogin(): boolean {
    return (this.userInfo as UserInfo).firstLogin || false;
  }

  get username(): UserInfo['sub'] {
    return (this.userInfo as UserInfo).sub;
  }

  get name(): UserInfo['name'] {
    return (this.userInfo as UserInfo).name;
  }

  get readyToUse(): boolean {
    return !!this.token;
  }

  get info(): UserInfo {
    return this.userInfo as UserInfo;
  }

  get isTermsOfUseAccepted(): boolean {
    return (this.userInfo as UserInfo).termsAccepted ?? false;
  }
}

decorate(UserStore, {
  token: observable,
  refreshToken: observable,
  refreshTokenModalVisibility: observable,
  email: observable,
  exp: observable,
  password: observable,
  userInfo: observable,
  setToken: action,
  setRefreshToken: action,
  setUserInfo: action,
  setExp: action,
  resetUser: action,
  setLoginPair: action,
  setClickTime: action,
  setRefreshTokenModalVisibility: action,
  getRefreshTokenModalVisibility: action,
  isLogged: computed,
  isFMUser: computed,
  isFMAdmin: computed,
  isFM: computed,
  isSupport: computed,
  isPC: computed,
  isPremium: computed,
  role: computed,
  isFirstLogin: computed,
  username: computed,
  name: computed,
  readyToUse: computed,
  isAerisAdmin: computed,
  isAerisAnalyst: computed,
  isCdfi: computed,
  isSubscriber: computed,
  userRole: computed,
  info: computed,
  isContractor: computed,
  isStaff: computed,
});

export const userStore = new UserStore();
