import { createContext } from 'react';
import { action, decorate, observable } from 'mobx';
import { throttle } from 'tools/throttle';

interface WindowSizes {
  width: number;
  height: number;
}

class WindowSizeStore {
  sizes: WindowSizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  constructor() {
    const updater = throttle(this.updateSizes, 500);
    window.addEventListener('resize', updater);
    window.addEventListener('unload', () => {
      window.removeEventListener('resize', updater);
    });
  }

  updateSizes = (): void => {
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
}

decorate(WindowSizeStore, {
  sizes: observable,
  updateSizes: action,
});

export default createContext(new WindowSizeStore());
