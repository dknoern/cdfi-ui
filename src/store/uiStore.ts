import { observable, action, decorate, computed } from 'mobx';
import Cookies from 'js-cookie';

class UiStore {
  loadingPool: string[] = [];

  sidebarCollapsed: boolean;

  errorMsgLength: number = 1;

  // used for things like global modals etc.
  activeFlows: Set<string> = new Set();

  constructor() {
    const sidebarValue = Cookies.get('sidebarCollapsed');
    this.sidebarCollapsed = !!sidebarValue && sidebarValue === '1';
  }

  addLoading = (operation: string): void => {
    this.loadingPool.push(operation);
  };

  endLoading = (operation: string): void => {
    const index = this.loadingPool.indexOf(operation);

    if (index > -1) {
      this.loadingPool.splice(index, 1);
    }
  };

  get isLoading(): boolean {
    return !!this.loadingPool.length;
  }

  setErrorMsgLength = (length: number): void => {
    if (!length) {
      this.errorMsgLength = 1;
    } else {
      this.errorMsgLength = length;
    }
  };

  toggleSidebar = (): void => {
    const newValue = !this.sidebarCollapsed;
    this.sidebarCollapsed = !this.sidebarCollapsed;
  };

  activateFlow = (code: string): void => {
    this.activeFlows.add(code);
  };

  deactivateFlow = (code: string): void => {
    this.activeFlows.delete(code);
  };
}

decorate(UiStore, {
  loadingPool: observable,
  activeFlows: observable,
  errorMsgLength: observable,
  setErrorMsgLength: action,
  isLoading: computed,
  addLoading: action,
  endLoading: action,
  sidebarCollapsed: observable,
  toggleSidebar: action,
  activateFlow: action,
  deactivateFlow: action,
});

export const uiStore = new UiStore();
